export const COLORS = {
  primary: "#6B7280", // Grey for main buttons and category pills
  primaryDark: "#4B5563", // Darker grey for pressed/hover state
  primaryGradient: ["#6B7280", "#9CA3AF"], // Grey gradient for buttons and pills
  accent: "#3CC9A7", // Mint accent for special tags (Cheapest, High protein, etc.)
  bg: "#F5F5F7", // Light neutral background
  background: "#000000", // Keep for dark mode compatibility
  textMain: "#111827", // Main text color
  textMuted: "#6B7280", // Muted text color (grey)
  textPrimary: "#FFFFFF", // White text (for overlays)
  secondary: "#1A1A1A",
  borderUnfocused: "#333333",
  white: "#FFFFFF",
  black: "#000000",
  error: "#FF6B6B",
  errorBackground: "#2A1A1A",
  errorText: "#FF6B6B",
} as const;

// Home screen hero background
export const COOKING_BACKGROUND_IMAGE =
  "https://images.pexels.com/photos/4259707/pexels-photo-4259707.jpeg?auto=compress&cs=tinysrgb&w=1200";

// Category-specific modern cooking backgrounds
// Use the auto-generated mappings from Pexels so category images are
// consistent across the app and easy to regenerate with the script.
export { CATEGORY_BACKGROUND_IMAGES } from "./category-backgrounds.generated";

// Search and profile backgrounds
export const SEARCH_BACKGROUND_IMAGE =
  "https://cdn.discordapp.com/attachments/1439532045461094420/1439556184062427300/image.png?ex=691af2ab&is=6919a12b&hm=81a92fbccffbfb48d71030f7e6f775c0e833ca2a1344c4ec12b46cd75a6c734d&";


export const PROFILE_BACKGROUND_IMAGE =
  "https://cdn.discordapp.com/attachments/1439532045461094420/1439556184062427300/image.png?ex=691af2ab&is=6919a12b&hm=81a92fbccffbfb48d71030f7e6f775c0e833ca2a1344c4ec12b46cd75a6c734d&";
