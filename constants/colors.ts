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
export const CATEGORY_BACKGROUND_IMAGES: Record<string, string> = {
  Chicken:
    "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Beef:
    "https://images.pexels.com/photos/4106486/pexels-photo-4106486.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Pork:
    "https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Fish:
    "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Seafood:
    "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Vegetarian:
    "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1200",
  Vegan:
    "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

// Search and profile backgrounds
export const SEARCH_BACKGROUND_IMAGE =
  "https://images.pexels.com/photos/7218636/pexels-photo-7218636.jpeg?auto=compress&cs=tinysrgb&w=1200";

export const PROFILE_BACKGROUND_IMAGE =
  "https://images.pexels.com/photos/8846005/pexels-photo-8846005.jpeg?auto=compress&cs=tinysrgb&w=1200";

