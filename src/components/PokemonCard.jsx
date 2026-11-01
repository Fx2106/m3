function PokemonCard({ pokemon }) {
  return (
    <article className="pokemon-card">
      <span className="pokemon-number">
        #{String(pokemon.id).padStart(3, "0")}
      </span>

      <div className="pokemon-image-container">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="pokemon-image"
          loading="lazy"
        />
      </div>

      <h3>{pokemon.name}</h3>

      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <span key={type} className={`type-badge type-${type}`}>
            {type}
          </span>
        ))}
      </div>

      <div className="pokemon-stats">
        <p>
          <span>Altura</span>
          <strong>{pokemon.height} m</strong>
        </p>

        <p>
          <span>Peso</span>
          <strong>{pokemon.weight} kg</strong>
        </p>

        <p>
          <span>Ataque</span>
          <strong>{pokemon.attack}</strong>
        </p>
      </div>
    </article>
  );
}

export default PokemonCard;
