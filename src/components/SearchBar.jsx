function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search-input"
      type="search"
      placeholder="Busca por nombre o número..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
}

export default SearchBar;