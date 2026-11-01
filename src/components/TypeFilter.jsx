function TypeFilter({ types, selectedType, onTypeChange }) {
  return (
    <select
      className="type-select"
      aria-label="Filtrar Pokémon por tipo"
      value={selectedType}
      onChange={(event) => onTypeChange(event.target.value)}
    >
      <option value="all">Todos los tipos</option>

      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default TypeFilter;
