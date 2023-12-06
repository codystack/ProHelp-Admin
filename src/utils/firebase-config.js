// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmLrIoz4sTfCLc84tjdX8s4Pc6TdYzaMk",
  authDomain: "prohelp-95c57.firebaseapp.com",
  projectId: "prohelp-95c57",
  storageBucket: "prohelp-95c57.appspot.com",
  messagingSenderId: "964741321159",
  appId: "1:964741321159:web:1717f54024af78c838c9e2",
  measurementId: "G-N1G0P169F9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export {
  storage,
  uploadBytes,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
};
