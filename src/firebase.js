// Import the functions you need from the SDKs you need
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

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
const db = getFirestore(app);

export async function signup(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("success");
  } catch (error) {
    alert(error);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = false;
        if (success) {
          resolve(data);
        } else {
          reject(error);
        }
      }, 1000);
    });
    
  }
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  
  return currentUser;
}


export default getFirestore();