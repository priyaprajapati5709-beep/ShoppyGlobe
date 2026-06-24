import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action) {
      state.items.unshift({
        id: action.payload.id,
        createdAt: action.payload.createdAt,
        total: action.payload.total,
        itemCount: action.payload.itemCount,
        items: action.payload.items,
      });
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
