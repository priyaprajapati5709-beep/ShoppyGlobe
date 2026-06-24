import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { removeFromCompare } from '../../redux/wishlistSlice';
import { showToast } from '../../redux/uiSlice';
import { calculateDiscountedPrice, formatPrice } from '../../utils/formatPrice';
import './Compare.css';

function Compare() {
  const dispatch = useDispatch();
  const compareItems = useSelector((state) => state.wishlist.compare);
  const rowStyle = useMemo(
    () => ({ gridTemplateColumns: `150px repeat(${Math.max(compareItems.length, 1)}, minmax(190px, 1fr))` }),
    [compareItems.length],
  );

  if (!compareItems.length) {
    return (
      <div className="container compare-page">
        <h1 className="compare-page__heading">Product comparison</h1>
        <p className="compare-page__empty">Pick up to three products to compare features and pricing.</p>
      </div>
    );
  }

  return (
    <div className="container compare-page">
      <h1 className="compare-page__heading">Product comparison</h1>
      <div className="compare-table" role="table" aria-label="Product comparison">
        <div className="compare-table__row compare-table__row--products" style={rowStyle} role="row">
          <div className="compare-table__header" role="rowheader">Product</div>
          {compareItems.map((product) => (
            <div key={product.id} className="compare-table__cell compare-table__product" role="cell">
              <img src={product.thumbnail} alt={product.title} className="compare-table__image" />
              <strong>{product.title}</strong>
              <button type="button" className="compare-table__remove" onClick={() => dispatch(removeFromCompare(product.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <CompareRow label="Price" style={rowStyle}>
          {compareItems.map((product) => (
            <div key={`${product.id}-price`} className="compare-table__cell" role="cell">
              {formatPrice(calculateDiscountedPrice(product.price, product.discountPercentage))}
            </div>
          ))}
        </CompareRow>

        <CompareRow label="Category" style={rowStyle}>
          {compareItems.map((product) => (
            <div key={`${product.id}-category`} className="compare-table__cell" role="cell">
              {product.category}
            </div>
          ))}
        </CompareRow>

        <CompareRow label="Rating" style={rowStyle}>
          {compareItems.map((product) => (
            <div key={`${product.id}-rating`} className="compare-table__cell" role="cell">
              {product.rating?.toFixed(1) ?? 'N/A'}
            </div>
          ))}
        </CompareRow>

        <CompareRow label="Actions" style={rowStyle}>
          {compareItems.map((product) => (
            <div key={`${product.id}-actions`} className="compare-table__cell" role="cell">
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => {
                  dispatch(addToCart(product));
                  dispatch(showToast({ title: 'Added to cart', message: product.title, variant: 'success' }));
                }}
              >
                Add to cart
              </button>
            </div>
          ))}
        </CompareRow>
      </div>
    </div>
  );
}

function CompareRow({ label, style, children }) {
  return (
    <div className="compare-table__row" style={style} role="row">
      <div className="compare-table__header" role="rowheader">{label}</div>
      {children}
    </div>
  );
}

export default Compare;
