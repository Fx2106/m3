function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p>{message}</p>
      <button type="button" onClick={onRetry}>
        Volver a intentar
      </button>
    </div>
  );
}

export default ErrorMessage;
