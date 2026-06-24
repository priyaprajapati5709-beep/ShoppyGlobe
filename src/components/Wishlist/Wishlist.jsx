import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import { showToast } from '../../redux/uiSlice';
import { formatPrice, calculateDiscountedPrice } from '../../utils/formatPrice';
import './Wishlist.css';

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  if (!wishlist.length) {
    return (
      <div className="container wishlist-page">
        <h1 className="wishlist-page__heading">Your wishlist</h1>
        <p className="wishlist-page__empty">Save products you love and come back to them later.</p>
        <Link to="/" className="btn btn--secondary">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container wishlist-page">
      <div className="wishlist-page__header">
        <div>
          <h1 className="wishlist-page__heading">Your wishlist</h1>
          <p className="wishlist-page__subheading">Items saved for later</p>
        </div>
      </div>

      <div className="wishlist-page__grid">
        {wishlist.map((product) => (
          <article key={product.id} className="wishlist-card">
            <img src={product.thumbnail} alt={product.title} className="wishlist-card__image" />
            <div className="wishlist-card__body">
              <h3>{product.title}</h3>
              <p className="wishlist-card__meta">{product.category}</p>
              <div className="wishlist-card__price">{formatPrice(calculateDiscountedPrice(product.price, product.discountPercentage))}</div>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => {
                  dispatch(addToCart(product));
                  dispatch(showToast({ title: 'Added to cart', message: product.title, variant: 'success' }));
                }}
              >
                Move to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
