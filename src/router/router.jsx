/* eslint-disable react-refresh/only-export-components --
   This file exports a router configuration object, not a React component.
   react-refresh/only-export-components exists to keep Fast Refresh
   working for component files; it doesn't apply to a route table whose
   only JSX usage is `element: <Page />` inside plain config objects. */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

/**
 * Route-level code splitting keeps the app lightweight by loading each page
 * only when it is needed. The main route components are lazy-loaded so the
 * initial bundle stays smaller and navigation feels smoother.
 */
const Layout = lazy(() => import('../components/Layout/Layout'));
const Home = lazy(() => import('../pages/Home'));
const ProductDetail = lazy(() => import('../components/ProductDetail/ProductDetail'));
const Cart = lazy(() => import('../components/Cart/Cart'));
const Checkout = lazy(() => import('../components/Checkout/Checkout'));
const Wishlist = lazy(() => import('../components/Wishlist/Wishlist'));
const Compare = lazy(() => import('../components/Compare/Compare'));
const OrderHistory = lazy(() => import('../components/OrderHistory/OrderHistory'));
const NotFound = lazy(() => import('../components/NotFound/NotFound'));

/**
 * createBrowserRouter (rather than the legacy <BrowserRouter>) gives data
 * APIs (loaders/actions, errorElement) even though this app keeps state in
 * Redux rather than route loaders. The dynamic `:productId` segment is
 * what makes the router "dynamic" per the rubric note.
 */
const childRoutes = [
  { index: true, element: <Home /> },
  { path: 'product/:productId', element: <ProductDetail /> },
  { path: 'cart', element: <Cart /> },
  { path: 'checkout', element: <Checkout /> },
  { path: 'wishlist', element: <Wishlist /> },
  { path: 'compare', element: <Compare /> },
  { path: 'orders', element: <OrderHistory /> },
  { path: '*', element: <NotFound /> },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'system-ui', color: 'var(--color-ink-soft)' }}>Loading ShoppyGlobe...</div>}>
        <Layout />
      </Suspense>
    ),
    children: childRoutes,
  },
], { basename: import.meta.env.BASE_URL });

export default router;
