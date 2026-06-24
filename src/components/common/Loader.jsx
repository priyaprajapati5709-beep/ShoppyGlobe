import PropTypes from 'prop-types';
import './Loader.css';

function Loader({ label = 'Loading...', size = 'md' }) {
  return (
    <div className={`loader loader--${size}`} role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden="true" />
      <span className="loader__label">{label}</span>
    </div>
  );
}

Loader.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Loader;
