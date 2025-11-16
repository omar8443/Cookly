import { COLORS } from "@/constants/colors";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

// Custom theme with Blue/Grey color scheme (replaces orange/red)
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary, // Blue theme (#5B8DEF)
    secondary: COLORS.accent, // Mint accent (#3CC9A7)
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceVariant: "#F5F5F5",
    error: "#FF5252",
    onPrimary: "#FFFFFF",
    onSecondary: "#FFFFFF",
    onBackground: "#333333",
    onSurface: "#333333",
  },
  roundness: 16,
};

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      console.log("[Navigation] Auth loading, waiting...");
      return;
    }

    const inAuthGroup = segments[0] === "auth";
    const currentPath = segments.join("/");

    console.log("[Navigation] Auth state changed:", {
      hasUser: !!user,
      inAuthGroup,
      currentPath,
      segments,
    });

    if (!user && !inAuthGroup) {
      // Redirect to auth if not logged in
      console.log("[Navigation] No user, redirecting to /auth");
      router.replace("/auth");
    } else if (user && inAuthGroup) {
      // Redirect to home if logged in and on auth screen
      console.log("[Navigation] User authenticated, redirecting to home");
      router.replace("/");
    } else if (user) {
      console.log("[Navigation] User authenticated, staying on current route");
    }
  }, [user, loading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" />
      <Stack.Screen name="index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="recipe" />
      <Stack.Screen name="recipes" />
      <Stack.Screen name="category" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <StatusBar style="auto" />
        <RootLayoutNav />
      </AuthProvider>
    </PaperProvider>
  );
}
