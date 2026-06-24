import { createSlice } from '@reduxjs/toolkit';

/**
 * filtersSlice
 * Stores the catalog search, category, and sort preferences in Redux so the
 * product list can react to them consistently from anywhere in the app.
 */

const initialState = {
  searchTerm: '',
  category: 'all', // 'all' or a dummyjson category slug
  sortBy: 'default', // 'default' | 'price-asc' | 'price-desc' | 'rating-desc'
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    resetFilters(state) {
      state.searchTerm = initialState.searchTerm;
      state.category = initialState.category;
      state.sortBy = initialState.sortBy;
    },
  },
});

export const { setSearchTerm, setCategory, setSortBy, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
