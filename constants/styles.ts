import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

// Shared common styles for screens with background images
export const commonBackgroundStyles = StyleSheet.create({
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

// Design tokens for the Categories screen (header, cards, floating CTA)
export const CATEGORY_SCREEN_TOKENS = {
  primaryGradient: COLORS.primaryGradient,

  cardRadius: 26,
  cardPadding: 24,
  cardShadow: {
    elevation: 14,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.4,
    shadowRadius: 28,
  },

  titleFontSize: 34,
  subtitleFontSize: 16,
  cardTitleFontSize: 18,
  cardSubtitleFontSize: 13,
} as const;


