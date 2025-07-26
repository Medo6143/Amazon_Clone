import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
  } from 'firebase/auth';
  import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
  import { auth, db } from '../firebase'; // <-- صحّح المسار
  
  export async function createAccount({ name, email, password, verifyEmail = true }) {
    if (!name || !email || !password) {
      throw new Error('Please fill in all fields');
    }
  
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
  
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
    await updateProfile(user, { displayName: name });
  
    if (verifyEmail) {
      await sendEmailVerification(user);
    }
  
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      name,
      email,
      createdAt: serverTimestamp(),
      emailVerified: user.emailVerified, 
    });
  
    return {
      uid: user.uid,
      name,
      email,
    };
  }
  