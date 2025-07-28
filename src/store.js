// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './store/cartSlice';
import productsReducer from './store/productsSlice';
import wishlistReducer from './store/wishlistSlice';

const safeParse = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const loadCart = () => safeParse('cart', undefined);
const loadWishlist = () => safeParse('wishlist', { items: [] });

let timeout;
const saveState = (state) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    } catch {/* ignore  errors */ }
  }, 300);
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: {
    cart: loadCart(),
    wishlist: loadWishlist(),
  },
});

store.subscribe(() => saveState(store.getState()));
