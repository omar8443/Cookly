/**
 * AUTH SCREEN - Sign Up / Sign In
 * 
 * Modern clean sign-up/sign-in screen with:
 * - Centered design
 * - Smooth transitions
 * - Clean white card design
 * - Top-label inputs
 * - White, grey, and dark blue color scheme
 */

import { PROFILE_BACKGROUND_IMAGE } from "@/constants/colors";
import { auth, db } from "@/lib/firebase";
import { mapFirebaseAuthError } from "@/utils/authErrors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Snackbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const COLORS = {
  background: "#F5F5F5",
  white: "#FFFFFF",
  grey: "#9E9E9E",
  greyLight: "#E0E0E0",
  greyDark: "#424242",
  darkBlue: "#1565C0",
  darkBlueLight: "#1976D2",
  textPrimary: "#212121",
  textSecondary: "#757575",
  error: "#D32F2F",
};

export default function AuthScreen(): React.JSX.Element {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  // Animation values for smooth transitions
  const fadeAnim = useState(new Animated.Value(1))[0];
  const slideAnim = useState(new Animated.Value(0))[0];

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignUp = async (): Promise<void> => {
    setError("");
    setLoading(true);

    if (!name.trim()) {
      setError("Please enter your name.");
      setLoading(false);
      return;
    }

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

    try {
      if (!auth) {
        throw new Error("Auth instance is not initialized. Please restart the app.");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      if (name?.trim()) {
        try {
          await updateProfile(user, { displayName: name.trim() });
        } catch (profileError: any) {
          console.error("[Auth] Profile update error (non-fatal):", profileError);
        }
      }

      try {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          displayName: name.trim() || "",
          createdAt: serverTimestamp(),
        });
      } catch (firestoreError: any) {
        console.error("[Auth] Firestore error (non-fatal):", firestoreError);
      }
    } catch (error: any) {
      const errorMessage = mapFirebaseAuthError(error);
      setError(errorMessage);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (): Promise<void> => {
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error: any) {
      const errorMessage = mapFirebaseAuthError(error);
      setError(errorMessage);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (): void => {
    if (isSignUp) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  const handleForgotPassword = async (): Promise<void> => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      setError(error.message || "Failed to send reset email");
    }
  };

  const handleToggleMode = (): void => {
    // Smooth fade and slide animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsSignUp(!isSignUp);
      setError("");
      setSnackbarVisible(false);
      
      // Animate back in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const getBorderColor = (inputName: string) => {
    return focusedInput === inputName ? COLORS.darkBlue : COLORS.greyLight;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: PROFILE_BACKGROUND_IMAGE }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.content}>
                <Animated.View
                  style={[
                    styles.animatedContainer,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }],
                    },
                  ]}
                >
                  {/* Logo/Header */}
                  <View style={styles.header}>
                    <View style={styles.logoContainer}>
                      <LinearGradient
                        colors={[COLORS.darkBlue, COLORS.darkBlueLight]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.logoGradient}
                      >
                        <MaterialCommunityIcons
                          name="chef-hat"
                          size={48}
                          color="#FFFFFF"
                        />
                      </LinearGradient>
                    </View>
                    <Text style={styles.title}>
                      {isSignUp ? "Create Account" : "Welcome Back"}
                    </Text>
                    <Text style={styles.subtitle}>
                      {isSignUp 
                        ? "Your personal collection of delicious recipes"
                        : "Sign in to continue to your recipes"}
                    </Text>
                  </View>

                  {/* White Card */}
                  <View style={styles.formCard}>
                    <View style={styles.cardContent}>
                      {/* Error Banner */}
                      {error && !snackbarVisible && (
                        <View style={styles.errorContainer}>
                          <MaterialCommunityIcons 
                            name="alert-circle" 
                            size={18} 
                            color={COLORS.error} 
                            style={styles.errorIcon}
                          />
                          <Text style={styles.errorText}>{error}</Text>
                        </View>
                      )}

                      {/* Name Input */}
                      {isSignUp && (
                        <View style={styles.inputWrapper}>
                          <Text style={styles.inputLabel}>Name</Text>
                          <View style={styles.inputContainer}>
                            <MaterialCommunityIcons
                              name="account-outline"
                              size={20}
                              color={COLORS.grey}
                              style={styles.inputIcon}
                            />
                            <View
                              style={[
                                styles.inputBorder,
                                { borderColor: getBorderColor("name") },
                              ]}
                            >
                              <TextInput
                                style={styles.textInput}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor={COLORS.textSecondary}
                                onFocus={() => setFocusedInput("name")}
                                onBlur={() => setFocusedInput(null)}
                                autoCapitalize="words"
                                editable={!loading}
                              />
                            </View>
                          </View>
                        </View>
                      )}

                      {/* Email Input */}
                      <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <View style={styles.inputContainer}>
                          <MaterialCommunityIcons
                            name="email-outline"
                            size={20}
                            color={COLORS.grey}
                            style={styles.inputIcon}
                          />
                          <View
                            style={[
                              styles.inputBorder,
                              { borderColor: getBorderColor("email") },
                            ]}
                          >
                            <TextInput
                              style={styles.textInput}
                              value={email}
                              onChangeText={setEmail}
                              placeholder="Enter your email"
                              placeholderTextColor={COLORS.textSecondary}
                              keyboardType="email-address"
                              autoCapitalize="none"
                              autoComplete="email"
                              onFocus={() => setFocusedInput("email")}
                              onBlur={() => setFocusedInput(null)}
                              editable={!loading}
                            />
                          </View>
                        </View>
                      </View>

                      {/* Password Input */}
                      <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={styles.inputContainer}>
                          <MaterialCommunityIcons
                            name="lock-outline"
                            size={20}
                            color={COLORS.grey}
                            style={styles.inputIcon}
                          />
                          <View
                            style={[
                              styles.inputBorder,
                              { borderColor: getBorderColor("password") },
                            ]}
                          >
                            <TextInput
                              style={styles.textInput}
                              value={password}
                              onChangeText={setPassword}
                              placeholder="Enter your password"
                              placeholderTextColor={COLORS.textSecondary}
                              secureTextEntry={!showPassword}
                              autoCapitalize="none"
                              autoComplete="password"
                              onFocus={() => setFocusedInput("password")}
                              onBlur={() => setFocusedInput(null)}
                              editable={!loading}
                            />
                            <TouchableOpacity
                              style={styles.eyeIcon}
                              onPress={() => setShowPassword(!showPassword)}
                              disabled={loading}
                            >
                              <MaterialCommunityIcons
                                name={showPassword ? "eye-off" : "eye"}
                                size={20}
                                color={COLORS.grey}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                      {/* Forgot Password Link */}
                      {!isSignUp && (
                        <TouchableOpacity
                          onPress={handleForgotPassword}
                          style={styles.forgotButton}
                          disabled={loading}
                        >
                          <Text style={styles.forgotButtonText}>Forgot Password?</Text>
                        </TouchableOpacity>
                      )}

                      {/* Primary Button */}
                      <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                        style={styles.primaryButton}
                        activeOpacity={0.9}
                      >
                        <LinearGradient
                          colors={[COLORS.darkBlue, COLORS.darkBlueLight]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.buttonGradient}
                        >
                          {loading ? (
                            <ActivityIndicator color="#FFFFFF" size="small" />
                          ) : (
                            <Text style={styles.primaryButtonText}>
                              {isSignUp ? "Create Account" : "Sign In"}
                            </Text>
                          )}
                        </LinearGradient>
                      </TouchableOpacity>

                      {/* Secondary Button */}
                      <TouchableOpacity
                        onPress={handleToggleMode}
                        disabled={loading}
                        style={styles.secondaryButton}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.secondaryButtonText}>
                          {isSignUp ? "Already have an account? " : "Don't have an account? "}
                          <Text style={styles.secondaryButtonLink}>
                            {isSignUp ? "Sign In" : "Sign Up"}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>

      {/* Snackbar for errors */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        style={styles.snackbar}
        action={{
          label: "Dismiss",
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(245, 245, 245, 0.85)",
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: "100%",
  },
  content: {
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
  },
  animatedContainer: {
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    width: 88,
    height: 88,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: COLORS.darkBlue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -1,
    fontFamily: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
    }),
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
    fontWeight: "400",
  },
  formCard: {
    borderRadius: 28,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.greyLight,
    overflow: "hidden",
    width: "100%",
  },
  cardContent: {
    padding: 28,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
    }),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  inputBorder: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 2,
    paddingLeft: 48,
    paddingRight: 48,
    minHeight: 56,
    position: "relative",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: 16,
    paddingRight: 8,
    fontFamily: Platform.select({
      ios: "System",
      android: "sans-serif",
    }),
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "rgba(211, 47, 47, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(211, 47, 47, 0.3)",
  },
  errorIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.error,
    lineHeight: 20,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: -4,
  },
  forgotButtonText: {
    fontSize: 14,
    color: COLORS.darkBlue,
    fontWeight: "500",
  },
  primaryButton: {
    width: "100%",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: COLORS.darkBlue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    fontFamily: Platform.select({
      ios: "System",
      android: "sans-serif-medium",
    }),
  },
  secondaryButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
  },
  secondaryButtonText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  secondaryButtonLink: {
    fontSize: 15,
    color: COLORS.darkBlue,
    fontWeight: "600",
  },
  snackbar: {
    backgroundColor: COLORS.greyDark,
    borderRadius: 12,
  },
});
