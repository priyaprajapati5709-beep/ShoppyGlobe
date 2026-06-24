import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import './OrderHistory.css';

function OrderHistory() {
  const orders = useSelector((state) => state.orders.items);

  if (!orders.length) {
    return (
      <div className="container order-history-page">
        <h1 className="order-history-page__heading">Order history</h1>
        <p className="order-history-page__empty">No orders yet. Complete a purchase to see your history here.</p>
        <Link to="/" className="btn btn--secondary">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="container order-history-page">
      <h1 className="order-history-page__heading">Order history</h1>
      <div className="order-history-list">
        {orders.map((order) => (
          <article key={order.id} className="order-history-card">
            <div className="order-history-card__top">
              <div>
                <h3>Order #{order.id}</h3>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <span className="order-history-card__total">{formatPrice(order.total)}</span>
            </div>
            <p>{order.itemCount} item(s)</p>
            <ul className="order-history-card__items">
              {order.items.map((item) => (
                <li key={`${order.id}-${item.id}`}>{item.title} x {item.quantity}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
