import { onAuthStateChanged }  from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db }            from './firebase';      
import { store }               from '../store';
import { hydrateCart }         from '../store/cartSlice';
import { hydrateWishlist }     from '../store/wishlistSlice';

/* ----------- 1. hydrate the store on login ------------ */
onAuthStateChanged(auth, async user => {
  if (!user) return;                       // guests stay on localStorage state

  try {
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      if (data.cart)      store.dispatch(hydrateCart(data.cart));
      if (data.wishlist)  store.dispatch(hydrateWishlist(data.wishlist));
    } else {
      // first login – create empty doc 
      await setDoc(ref, { cart: store.getState().cart,
                          wishlist: store.getState().wishlist });
    }
  } catch (err) {
    console.error(' could not hydrate from Firestore', err);
  }
});

/* -----------  push changes back to Firestore ---------- */
let debounce;
store.subscribe(() => {
  clearTimeout(debounce);
  debounce = setTimeout(async () => {
    const state = store.getState();

    /* keep guest experience identical */
    localStorage.setItem('cart',     JSON.stringify(state.cart));
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));

    /* save to Firestore only if signed-in */
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        { cart: state.cart, wishlist: state.wishlist },
        { merge: true }                       
      );
    } catch (err) {
      console.error(' could not save to Firestore', err);
    }
  }, 400);                                    // one write max / 400 ms
});
