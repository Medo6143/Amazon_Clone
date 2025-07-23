import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: {
      reducer(state, action) {
        const { id, price, quantity = 1 } = action.payload;
        const existingItem = state.items.find(item => item.id === id);
        
        if (existingItem) {
          existingItem.quantity += quantity;
          existingItem.totalPrice += price * quantity;
        } else {
          state.items.push({
            ...action.payload,
            quantity,
            totalPrice: price * quantity
          });
        }
        
        state.totalQuantity += quantity;
        state.totalPrice += price * quantity;
      },
      prepare(product, quantity = 1) {
        return {
          payload: {
            ...product,
            quantity
          }
        };
      }
    },
    
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          state.totalQuantity--;
          state.totalPrice -= existingItem.price;
        } else {
          state.items = state.items.filter(item => item.id !== id);
          state.totalQuantity--;
          state.totalPrice -= existingItem.price;
        }
      }
    },
    
    removeItemCompletely(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  removeItemCompletely, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = state => state.cart.items;
export const selectTotalQuantity = state => state.cart.totalQuantity;
export const selectTotalPrice = state => state.cart.totalPrice;