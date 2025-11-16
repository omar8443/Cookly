// lib/firebase.ts
// NOTE: We intentionally use `firebase/auth` (web entrypoint) instead of `firebase/auth/react-native`
// to avoid the UnableToResolveError in the current setup. For advanced RN persistence, we can
// later reintroduce `initializeAuth` with AsyncStorage once the correct firebase version is confirmed.

import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW7O0vzCL_3nvWjb0T6UMn6bWHzmS6R2Y",
  authDomain: "cookly-174fc.firebaseapp.com",
  projectId: "cookly-174fc",
  storageBucket: "cookly-174fc.firebasestorage.app",
  messagingSenderId: "588332210026",
  appId: "1:588332210026:web:cd1f232def2219dafaf713",
  measurementId: "G-XXZNJ9PMB9",
};

// Initialize Firebase (avoid duplicate initialization in React Native / Expo)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Simple Auth & Firestore exports (in-memory persistence is fine for now)
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only for web platform)
// Analytics doesn't work in React Native, so we conditionally initialize it
if (Platform.OS === "web") {
  try {
    getAnalytics(app);
  } catch (error) {
    // Analytics may fail if not in a browser environment
    console.log("Analytics initialization skipped:", error);
  }
}

export default app;
