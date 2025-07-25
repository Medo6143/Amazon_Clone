// hooks/useWishlist.js
import { useDispatch, useSelector } from 'react-redux';
import {
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    selectWishlistItems,
} from '../store/wishlistSlice';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

export const useWishlist = () => {
    const dispatch = useDispatch();

    const items = useSelector(selectWishlistItems);

    const inWishlist = useCallback(
        (id) => items.some((i) => i.id === id),
        [items]
    );

    const addItem = (product) => {
        dispatch(addToWishlist(product));
        toast.info('Added to wishlist');
    };

    const removeItem = (id) => {
        dispatch(removeFromWishlist(id));
        toast.info('Removed from wishlist');
    };

    const empty = () => dispatch(clearWishlist());

    return { items, inWishlist, addItem, removeItem, empty };
};
