import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import filtersReducer from './filtersSlice';
import wishlistReducer from './wishlistSlice';
import uiReducer from './uiSlice';
import ordersReducer from './ordersSlice';
import productsReducer from './productsSlice';

/**
 * The Redux store now covers cart, filters, wishlist/compare, UI, and products state.
 */
const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
    orders: ordersReducer,
    products: productsReducer,
  },
});

export default store;
