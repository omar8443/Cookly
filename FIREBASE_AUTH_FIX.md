# Firebase Auth Fix - Configuration Not Found Error

## Problem Summary

The `auth/configuration-not-found` error was occurring because:

1. **Using `initializeAuth` with AsyncStorage**: The previous code used `initializeAuth` with `getReactNativePersistence(AsyncStorage)`, which can cause configuration issues in Expo Go
2. **No guard against multiple initializations**: On hot reload, Firebase could be initialized multiple times
3. **Incorrect auth instance**: The auth instance might not have been properly connected to the Firebase app

## Solution

### 1. Fixed Firebase Initialization (`lib/firebase.ts`)

**Key Changes:**
- ✅ Use `getAuth()` instead of `initializeAuth()` for Expo Go compatibility
- ✅ Added `getApps()` guard to prevent duplicate initialization
- ✅ Proper TypeScript types for all exports
- ✅ Single source of truth for Firebase app instance

**Why this fixes it:**
- `getAuth()` works reliably in Expo Go (Web SDK)
- `initializeAuth()` with AsyncStorage can cause configuration conflicts
- Guarding with `getApps()` ensures only one app instance exists

### 2. Updated Sign-Up Handler (`app/auth.tsx`)

**Key Changes:**
- ✅ Uses `updateProfile()` to set displayName in Firebase Auth (not just Firestore)
- ✅ Better error handling with early returns
- ✅ Proper loading state management
- ✅ All errors displayed in UI (no unhandled errors)

## Final File Contents

### `lib/firebase.ts`

```typescript
/**
 * Firebase Configuration and Initialization
 * 
 * Uses Firebase Web v9+ modular SDK (compatible with Expo Go)
 * 
 * IMPORTANT: This file initializes Firebase exactly once.
 * All other files should import { auth, db } from this file.
 */

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";
import { Platform } from "react-native";

// Your web app's Firebase configuration from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCW7O0vzCL_3nvWjb0T6UMn6bWHzmS6R2Y",
  authDomain: "cookly-174fc.firebaseapp.com",
  projectId: "cookly-174fc",
  storageBucket: "cookly-174fc.firebasestorage.app",
  messagingSenderId: "588332210026",
  appId: "1:588332210026:web:cd1f232def2219dafaf713",
  measurementId: "G-XXZNJ9PMB9"
};

// Initialize Firebase App - guard against multiple initializations
let firebaseApp: FirebaseApp;
const existingApps = getApps();

if (existingApps.length > 0) {
  // Use existing app instance (prevents duplicate initialization on hot reload)
  firebaseApp = existingApps[0];
  console.log("[Firebase] Using existing app instance");
} else {
  // Initialize new app instance
  firebaseApp = initializeApp(firebaseConfig);
  console.log("[Firebase] Initialized new app instance");
}

// Initialize Auth - use getAuth for Expo Go compatibility
// Note: getAuth works in Expo Go. initializeAuth with AsyncStorage can cause issues.
export const auth: Auth = getAuth(firebaseApp);

// Initialize Firestore
export const db: Firestore = getFirestore(firebaseApp);

// Initialize Analytics (web only)
let analytics: Analytics | undefined;
if (Platform.OS === "web") {
  try {
    analytics = getAnalytics(firebaseApp);
  } catch (error) {
    console.warn("[Firebase] Analytics initialization failed (non-fatal):", error);
  }
}

// Export app instance for advanced use cases
export { firebaseApp };

// Export analytics (may be undefined on native)
export { analytics };
```

### `app/auth.tsx` - Sign-Up Handler

```typescript
const handleSignUp = async () => {
  setError("");
  setLoading(true);

  // Validation
  if (!email.trim() || !password) {
    setError("Please enter an email and password.");
    setLoading(false);
    return;
  }

  if (!validateEmail(email.trim())) {
    setError("Please enter a valid email address.");
    setLoading(false);
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    setLoading(false);
    return;
  }

  console.log("[Auth] Starting sign-up process...");

  try {
    console.log("[Auth] Creating user with email:", email.trim());
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
    const user = userCredential.user;
    console.log("[Auth] User created successfully:", user.uid);

    // Update display name in Firebase Auth profile
    if (name?.trim()) {
      try {
        console.log("[Auth] Updating user profile with display name...");
        await updateProfile(user, { displayName: name.trim() });
        console.log("[Auth] User profile updated successfully");
      } catch (profileError: any) {
        console.error("[Auth] Profile update error (non-fatal):", profileError);
        // Don't fail sign-up if profile update fails
      }
    }

    // Create user document in Firestore (optional, for additional user data)
    try {
      console.log("[Auth] Creating user document in Firestore...");
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: name.trim() || "",
        createdAt: serverTimestamp(),
      });
      console.log("[Auth] User document created successfully");
    } catch (firestoreError: any) {
      console.error("[Auth] Firestore error (non-fatal):", firestoreError);
      // Don't fail sign-up if Firestore write fails - user is still authenticated
    }

    // Navigation will happen automatically via auth state change in _layout.tsx
    console.log("[Auth] Sign-up successful, waiting for navigation...");
  } catch (error: any) {
    console.error("[Auth] Sign-up error:", error.code, error.message);
    const errorMessage = mapFirebaseAuthError(error);
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};
```

## Why `auth/configuration-not-found` Was Happening

1. **`initializeAuth` with AsyncStorage**: The previous implementation used `initializeAuth()` with `getReactNativePersistence(AsyncStorage)`. In Expo Go, this can cause configuration conflicts because:
   - Expo Go runs JavaScript in a WebView-like environment
   - The Web SDK's `initializeAuth` expects a specific setup that may not align with Expo Go's runtime
   - AsyncStorage persistence setup can conflict with the auth configuration

2. **Solution**: Use `getAuth()` which:
   - Works reliably in Expo Go (it's the standard Web SDK method)
   - Automatically handles persistence in the browser/Expo Go environment
   - Doesn't require manual AsyncStorage configuration
   - Is the recommended approach for Expo projects using the Web SDK

3. **Multiple Initializations**: Added `getApps()` guard to prevent duplicate Firebase app instances on hot reload, which could cause configuration conflicts.

## Testing

1. **Run the app**: `npm start` or `npx expo start`
2. **Test sign-up**:
   - Fill in name, email, password
   - Tap "Sign Up"
   - Should create account and navigate to home
3. **Check console logs**: Look for `[Firebase]` and `[Auth]` prefixed logs
4. **Verify in Firebase Console**: Check Authentication > Users to see the new account

## Files Changed

1. ✅ `lib/firebase.ts` - Fixed initialization, uses `getAuth()`
2. ✅ `app/auth.tsx` - Updated sign-up handler with `updateProfile()`
3. ✅ `utils/authErrors.ts` - Added `auth/configuration-not-found` error mapping

## Status

✅ **Fixed and Ready to Test**

The sign-up flow should now work correctly without the `auth/configuration-not-found` error.


