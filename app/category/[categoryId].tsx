import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "@/components/BottomNav";
import RecipeGrid from "@/components/RecipeGrid";
import { getRecipesByCategory } from "@/data/recipes";
import { COLORS, COOKING_BACKGROUND_IMAGE } from "@/constants/colors";
import { commonBackgroundStyles } from "@/constants/styles";

// Emoji mapping by recipe category name (keep in sync with index.tsx)
const CATEGORY_EMOJIS: Record<string, string> = {
  Chicken: "🍗",
  Beef: "🥩",
  Pork: "🥓",
  Fish: "🐟",
  Seafood: "🦐",
  Vegetarian: "🥦",
  Vegan: "🥗",
};

export default function CategoryScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  // categoryId is the actual recipe.category string (e.g., "Chicken")
  const recipeCategory = categoryId || "";
  const categoryName = recipeCategory || "Category";
  const categoryEmoji = CATEGORY_EMOJIS[recipeCategory] || "🍽️";

  // Get recipes for this category
  const recipes = getRecipesByCategory(recipeCategory);

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={commonBackgroundStyles.container}>
      <ImageBackground
        source={{ uri: COOKING_BACKGROUND_IMAGE }}
        style={commonBackgroundStyles.backgroundImage}
        resizeMode="cover"
      >
        <View style={commonBackgroundStyles.overlay} />
        <SafeAreaView style={commonBackgroundStyles.safeArea} edges={["top"]}>
          <ScrollView
            style={commonBackgroundStyles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header with back button */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={24}
                    color={COLORS.textPrimary}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.categoryEmoji}>{categoryEmoji}</Text>
                <Text variant="headlineLarge" style={styles.title}>
                  {categoryName}
                </Text>
                <View style={styles.titleUnderline} />
                <Text variant="bodyMedium" style={styles.subtitle}>
                  {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} available
                </Text>
              </View>
            </View>

            {/* Recipes Grid */}
            {recipes.length > 0 ? (
              <RecipeGrid recipes={recipes} onRecipePress={handleRecipePress} />
            ) : (
              <View style={styles.emptyState}>
                <Text variant="titleLarge" style={styles.emptyText}>
                  No recipes found
                </Text>
                <Text variant="bodyMedium" style={styles.emptySubtext}>
                  Check back later for new recipes in this category
                </Text>
              </View>
            )}
          </ScrollView>

          <BottomNav />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 140,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  titleContainer: {
    alignItems: "flex-start",
  },
  categoryEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 32,
    letterSpacing: -0.8,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    opacity: 0.9,
    fontWeight: "400",
    lineHeight: 22,
  },
  emptyState: {
    padding: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    color: COLORS.textMuted,
    textAlign: "center",
    opacity: 0.8,
  },
});

