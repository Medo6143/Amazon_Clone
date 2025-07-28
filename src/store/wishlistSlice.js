import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: []
  },
  reducers: {
    addToWishlist(state, action) {
      const id = action.payload.id;
      if (!state.items.find(i => i.id === id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearWishlist(state) {
      state.items = [];
    },
    hydrateWishlist(state, action) {
      return action.payload;
    }
  }
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  hydrateWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const selectWishlistItems = state => state.wishlist.items;
export const isInWishlist = id => state =>
  state.wishlist.items.some(i => i.id === id);
