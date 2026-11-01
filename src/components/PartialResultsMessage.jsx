function PartialResultsMessage({ loadedCount, failedCount, onRetry }) {
  return (
    <div className="partial-warning" role="status">
      <p>
        Se han podido cargar {loadedCount} Pokémon. No se han podido obtener
        los datos de {failedCount}.
      </p>
      <button type="button" onClick={onRetry}>
        Reintentar carga completa
      </button>
    </div>
  );
}

export default PartialResultsMessage;
