// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVy7FLQrXy3gCH5mWOZiD9OXy6vJzieiY",
  authDomain: "to-do-list-3cfc4.firebaseapp.com",
  projectId: "to-do-list-3cfc4",
  storageBucket: "to-do-list-3cfc4.appspot.com",
  messagingSenderId: "252384890593",
  appId: "1:252384890593:web:d1f7b5f2759dec04def1a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)