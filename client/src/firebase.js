// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: "genwebai-1cf42.firebaseapp.com",
  projectId: "genwebai-1cf42",
  storageBucket: "genwebai-1cf42.firebasestorage.app",
  messagingSenderId: "722935069750",
  appId: "1:722935069750:web:f5db354cba5f00cc996c97",
  measurementId: "G-VD0KPTQ9ZE",
};

let auth = null;
let provider = null;

try {
  if (!firebaseConfig.apiKey) {
    throw new Error(
      "Firebase API key is missing. Add VITE_FIREBASE_API_KEY to client/.env",
    );
  }

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
} catch (error) {
  console.warn(
    "Firebase auth is disabled because the API key is missing or invalid:",
    error.message,
  );
}

export { auth, provider };
