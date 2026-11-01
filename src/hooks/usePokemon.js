import { useCallback, useEffect, useState } from "react";
import { getPokemonDetails, getPokemonList } from "../services/pokemonApi.js";

const BATCH_SIZE = 20;

function normalizePokemon(data) {
  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites?.other?.["official-artwork"]?.front_default ||
      data.sprites?.front_default ||
      "",
    types: data.types.map((item) => item.type.name),
    height: data.height / 10,
    weight: data.weight / 10,
    attack:
      data.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0,
  };
}

export default function usePokemon() {
  const [data, setData] = useState({
    pokemonList: [],
    loading: true,
    error: "",
    failedCount: 0,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemons() {
      setData((current) => ({
        ...current,
        loading: true,
        error: "",
        failedCount: 0,
      }));

      try {
        const list = await getPokemonList(controller.signal);
        const loadedPokemon = [];
        let failedCount = 0;

        for (let index = 0; index < list.results.length; index += BATCH_SIZE) {
          if (controller.signal.aborted) return;

          const batch = list.results.slice(index, index + BATCH_SIZE);
          const results = await Promise.allSettled(
            batch.map((pokemon) =>
              getPokemonDetails(pokemon.url, controller.signal)
            )
          );

          results.forEach((result) => {
            if (result.status === "fulfilled") {
              loadedPokemon.push(normalizePokemon(result.value));
            } else if (result.reason?.name !== "AbortError") {
              failedCount += 1;
            }
          });
        }

        if (controller.signal.aborted) return;

        if (loadedPokemon.length === 0) {
          throw new Error("No se ha podido cargar ningún Pokémon.");
        }

        loadedPokemon.sort((a, b) => a.id - b.id);

        setData({
          pokemonList: loadedPokemon,
          loading: false,
          error: "",
          failedCount,
        });
      } catch (error) {
        if (controller.signal.aborted || error.name === "AbortError") return;

        setData((current) => ({
          ...current,
          loading: false,
          error: error.message || "Ha ocurrido un error al cargar los Pokémon.",
          failedCount: 0,
        }));
      }
    }

    loadPokemons();

    return () => {
      controller.abort();
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setAttempt((current) => current + 1);
  }, []);

  return {
    ...data,
    retry,
  };
}
