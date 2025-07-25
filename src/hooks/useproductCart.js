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
import { toast } from 'react-toastify';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const getQuantity = (id) =>
    items.find(i => i.id === id)?.quantity ?? 0;

  const addItemToCart = (product, quantity = 1) => {
    dispatch(addToCart(product, quantity));
    const wasInCart = getQuantity(product.id) > 0;
    toast.success(
      wasInCart
        ? `Increased ${product.title} to ${getQuantity(product.id) + quantity}`
        : `${product.title} added to cart`
    );
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
    getQuantity,
  };
};