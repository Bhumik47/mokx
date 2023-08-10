// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuj9Ixmp_hlAWNc1T9QEZdqMu5yEHA0n0",
  authDomain: "https://mokx-psi.vercel.app/",
  projectId: "mokx-3cce1",
  storageBucket: "mokx-3cce1.appspot.com",
  messagingSenderId: "244581206893",
  appId: "1:244581206893:web:e9abfc0d214767df03a864",
  measurementId: "G-T9MWVW754B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
