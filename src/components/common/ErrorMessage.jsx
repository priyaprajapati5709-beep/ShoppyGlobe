import PropTypes from 'prop-types';
import './ErrorMessage.css';

function ErrorMessage({ message, onRetry }) {
  const detail = typeof message === 'string'
    ? message
    : message && typeof message === 'object' && typeof message.message === 'string'
      ? message.message
      : 'Something went wrong.';

  return (
    <div className="error-panel" role="alert">
      <span className="error-panel__icon" aria-hidden="true">!</span>
      <p className="error-panel__title">This content could not be loaded</p>
      <p className="error-panel__detail">{detail}</p>
      {onRetry && (
        <button type="button" className="btn btn--outline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
