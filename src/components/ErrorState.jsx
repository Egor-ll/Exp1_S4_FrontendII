export default function ErrorState({ message, onRetry, fallbackMessage }) {
  return (
    <section className="error-state" role="alert">
      <span className="error-icon" aria-hidden="true">
        !
      </span>

      <div>
        <h2>No pudimos completar la solicitud</h2>
        <p>{message}</p>

        {fallbackMessage && <p className="fallback-note">{fallbackMessage}</p>}

        <button className="button button-dark" onClick={onRetry}>
          Reintentar
        </button>
      </div>
    </section>
  );
}
