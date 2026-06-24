# ShoppyGlobe

ShoppyGlobe is a polished e-commerce web app built with React, Redux Toolkit, and React Router. It delivers a smooth shopping experience through product browsing, detailed pages, cart management, smart filtering, sorting, and a sample checkout flow. Product information is pulled from [dummyjson.com/products](https://dummyjson.com/products).

Repository: [ShoppyGlobe Repository](https://github.com/shivanshsingh05102000/ShoppyGlobe)

## Overview

This application is designed to feel like a polished online marketplace while keeping the codebase clear and modular. It combines reusable UI components, centralized state management, client-side routing, and thoughtful UX details such as lazy-loaded images, validation, and cart-aware pricing.

## Tech Stack

- React 19 with Vite
- Redux Toolkit and React Redux
- React Router v7
- Plain CSS with a custom design system
- PropTypes for component validation

## Features

- Browse products from a live product feed
- View detailed product information on a dedicated page
- Add, remove, and update items in the cart
- Filter and sort products by category, price, and rating
- See live shipping-related cart feedback
- Complete a simulated checkout form with validation
- Enjoy responsive layouts and smooth loading states

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app will typically open at http://localhost:5173 unless Vite selects a different port.

3. Useful commands:

```bash
npm run build
npm run preview
npm run lint
```

## Project Structure

```text
src/
  components/
    Header/
    Footer/
    Layout/
    ProductList/
    ProductItem/
    ProductDetail/
    Cart/
    CartItem/
    Checkout/
    NotFound/
    common/
  pages/
    Home.jsx
  redux/
    store.js
    cartSlice.js
    cartSelectors.js
    filtersSlice.js
    filtersSelectors.js
  hooks/
    useProducts.js
    useProductDetail.js
    useDebounce.js
  router/
    router.jsx
  utils/
    constants.js
    formatPrice.js
```

## Notes

- The checkout experience is intentionally demo-only and does not process real payments.
- Product and cart images use lazy-loading techniques for better performance.
- The interface is designed to be responsive across desktop and mobile screens.

