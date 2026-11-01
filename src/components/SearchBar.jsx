function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search-input"
      type="search"
      aria-label="Buscar Pokémon por nombre o número"
      placeholder="Busca por nombre o número..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
}

export default SearchBar;
