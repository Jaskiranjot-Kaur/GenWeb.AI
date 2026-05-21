// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-1cf42.firebaseapp.com",
  projectId: "genwebai-1cf42",
  storageBucket: "genwebai-1cf42.firebasestorage.app",
  messagingSenderId: "722935069750",
  appId: "1:722935069750:web:f5db354cba5f00cc996c97",
  measurementId: "G-VD0KPTQ9ZE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
