import './Footer.css';

/**
 * Footer
 * A simple site-wide footer shown on every page. It is purely presentational
 * and does not require any props.
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__brand">ShoppyGlobe</p>
        <p className="site-footer__note">
          A demo storefront created for a React training project. Catalog data courtesy of{' '}
          <a href="https://dummyjson.com" target="_blank" rel="noreferrer">dummyjson.com</a>.
        </p>
        <p className="site-footer__copy">© {year} ShoppyGlobe. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
