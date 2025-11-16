// Shared color constants for Cookly app
// Modern color palette - Grey/Blue theme (replaces orange/coral-pink)
export const COLORS = {
  // Primary color system - Blue/Grey theme
  primary: "#5B8DEF", // Modern blue for main buttons and category pills
  primaryDark: "#4A7BC8", // Darker blue for pressed/hover state
  primaryGradient: ["#5B8DEF", "#7BA3F0"], // Blue gradient for buttons and pills
  
  // Alternative: Grey theme (uncomment to use grey instead of blue)
  // primary: "#6B7280", // Grey for main buttons and category pills
  // primaryDark: "#4B5563", // Darker grey for pressed/hover state
  // primaryGradient: ["#6B7280", "#9CA3AF"], // Grey gradient for buttons and pills
  
  // Accent colors
  accent: "#3CC9A7", // Mint accent for special tags (Cheapest, High protein, etc.)
  
  // Background colors
  bg: "#F5F5F7", // Light neutral background
  background: "#000000", // Keep for dark mode compatibility
  
  // Text colors
  textMain: "#111827", // Main text color
  textMuted: "#6B7280", // Muted text color (grey)
  textPrimary: "#FFFFFF", // White text (for overlays)
  
  // Legacy colors (kept for compatibility)
  secondary: "#1A1A1A",
  borderUnfocused: "#333333",
  white: "#FFFFFF",
  black: "#000000",
  error: "#FF6B6B",
  errorBackground: "#2A1A1A",
  errorText: "#FF6B6B",
} as const;

// Cooking background image URL - Change this to your preferred background image
export const COOKING_BACKGROUND_IMAGE = "https://media.istockphoto.com/id/495330088/photo/full-homemade-thanksgiving-dinner.jpg?s=612x612&w=0&k=20&c=7nU6Kv7GyrG0Sm5q5GI5iq7ebu-ldPdgdMMhEJOCvtg=";

