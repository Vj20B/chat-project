// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import{ getFirestore } from "firebase/firestore";
import { getStorage }  from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoUMhcBK4r5bM3g3DS0suJMTUGKCmDVU4",
  authDomain: "mychatapp-f5a45.firebaseapp.com",
  projectId: "mychatapp-f5a45",
  storageBucket: "mychatapp-f5a45.appspot.com",
  messagingSenderId: "877004633594",
  appId: "1:877004633594:web:a139aae7a05e480588a043"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)