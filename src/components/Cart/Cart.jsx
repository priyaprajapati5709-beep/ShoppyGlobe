import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmptyState from '../common/EmptyState';
import Loader from '../common/Loader';
import {
  selectCartItems,
  selectCartSubtotal,
  selectShippingCost,
  selectTaxAmount,
  selectCartTotal,
  selectIsCartEmpty,
} from '../../redux/cartSelectors';
import { formatPrice } from '../../utils/formatPrice';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/constants';
import './Cart.css';

const CartItem = lazy(() => import('../CartItem/CartItem'));

function Cart() {
  const items = useSelector(selectCartItems);
  const isEmpty = useSelector(selectIsCartEmpty);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectShippingCost);
  const tax = useSelector(selectTaxAmount);
  const total = useSelector(selectCartTotal);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  if (isEmpty) {
    return (
      <div className="container">
        <EmptyState
          icon="Cart"
          title="Your cart is empty"
          message="Browse the catalog and add something you like. It will appear here when you do."
          actionLabel="Start shopping"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1 className="cart-page__heading">Your cart</h1>

      <div className="cart-page__layout">
        <Suspense fallback={<Loader label="Preparing cart items..." size="md" />}>
          <div className="cart-page__items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </Suspense>

        <aside className="cart-summary">
          <h2 className="cart-summary__heading">Order summary</h2>

          {amountToFreeShipping > 0 && (
            <p className="cart-summary__shipping-nudge">
              Add {formatPrice(amountToFreeShipping)} more for free shipping.
            </p>
          )}

          <dl className="cart-summary__rows">
            <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div><dt>Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
            <div><dt>Tax</dt><dd>{formatPrice(tax)}</dd></div>
          </dl>

          <div className="cart-summary__total">
            <span>Total</span>
            <span className="price-tag price-tag--lg">{formatPrice(total)}</span>
          </div>

          <Link to="/checkout" className="btn btn--primary btn--block">
            Proceed to checkout
          </Link>
          <Link to="/" className="cart-summary__continue">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
