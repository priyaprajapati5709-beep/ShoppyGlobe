import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound
 * Used in two different situations: as a fallback for unknown routes and as a
 * reusable error view for missing product data. It keeps the experience
 * consistent whenever something cannot be found.
 */
function NotFound({ title, message, code = '404' }) {
  const location = useLocation();
  const attemptedPath = location.pathname + location.search;

  return (
    <div className="container not-found">
      <p className="not-found__code">{code}</p>
      <h1 className="not-found__title">{title ?? 'Page not found'}</h1>
      <p className="not-found__message">
        {message ?? "We couldn't find the page or product you were looking for."}
      </p>
      <p className="not-found__path">
        Requested path: <code>{attemptedPath}</code>
      </p>
      <Link to="/" className="btn btn--primary">
        Back to home
      </Link>
    </div>
  );
}

NotFound.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  code: PropTypes.string,
};

export default NotFound;
