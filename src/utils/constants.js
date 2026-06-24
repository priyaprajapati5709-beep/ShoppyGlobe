/**
 * Shared app constants keep repeated values in one place and make updates
 * easier across the storefront.
 */

export const API_BASE_URL = 'https://dummyjson.com/products';

export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/:productId',
  CART: '/cart',
  CHECKOUT: '/checkout',
};

export const buildProductRoute = (productId) => `/product/${productId}`;

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10; // sane upper bound for a demo cart

export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_FLAT_RATE = 7.99;
export const TAX_RATE = 0.08; // flat 8% demo tax rate
