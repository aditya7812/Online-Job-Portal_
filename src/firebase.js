// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth} from "firebase/auth"
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIWJ2thf2sxdsBGfHLAjga5Q9Xi5DRe0k",
  authDomain: "online-job-portal-37144.firebaseapp.com",
  projectId: "online-job-portal-37144",
  storageBucket: "online-job-portal-37144.appspot.com",
  messagingSenderId: "884057371039",
  appId: "1:884057371039:web:35d4c79cf6d9133de38daa",
  measurementId: "G-733FCF3K2Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)
