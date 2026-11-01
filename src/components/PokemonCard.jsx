function PokemonCard({ pokemon, isFavorite, onToggleFavorite }) {
  const favorite = isFavorite(pokemon.id);

  return (
    <article className="pokemon-card">
      <div className="pokemon-card-top">
        <span className="pokemon-number">
          #{String(pokemon.id).padStart(3, "0")}
        </span>

        <button
          className={`favorite-button ${favorite ? "is-favorite" : ""}`}
          type="button"
          aria-label={
            favorite
              ? `Quitar a ${pokemon.name} de favoritos`
              : `Añadir a ${pokemon.name} a favoritos`
          }
          aria-pressed={favorite}
          onClick={() => onToggleFavorite(pokemon.id)}
        >
          <span aria-hidden="true">{favorite ? "♥" : "♡"}</span>
        </button>
      </div>

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
