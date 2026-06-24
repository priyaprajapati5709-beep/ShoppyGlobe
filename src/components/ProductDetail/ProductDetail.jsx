import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useProductDetail } from '../../hooks/useProductDetail';
import { addToCart, setQuantity } from '../../redux/cartSlice';
import { makeSelectCartItemById } from '../../redux/cartSelectors';
import LazyImage from '../common/LazyImage';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import NotFound from '../NotFound/NotFound';
import { ProductDetailSkeleton } from '../common/Skeleton';
import QuantityStepper from '../common/QuantityStepper';
import { calculateDiscountedPrice, formatPrice } from '../../utils/formatPrice';
import { MIN_QUANTITY } from '../../utils/constants';
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error, fetchProduct, refetch, reloadToken } = useProductDetail();
  const normalizedProductId = productId ? Number(productId) || productId : null;
  const selectCartItem = useMemo(() => makeSelectCartItemById(normalizedProductId), [normalizedProductId]);
  const cartItem = useSelector(selectCartItem);
  const [pendingQty, setPendingQty] = useState(MIN_QUANTITY);

  useEffect(() => fetchProduct(productId), [fetchProduct, productId, reloadToken]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error === 'NOT_FOUND') {
    return (
      <NotFound
        code="404"
        title="Product not found"
        message={`There is no product with id "${productId}" in the catalog.`}
      />
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!product) return null;

  const inStock = product.stock > 0;
  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage > 0;
  const images = product.images?.length ? product.images : [product.thumbnail];

  const handleAddToCart = () => {
    if (!inStock) return;
    dispatch(addToCart(product));
    if (pendingQty > MIN_QUANTITY) {
      dispatch(setQuantity({ productId: product.id, quantity: pendingQty }));
    }
  };

  return (
    <div className="container product-detail">
      <Link to="/" className="product-detail__back">Back to catalog</Link>

      <div className="product-detail__layout">
        <div className="product-detail__gallery">
          <LazyImage src={images[0]} alt={product.title} className="product-detail__hero-image" aspectRatio="4 / 3" />

          {images.length > 1 && (
            <div className="product-detail__thumbs">
              {images.slice(0, 5).map((src, index) => (
                <LazyImage
                  key={`${src}-${index}`}
                  src={src}
                  alt={`${product.title} view ${index + 1}`}
                  className="product-detail__thumb"
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-detail__info">
          <p className="product-detail__category">
            {product.category}
            {product.brand && ` - ${product.brand}`}
          </p>
          <h1 className="product-detail__title">{product.title}</h1>

          <div className="product-detail__rating">
            <span>Rating {product.rating?.toFixed(1) ?? 'N/A'}</span>
            <span className="product-detail__stock-dot" data-state={inStock ? 'in' : 'out'} />
            <span>{inStock ? `${product.stock} in stock` : 'Out of stock'}</span>
          </div>

          <div className="product-detail__price-row">
            <span className="price-tag price-tag--lg">{formatPrice(discountedPrice)}</span>
            {hasDiscount && (
              <>
                <span className="product-detail__strike">{formatPrice(product.price)}</span>
                <span className="product-detail__discount-pill">
                  Save {Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="product-detail__description">{product.description}</p>

          <dl className="product-detail__meta">
            {product.warrantyInformation && (
              <div><dt>Warranty</dt><dd>{product.warrantyInformation}</dd></div>
            )}
            {product.shippingInformation && (
              <div><dt>Shipping</dt><dd>{product.shippingInformation}</dd></div>
            )}
            {product.returnPolicy && (
              <div><dt>Returns</dt><dd>{product.returnPolicy}</dd></div>
            )}
          </dl>

          <div className="product-detail__actions">
            {!cartItem && inStock && (
              <QuantityStepper
                quantity={pendingQty}
                max={product.stock}
                onIncrement={() => setPendingQty((quantity) => Math.min(quantity + 1, product.stock))}
                onDecrement={() => setPendingQty((quantity) => Math.max(quantity - 1, MIN_QUANTITY))}
              />
            )}

            <button
              type="button"
              className="btn btn--primary"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {!inStock ? 'Out of stock' : cartItem ? `In cart (${cartItem.quantity})` : 'Add to cart'}
            </button>

            {cartItem && (
              <Link to="/cart" className="btn btn--outline">View cart</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
