import PokemonCard from "./PokemonCard.jsx";

function PokemonList({ pokemonList, isFavorite, onToggleFavorite }) {
  if (pokemonList.length === 0) {
    return (
      <p className="empty-message" role="status">
        No se han encontrado Pokémon con esos filtros.
      </p>
    );
  }

  return (
    <section className="pokemon-grid" aria-label="Resultados de Pokémon">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}

export default PokemonList;
