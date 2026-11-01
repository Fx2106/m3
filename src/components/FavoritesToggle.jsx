function FavoritesToggle({ count, active, onToggle }) {
  return (
    <button
      className={`favorites-filter ${active ? "is-active" : ""}`}
      type="button"
      aria-pressed={active}
      onClick={onToggle}
    >
      ♥ Favoritos ({count})
    </button>
  );
}

export default FavoritesToggle;
