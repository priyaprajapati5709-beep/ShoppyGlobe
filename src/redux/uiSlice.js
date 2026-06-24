import { createSlice, nanoid } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return window.localStorage.getItem('shoppy-theme') ?? 'light';
};

const initialState = {
  theme: getInitialTheme(),
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('shoppy-theme', state.theme);
      }
    },
    showToast(state, action) {
      const { title, message, variant = 'info' } = action.payload;
      state.toasts.push({
        id: nanoid(),
        title,
        message,
        variant,
      });
    },
    dismissToast(state, action) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { toggleTheme, showToast, dismissToast } = uiSlice.actions;
export default uiSlice.reducer;
