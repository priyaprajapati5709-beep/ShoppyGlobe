import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  compare: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistItem(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        state.items = state.items.filter((item) => item.id !== product.id);
        return;
      }
      state.items.push(product);
    },
    addToCompare(state, action) {
      const product = action.payload;
      if (state.compare.find((item) => item.id === product.id)) return;
      if (state.compare.length >= 3) {
        state.compare = state.compare.slice(1);
      }
      state.compare.push(product);
    },
    removeFromCompare(state, action) {
      state.compare = state.compare.filter((item) => item.id !== action.payload);
    },
  },
});

export const { toggleWishlistItem, addToCompare, removeFromCompare } = wishlistSlice.actions;
export default wishlistSlice.reducer;
