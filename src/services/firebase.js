import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// Your web app' 
const firebaseConfig = {
  apiKey: "AIzaSyA1jZS6xqU1YPpv-Alg6sZ_sJVQUc1vAfY",
  authDomain: "fir-dd0f5.firebaseapp.com",
  projectId: "fir-dd0f5",
  storageBucket: "fir-dd0f5.firebasestorage.app",
  messagingSenderId: "451474373644",
  appId: "1:451474373644:web:15624aad9d23d248cd8229"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth  = getAuth(app)