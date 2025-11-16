/**
 * Maps Firebase Auth error codes to user-friendly error messages
 */
export function mapFirebaseAuthError(error: any): string {
  if (!error || !error.code) {
    return "An unexpected error occurred. Please try again.";
  }

  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead.";
    case "auth/invalid-email":
      return "Invalid email address. Please check and try again.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/wrong-password":
      return "Invalid email or password.";
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is not enabled. Please contact support.";
    case "auth/configuration-not-found":
      return "Firebase configuration error. Please restart the app or contact support.";
    default:
      console.error("Unhandled Firebase Auth error:", error.code, error.message);
      return error.message || "Authentication failed. Please try again.";
  }
}

