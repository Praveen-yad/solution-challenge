// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the authentication module

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6hzLP7-ywd5Az7XkV3Ko-nHm8LAY7yuA",
  authDomain: "solution-challenge-c5b79.firebaseapp.com",
  databaseURL: "https://solution-challenge-c5b79-default-rtdb.firebaseio.com",
  projectId: "solution-challenge-c5b79",
  storageBucket: "solution-challenge-c5b79.appspot.com",
  messagingSenderId: "191205070894",
  appId: "1:191205070894:web:199449c567a999c8df27bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase authentication instance
const auth = getAuth(app);

export { auth }; // Export the authentication instance to be used in other parts of your application
