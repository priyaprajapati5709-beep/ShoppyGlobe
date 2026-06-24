import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemCount } from '../../redux/cartSelectors';
import { selectSearchTerm } from '../../redux/filtersSelectors';
import { setSearchTerm } from '../../redux/filtersSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { toggleTheme } from '../../redux/uiSlice';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartItemCount);
  const reduxSearchTerm = useSelector(selectSearchTerm);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const compareCount = useSelector((state) => state.wishlist.compare.length);
  const theme = useSelector((state) => state.ui.theme);
  const [inputValue, setInputValue] = useState(reduxSearchTerm);
  const [lastReduxSearchTerm, setLastReduxSearchTerm] = useState(reduxSearchTerm);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedValue));
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  if (reduxSearchTerm !== lastReduxSearchTerm) {
    setLastReduxSearchTerm(reduxSearchTerm);
    if (reduxSearchTerm === '' && inputValue !== '') setInputValue('');
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="ShoppyGlobe home">
          <span className="site-header__brand-mark">SG</span>
          <span className="site-header__brand-name">ShoppyGlobe</span>
        </Link>

        <div className="site-header__search-wrap">
          <div className="site-header__search">
            <SearchIcon />
            <input
              type="search"
              className="site-header__search-input"
              placeholder="Search catalog..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              aria-label="Search products"
            />
          </div>
        </div>

        <nav className="site-header__nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => `site-header__link ${isActive ? 'is-active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => `site-header__icon-link ${isActive ? 'is-active' : ''}`}>
            Saved {wishlistCount > 0 ? <span className="site-header__mini-badge">{wishlistCount}</span> : null}
          </NavLink>
          <NavLink to="/compare" className={({ isActive }) => `site-header__icon-link ${isActive ? 'is-active' : ''}`}>
            Compare {compareCount > 0 ? <span className="site-header__mini-badge">{compareCount}</span> : null}
          </NavLink>
          <button type="button" className="site-header__icon-link" onClick={() => dispatch(toggleTheme())} aria-label="Toggle theme">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <NavLink
            to="/cart"
            className={({ isActive }) => `site-header__cart ${isActive ? 'is-active' : ''}`}
            aria-label={`Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
          >
            <CartIcon />
            {cartCount > 0 && <span className="site-header__cart-badge">{cartCount}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg className="site-header__search-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="site-header__cart-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6h15l-2 8H8L6 6Z" />
      <path d="M6 6 5 3H2" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}

export default Header;
