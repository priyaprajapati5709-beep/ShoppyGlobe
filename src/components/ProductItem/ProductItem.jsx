import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LazyImage from '../common/LazyImage';
import { addToCart } from '../../redux/cartSlice';
import { makeSelectCartItemById } from '../../redux/cartSelectors';
import { addToCompare, toggleWishlistItem } from '../../redux/wishlistSlice';
import { showToast } from '../../redux/uiSlice';
import { calculateDiscountedPrice, formatPrice } from '../../utils/formatPrice';
import { buildProductRoute } from '../../utils/constants';
import './ProductItem.css';

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const selectCartItem = useMemo(() => makeSelectCartItemById(product.id), [product.id]);
  const cartItem = useSelector(selectCartItem);
  const isWishlisted = useSelector((state) => state.wishlist.items.some((item) => item.id === product.id));
  const isCompared = useSelector((state) => state.wishlist.compare.some((item) => item.id === product.id));
  const inStock = product.stock > 0;
  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage > 0;

  const handleAddToCart = (event) => {
    event.preventDefault();
    if (!inStock) return;
    dispatch(addToCart(product));
    dispatch(showToast({ title: 'Added to cart', message: product.title, variant: 'success' }));
  };

  const handleToggleWishlist = (event) => {
    event.preventDefault();
    dispatch(toggleWishlistItem(product));
    dispatch(showToast({
      title: isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist',
      message: product.title,
      variant: 'info',
    }));
  };

  const handleCompare = (event) => {
    event.preventDefault();
    dispatch(addToCompare(product));
    dispatch(showToast({
      title: isCompared ? 'Already in compare' : 'Added to compare',
      message: product.title,
      variant: 'info',
    }));
  };

  return (
    <article className="product-card">
      <Link to={buildProductRoute(product.id)} className="product-card__media-link">
        <LazyImage src={product.thumbnail} alt={product.title} className="product-card__media" />
        {hasDiscount && <span className="product-card__discount-badge">-{Math.round(product.discountPercentage)}%</span>}
        {!inStock && <span className="product-card__stock-badge">Out of stock</span>}
      </Link>

      <div className="product-card__body">
        <div className="product-card__actions">
          <button type="button" className={`product-card__icon-btn ${isWishlisted ? 'is-active' : ''}`} onClick={handleToggleWishlist}>
            {isWishlisted ? 'Saved' : 'Save'}
          </button>
          <button type="button" className={`product-card__icon-btn ${isCompared ? 'is-active' : ''}`} onClick={handleCompare}>
            Compare
          </button>
        </div>

        <p className="product-card__category">{product.category}</p>
        <Link to={buildProductRoute(product.id)} className="product-card__title-link">
          <h3 className="product-card__title">{product.title}</h3>
        </Link>

        <div className="product-card__rating">
          <span>Rated {product.rating?.toFixed(1) ?? 'N/A'}</span>
        </div>

        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="price-tag">{formatPrice(discountedPrice)}</span>
            {hasDiscount && <span className="product-card__strike">{formatPrice(product.price)}</span>}
          </div>

          <button type="button" className="btn btn--primary btn--sm" onClick={handleAddToCart} disabled={!inStock}>
            {cartItem ? `In cart (${cartItem.quantity})` : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string,
    rating: PropTypes.number,
    stock: PropTypes.number,
  }).isRequired,
};

export default memo(ProductItem);
