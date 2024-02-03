// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg2N7ArCp4oZCngQBJoc8bUFLTkOnSlGA",
  authDomain: "h4gteam-316bb.firebaseapp.com",
  projectId: "h4gteam-316bb",
  storageBucket: "h4gteam-316bb.appspot.com",
  messagingSenderId: "1045507923284",
  appId: "1:1045507923284:web:740b9f53ef567fc3ac7cc1",
  measurementId: "G-K79DD9V5SL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
}

export default getFirestore();