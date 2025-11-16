# Firebase Configuration Error - Troubleshooting Guide

## Error: "Firebase configuration error. Please restart the app or contact support"

This error (`auth/configuration-not-found`) typically means Firebase Auth isn't properly configured.

## Step-by-Step Fix

### 1. Verify Firebase Console Settings

Go to [Firebase Console](https://console.firebase.google.com/) → Select project `cookly-174fc`:

1. **Authentication → Sign-in method**
   - ✅ Enable "Email/Password"
   - ✅ Make sure it's toggled ON (not just Email link)
   - ✅ Click "Save"

2. **Project Settings → General**
   - Verify your Web app is registered
   - Check that the config values match `lib/firebase.ts`

### 2. Check Console Logs

When you try to sign up, look for these logs in your terminal/Metro:

```
[Firebase] Initialized new app instance: [DEFAULT]
[Firebase] Config projectId: cookly-174fc
[Firebase] Auth initialized successfully
[Firebase] Auth app name: [DEFAULT]
[Firebase] Auth app projectId: cookly-174fc
[Auth] Starting sign-up process...
[Auth] Auth instance check: { exists: true, appName: '[DEFAULT]', ... }
```

**If you see errors here**, that's where the problem is.

### 3. Common Issues & Solutions

#### Issue: "Auth initialization failed"
**Solution**: 
- Restart Expo completely: Stop the server (Ctrl+C) and run `npx expo start --clear`
- Close and reopen Expo Go app on your phone

#### Issue: "Email/Password not enabled"
**Solution**:
- Go to Firebase Console → Authentication → Sign-in method
- Enable "Email/Password" (not just Email link)
- Wait 30 seconds for changes to propagate

#### Issue: Network/Connection Error
**Solution**:
- Check your internet connection
- Try on a different network
- Verify Firebase project is active (not paused)

#### Issue: Config Mismatch
**Solution**:
- Go to Firebase Console → Project Settings → Your apps → Web app
- Copy the config values
- Update `lib/firebase.ts` with the exact values

### 4. Test Firebase Connection

Try this in your browser console (if testing on web) or check Metro logs:

```javascript
// Should see these logs on app start:
[Firebase] Initialized new app instance: [DEFAULT]
[Firebase] Auth initialized successfully
```

### 5. Nuclear Option: Full Reset

If nothing works:

1. **Stop Expo**: `Ctrl+C` in terminal
2. **Clear cache**: `npx expo start --clear`
3. **Close Expo Go**: Completely close the app on your phone
4. **Restart**: Open Expo Go fresh and scan QR code again

## What to Check in Console Logs

When you press "Sign Up", you should see:

```
[Auth] Starting sign-up process...
[Auth] Auth instance check: { exists: true, appName: '[DEFAULT]', appOptions: 'cookly-174fc' }
[Auth] Creating user with email: your@email.com
[Auth] Calling createUserWithEmailAndPassword...
```

**If you see `exists: false` or `appName: undefined`**, the auth instance isn't initialized properly.

## Still Not Working?

Share these details:
1. The exact console logs when you press "Sign Up"
2. Screenshot of Firebase Console → Authentication → Sign-in method (showing Email/Password is enabled)
3. Whether you're testing on iOS, Android, or Web





