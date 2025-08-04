// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd-9tdNy1lcB1XuVoslXwHBRBrwgfZQtU",
  authDomain: "freshcart-eb5fc.firebaseapp.com",
  projectId: "freshcart-eb5fc",
  storageBucket: "freshcart-eb5fc.firebasestorage.app",
  messagingSenderId: "1086865219616",
  appId: "1:1086865219616:web:fe69e960fdc381f4e89c45",
  measurementId: "G-HBJZJ8Q4D5",
  databaseURL: "https://freshcart-eb5fc-default-rtdb.firebaseio.com/",
};

// Initialize and export Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
