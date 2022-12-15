// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqf9gAKyi9JoAun0jzeyK3POSEhj6a0VA",
  authDomain: "authentication-form-498a7.firebaseapp.com",
  projectId: "authentication-form-498a7",
  storageBucket: "authentication-form-498a7.appspot.com",
  messagingSenderId: "697910606862",
  appId: "1:697910606862:web:f93ef48feb2a695c1e505f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;