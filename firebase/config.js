import { initializeApp } from "@firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA6XWC42nSoyf_sqkAtzwOmi6p68NjkrPc",
    authDomain: "voting-app-7e22e.firebaseapp.com",
    projectId: "voting-app-7e22e",
    storageBucket: "voting-app-7e22e.appspot.com",
    messagingSenderId: "475105345337",
    appId: "1:475105345337:web:e45c45f1b860b9677832e8"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

 export {signInWithPopup, auth, app, provider}