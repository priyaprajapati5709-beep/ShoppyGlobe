import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProducts } from '../../hooks/useProducts';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';
import { ProductListSkeleton } from '../common/Skeleton';
import { makeSelectVisibleProducts, selectCategory, selectSearchTerm, selectSortBy } from '../../redux/filtersSelectors';
import { resetFilters, setCategory, setSortBy } from '../../redux/filtersSlice';
import './ProductList.css';

const ProductItem = lazy(() => import('../ProductItem/ProductItem'));
const ITEMS_PER_PAGE = 8;

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error, fetchProducts, refetch, reloadToken } = useProducts();
  const searchTerm = useSelector(selectSearchTerm);
  const category = useSelector(selectCategory);
  const sortBy = useSelector(selectSortBy);
  const [page, setPage] = useState(1);
  const filterKey = `${searchTerm}|${category}|${sortBy}`;
  const [lastFilterKey, setLastFilterKey] = useState(filterKey);

  useEffect(() => fetchProducts(), [fetchProducts, reloadToken]);

  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey);
    if (page !== 1) setPage(1);
  }

  const selectVisibleProducts = useMemo(() => makeSelectVisibleProducts(), []);
  const visibleProducts = useSelector((state) => selectVisibleProducts(state, products));

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category).filter(Boolean));
    return ['all', ...Array.from(unique).sort()];
  }, [products]);

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / ITEMS_PER_PAGE));
  const pagedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return visibleProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [page, visibleProducts]);

  if (loading) return <ProductListSkeleton />;

  if (error) {
    return (
      <ErrorMessage
        message={`We could not reach the product catalog (${error}). Check your connection and try again.`}
        onRetry={refetch}
      />
    );
  }

  return (
    <div id="catalog" className="container product-list-page">
      <div className="product-list__toolbar">
        <div>
          <h2 className="product-list__heading">Explore the catalog</h2>
          <p className="product-list__subheading">
            {visibleProducts.length} of {products.length} products
            {searchTerm ? <> matching "{searchTerm}"</> : null}
          </p>
        </div>

        <div className="product-list__controls">
          <label className="product-list__control">
            <span>Category</span>
            <select value={category} onChange={(event) => dispatch(setCategory(event.target.value))}>
              {categories.map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName === 'all' ? 'All categories' : categoryName}
                </option>
              ))}
            </select>
          </label>

          <label className="product-list__control">
            <span>Sort by</span>
            <select value={sortBy} onChange={(event) => dispatch(setSortBy(event.target.value))}>
              <option value="default">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating-desc">Top rated</option>
            </select>
          </label>
        </div>
      </div>

      {visibleProducts.length === 0 ? (
        <EmptyState
          icon="?"
          title="No products match your filters"
          message="Try a different search term or clear the category filter."
          actionLabel="Reset filters"
          onAction={() => dispatch(resetFilters())}
        />
      ) : (
        <>
          <Suspense fallback={<Loader label="Preparing product cards..." size="md" />}>
            <div className="product-list__grid">
              {pagedProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          </Suspense>

          <div className="product-list__pagination">
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;
