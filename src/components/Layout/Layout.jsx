import { lazy, Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Loader from '../common/Loader';

const Header = lazy(() => import('../Header/Header'));
const Footer = lazy(() => import('../Footer/Footer'));
const ToastViewport = lazy(() => import('../common/ToastViewport'));

/**
 * Layout
 * The shared page shell rendered by every route: Header up top, the
 * routed page in the middle (via <Outlet />), Footer at the bottom.
 *
 * All major sub-layout components are lazy-loaded to ensure that the
 * initial bundle is extremely small and loads instantly.
 */
function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Suspense fallback={<div style={{ height: '72px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }} />}>
        <Header />
      </Suspense>
      <main className="page-main">
        <Suspense fallback={<Loader label="Loading page..." size="lg" />}>
          <Outlet />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <ToastViewport />
      </Suspense>
      <Suspense fallback={<div style={{ height: '160px', borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Layout;
