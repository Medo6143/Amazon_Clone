// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer     from './store/cartSlice';
import productsReducer from './store/productsSlice';

/* --- helpers --- */
const loadCart = () => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : undefined;   // undefined =use slice initialState
  } catch {
    return undefined;
  }
};

const saveCart = (state) => {
  try {
    const serial = JSON.stringify(state.cart);
    localStorage.setItem('cart', serial);
  } catch {
    /* ignore write errors */
  }
};

export const store = configureStore({
  reducer: {
    cart:     cartReducer,
    products: productsReducer
  },
  preloadedState: {
    cart: loadCart()                  
  }
});

/* subscribe once after store is created */
store.subscribe(() => saveCart(store.getState()));
