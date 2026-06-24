import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './LazyImage.css';

/**
 * LazyImage
 * Supports progressive image loading by waiting until the media is close to
 * the viewport before swapping in the real source. A native lazy-loading
 * attribute is also used as a fallback, and a simple placeholder is shown
 * until the image loads or fails.
 */
function LazyImage({ src, alt, className = '', aspectRatio = '1 / 1' }) {
  // If the browser has no IntersectionObserver support, decide that up
  // front (in the initializer) rather than via a setState call inside the
  // effect — the effect below then simply has nothing to do in that case.
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === 'undefined');
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible) return; // already showing (no observer support, or already intersected)

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '150px' }, // start loading slightly before it enters the viewport
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`lazy-image ${className}`}
      style={{ aspectRatio }}
    >
      {!hasLoaded && !hasError && <div className="lazy-image__skeleton" aria-hidden="true" />}

      {isVisible && !hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`lazy-image__img ${hasLoaded ? 'is-loaded' : ''}`}
          onLoad={() => setHasLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {hasError && (
        <div className="lazy-image__fallback" role="img" aria-label={alt}>
          <span aria-hidden="true">IMG</span>
        </div>
      )}
    </div>
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  aspectRatio: PropTypes.string,
};

export default LazyImage;
