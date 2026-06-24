import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import './Home.css';

const ProductList = lazy(() => import('../components/ProductList/ProductList'));

function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <div className="home-banner">
          <div className="home-banner__content">
            <p className="home-banner__eyebrow">Global picks | Fast checkout | Live catalog</p>
            <h1 className="home-banner__title">Shop the world from one streamlined marketplace.</h1>
            <p className="home-banner__subtitle">
              Search, compare, add to cart, and place a demo order with a polished ShoppyGlobe experience.
            </p>
            <div className="home-banner__stats" aria-label="Store highlights">
              <span><strong>200+</strong> products</span>
              <span><strong>20+</strong> categories</span>
              <span><strong>24/7</strong> browsing</span>
            </div>
            <div className="home-banner__actions">
              <a href="#catalog" className="btn btn--primary">Browse catalog</a>
              <Link to="/orders" className="btn btn--outline">View order history</Link>
            </div>
          </div>

          <div className="home-banner__showcase" aria-hidden="true">
            <div className="home-banner__product home-banner__product--one">
              <img
                src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
                alt=""
                loading="lazy"
              />
            </div>
            <div className="home-banner__product home-banner__product--two">
              <img
                src="https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp"
                alt=""
                loading="lazy"
              />
            </div>
            <div className="home-banner__product home-banner__product--three">
              <img
                src="https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp"
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<Loader label="Loading catalog..." size="lg" />}>
        <ProductList />
      </Suspense>
    </div>
  );
}

export default Home;
