// src/services/auth/login.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase'; // صحّح المسار حسب مشروعك

export async function login({ email, password, checkVerified = false }) {
  if (!email || !password) {
    throw new Error('Please enter email and password');
  }

  const { user } = await signInWithEmailAndPassword(auth, email, password);

  if (checkVerified && !user.emailVerified) {
    throw new Error('Please verify your email first.');
  }

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    emailVerified: user.emailVerified,
  };
}
