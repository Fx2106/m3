import { useMemo, useState } from "react";

import usePokemon from "./hooks/usePokemon.js";
import useFavorites from "./hooks/useFavorites.js";

import SearchBar from "./components/SearchBar.jsx";
import TypeFilter from "./components/TypeFilter.jsx";
import PokemonList from "./components/PokemonList.jsx";

import "./App.css";

function App() {
  const {
    pokemonList,
    loading,
    error,
    failedCount,
    retry,
  } = usePokemon();

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);

  const types = useMemo(
    () => [...new Set(pokemonList.flatMap((pokemon) => pokemon.types))].sort(),
    [pokemonList]
  );

  const filteredPokemon = useMemo(() => {
    const query = search.trim().toLowerCase();
    const numericQuery = query.replace(/^#/, "");

    return pokemonList.filter((pokemon) => {
      const matchesName = pokemon.name.includes(query);
      const matchesNumber =
        /^\d+$/.test(numericQuery) &&
        String(pokemon.id) === String(Number(numericQuery));
      const matchesType =
        selectedType === "all" || pokemon.types.includes(selectedType);
      const matchesFavorite =
        !showFavorites || favorites.includes(pokemon.id);

      return (
        (matchesName || matchesNumber) &&
        matchesType &&
        matchesFavorite
      );
    });
  }, [pokemonList, search, selectedType, showFavorites, favorites]);

  function clearFilters() {
    setSearch("");
    setSelectedType("all");
    setShowFavorites(false);
  }

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">POKÉDEX · REACT 19</p>

        <h1>
          Poké<span>dex</span>
        </h1>

        <p>Descubre y explora los primeros 151 Pokémon.</p>
      </header>

      <section className="controls" aria-label="Controles de búsqueda">
        <SearchBar search={search} setSearch={setSearch} />

        <TypeFilter
          types={types}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <button
          className={`favorites-filter ${showFavorites ? "is-active" : ""}`}
          type="button"
          aria-pressed={showFavorites}
          onClick={() => setShowFavorites((current) => !current)}
        >
          ♥ Favoritos ({favorites.length})
        </button>

        <button className="clear-button" type="button" onClick={clearFilters}>
          Limpiar filtros
        </button>
      </section>

      <section className="results" aria-live="polite">
        <div className="results-heading">
          <h2>{showFavorites ? "Mis favoritos" : "Pokémon"}</h2>

          {!loading && !error && (
            <span>{filteredPokemon.length} resultados</span>
          )}
        </div>

        {loading && (
          <p className="status-message" role="status">
            Cargando Pokémon...
          </p>
        )}

        {error && (
          <div className="error-message" role="alert">
            <p>{error}</p>
            <button type="button" onClick={retry} disabled={loading}>
              Volver a intentar
            </button>
          </div>
        )}

        {!loading && !error && failedCount > 0 && (
          <p className="partial-warning" role="status">
            Se han podido cargar {pokemonList.length} Pokémon. No se han podido
            obtener los datos de {failedCount}.
          </p>
        )}

        {!loading && !error && (
          <PokemonList
            pokemonList={filteredPokemon}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </section>

      <footer>
        Datos e imágenes proporcionados por PokeAPI.
      </footer>
    </main>
  );
}

export default App;
