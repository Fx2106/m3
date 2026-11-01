import PokemonCard from "./PokemonCard.jsx";

function PokemonList({ pokemonList }) {
  if (pokemonList.length === 0) {
    return (
      <p className="empty-message">
        No se han encontrado Pokémon.
      </p>
    );
  }

  return (
    <section className="pokemon-grid">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
}

export default PokemonList;