// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: process.env.API_FIREBASE_KEY,
  authDomain: process.env.API_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.API_FIREBASE_PROJECT_ID,
  storageBucket: process.env.API_FIREBASE_STORAGE_BACKET,
  messagingSenderId: process.env.API_FIREBASE_SENDER_ID,
  appId: process.env.API_FIREBASE_APP_ID
};

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)