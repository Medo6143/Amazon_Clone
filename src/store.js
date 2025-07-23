import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './store/productsSlice';
import cartReducer from './store/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
