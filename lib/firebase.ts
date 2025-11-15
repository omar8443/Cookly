// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW7O0vzCL_3nvWjb0T6UMn6bWHzmS6R2Y",
  authDomain: "cookly-174fc.firebaseapp.com",
  projectId: "cookly-174fc",
  storageBucket: "cookly-174fc.firebasestorage.app",
  messagingSenderId: "588332210026",
  appId: "1:588332210026:web:cd1f232def2219dafaf713",
  measurementId: "G-XXZNJ9PMB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);