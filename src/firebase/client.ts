// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: (import.meta.env.REAL_DATABASE === "true") ? import.meta.env.PUBLIC_API_KEY : import.meta.env.PUBLIC_API_KEY1,
  authDomain: (import.meta.env.REAL_DATABASE === "true")? import.meta.env.PUBLIC_AUTH_DOMAIN : import.meta.env.PUBLIC_AUTH_DOMAIN1,
  projectId: (import.meta.env.REAL_DATABASE === "true")? import.meta.env.PUBLIC_PROJECT_ID : import.meta.env.PUBLIC_PROJECT_ID1,
  storageBucket: (import.meta.env.REAL_DATABASE === "true")? import.meta.env.PUBLIC_STORAGE_BUCKET : import.meta.env.PUBLIC_STORAGE_BUCKET1,
  messagingSenderId: (import.meta.env.REAL_DATABASE === "true")? import.meta.env.PUBLIC_MESSAGING_SENDER_ID : import.meta.env.PUBLIC_MESSAGING_SENDER_ID1,
  appId: (import.meta.env.REAL_DATABASE === "true")? import.meta.env.PUBLIC_APP_ID : import.meta.env.PUBLIC_APP_ID1
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(firebaseConfig)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

provider.setCustomParameters({
  prompt: "select_account"
})
export const auth = getAuth(app)