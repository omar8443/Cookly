import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

// Custom theme matching cookbookmanager.com aesthetic
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
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

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
