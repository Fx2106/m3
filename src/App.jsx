import { useEffect, useState } from "react";

import { getPokemonList, getPokemonDetails } from "./services/pokemonApi.js";

import SearchBar from "./components/SearchBar.jsx";
import TypeFilter from "./components/TypeFilter.jsx";
import PokemonList from "./components/PokemonList.jsx";

import "./App.css";

function App() {
  // Estados de la aplicación
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Cargar los Pokémon al iniciar la aplicación
  useEffect(() => {
    let active = true;

    async function loadPokemons() {
      try {
        setLoading(true);
        setError("");

        const list = await getPokemonList();
        const loadedPokemon = [];

        const batchSize = 20;

        for (
          let index = 0;
          index < list.results.length;
          index += batchSize
        ) {
          const batch = list.results.slice(index, index + batchSize);

          const results = await Promise.allSettled(
            batch.map((pokemon) => getPokemonDetails(pokemon.url))
          );

          results.forEach((result) => {
            if (result.status === "fulfilled") {
              const data = result.value;

              loadedPokemon.push({
                id: data.id,
                name: data.name,
                image:
                  data.sprites.other["official-artwork"].front_default ||
                  data.sprites.front_default,
                types: data.types.map((item) => item.type.name),
                height: data.height / 10,
                weight: data.weight / 10,
                attack:
                  data.stats.find((stat) => stat.stat.name === "attack")
                    ?.base_stat || 0,
              });
            }
          });
        }

        if (active) {
          if (loadedPokemon.length === 0) {
            throw new Error("No se ha podido cargar ningún Pokémon.");
          }

          loadedPokemon.sort((a, b) => a.id - b.id);
          setPokemonList(loadedPokemon);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Ha ocurrido un error.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPokemons();

    return () => {
      active = false;
    };
  }, []);

  // Obtener todos los tipos disponibles
  const types = [
    ...new Set(pokemonList.flatMap((pokemon) => pokemon.types)),
  ].sort();

  // Filtrar Pokémon según la búsqueda y el tipo
  const filteredPokemon = pokemonList.filter((pokemon) => {
    const query = search.trim().toLowerCase();

    const matchesName = pokemon.name.includes(query);

    const matchesNumber =
      query !== "" &&
      String(pokemon.id) === query.replace("#", "");

    const matchesType =
      selectedType === "all" ||
      pokemon.types.includes(selectedType);

    return (matchesName || matchesNumber) && matchesType;
  });

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">POKÉDEX · REACT 19</p>

        <h1>
          Poké<span>dex</span>
        </h1>

        <p>Descubre y explora los primeros 151 Pokémon.</p>
      </header>

      <section className="controls">
        <SearchBar search={search} setSearch={setSearch} />

        <TypeFilter
          types={types}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <button
          className="clear-button"
          onClick={() => {
            setSearch("");
            setSelectedType("all");
          }}
        >
          Limpiar filtros
        </button>
      </section>

      <section className="results">
        <div className="results-heading">
          <h2>Pokémon</h2>

          {!loading && !error && (
            <span>{filteredPokemon.length} resultados</span>
          )}
        </div>

        {loading && (
          <p className="status-message">
            Cargando Pokémon...
          </p>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Volver a intentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <PokemonList pokemonList={filteredPokemon} />
        )}
      </section>

      <footer>
        Datos e imágenes proporcionados por PokeAPI.
      </footer>
    </main>
  );
}

export default App;