import PropTypes from 'prop-types';
import './Skeleton.css';

export function Skeleton({ className = '', variant = 'text', width, height, aspectRatio }) {
  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;
  if (aspectRatio) style.aspectRatio = aspectRatio;

  return (
    <div
      className={`skeleton-block skeleton--${variant} ${className}`}
      style={style}
      role="progressbar"
      aria-busy="true"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Loading content placeholder"
    />
  );
}

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'circular', 'rectangular', 'rounded']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  aspectRatio: PropTypes.string,
};

export function ProductCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__media skeleton-block skeleton--rectangular" />
      <div className="skeleton-card__body">
        <div className="skeleton-card__category skeleton-block skeleton--text" />
        <div className="skeleton-card__title skeleton-block skeleton--text" />
        <div className="skeleton-card__rating skeleton-block skeleton--text" />
        <div className="skeleton-card__footer">
          <div className="skeleton-card__price skeleton-block skeleton--text" />
          <div className="skeleton-card__btn skeleton-block skeleton--rounded" />
        </div>
      </div>
    </div>
  );
}

export function ProductListSkeleton({ count = 8 }) {
  return (
    <div className="container product-list-page">
      <div className="product-list__toolbar">
        <div>
          <div className="skeleton-block skeleton--text" style={{ width: '220px', height: '28px', marginBottom: '8px' }} />
          <div className="skeleton-block skeleton--text" style={{ width: '130px', height: '18px' }} />
        </div>
        <div className="product-list__controls">
          <div className="skeleton-block skeleton--rounded" style={{ width: '150px', height: '42px' }} />
          <div className="skeleton-block skeleton--rounded" style={{ width: '150px', height: '42px' }} />
        </div>
      </div>
      <div className="product-list__grid" style={{ marginTop: '2.5rem' }}>
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

ProductListSkeleton.propTypes = {
  count: PropTypes.number,
};

export function ProductDetailSkeleton() {
  return (
    <div className="container product-detail">
      <div className="skeleton-block skeleton--text" style={{ width: '120px', height: '18px', marginBottom: '24px' }} />
      <div className="product-detail__layout">
        <div className="product-detail__gallery">
          <div className="skeleton-block skeleton--rectangular" style={{ width: '100%', aspectRatio: '4/3', borderRadius: '12px' }} />
          <div className="product-detail__thumbs" style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton-block skeleton--rectangular" style={{ width: '80px', height: '60px', borderRadius: '6px' }} />
            ))}
          </div>
        </div>
        <div className="product-detail__info">
          <div className="skeleton-block skeleton--text" style={{ width: '150px', height: '18px', marginBottom: '12px' }} />
          <div className="skeleton-block skeleton--text" style={{ width: '75%', height: '36px', marginBottom: '16px' }} />
          <div className="skeleton-block skeleton--text" style={{ width: '200px', height: '20px', marginBottom: '24px' }} />
          <div className="skeleton-block skeleton--text" style={{ width: '150px', height: '32px', marginBottom: '24px' }} />
          <div className="skeleton-block skeleton--rectangular" style={{ width: '100%', height: '80px', marginBottom: '24px', borderRadius: '8px' }} />
          <div className="skeleton-block skeleton--rectangular" style={{ width: '100%', height: '120px', marginBottom: '24px', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
}
