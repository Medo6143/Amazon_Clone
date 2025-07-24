import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  removeItemCompletely,
  clearCart,
  selectCartItems,
  selectTotalQuantity,
  selectTotalPrice,
} from '../store/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  const addItemToCart = (product, quantity = 1) => {
    dispatch(addToCart(product, quantity));
  };

  const decreaseItemQuantity = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const removeItem = (productId) => {
    dispatch(removeItemCompletely(productId));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  return {
    cartItems: items,
    totalQuantity,
    totalPrice,
    addItemToCart,
    decreaseItemQuantity,
    removeItem,
    emptyCart,
  };
};