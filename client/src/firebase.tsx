// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaLEkjb8YshMgm22b5IdignWWXEbXytFM",
  authDomain: "twitterclone-47eea.firebaseapp.com",
  projectId: "twitterclone-47eea",
  storageBucket: "twitterclone-47eea.appspot.com",
  messagingSenderId: "412846242693",
  appId: "1:412846242693:web:1b5b6504bc156a2035e2ec",
  measurementId: "G-7S2Z6M1EJG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
