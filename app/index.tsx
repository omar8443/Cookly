import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "@/components/BottomNav";
import CategoryCard from "@/components/CategoryCard";
import RecipeGrid from "@/components/RecipeGrid";
import {
  getAllRecipes,
  getCategories as getRecipeCategories,
  getRecipesByCategory,
} from "@/data/recipes";
import { COLORS, COOKING_BACKGROUND_IMAGE } from "@/constants/colors";
import { commonBackgroundStyles, CATEGORY_SCREEN_TOKENS } from "@/constants/styles";

// Emoji mapping by recipe category name
const CATEGORY_EMOJIS: Record<string, string> = {
  Chicken: "🍗",
  Beef: "🥩",
  Pork: "🥓",
  Fish: "🐟",
  Seafood: "🦐",
  Vegetarian: "🥦",
  Vegan: "🥗",
};

// Build categories from all recipe categories in the static data
const categories = getRecipeCategories().map((categoryName) => ({
  id: categoryName,
  name: categoryName,
  emoji: CATEGORY_EMOJIS[categoryName] ?? "🍽️",
  recipeCount: getRecipesByCategory(categoryName).length,
}));

// Derive stable category hero images from the first recipe in each category.
// This reuses the Pexels-backed recipe images generated in data/recipes.ts,
// so categories also benefit from the same image system without extra API calls.
const CATEGORY_IMAGES: Record<string, string | undefined> = categories.reduce(
  (acc, category) => {
    const recipesInCategory = getRecipesByCategory(category.name);
    acc[category.name] = recipesInCategory[0]?.imageUrl;
    return acc;
  },
  {} as Record<string, string | undefined>
);

// Helper to get a randomized set of featured recipes for the floating grid
const getRandomFeaturedRecipes = (count: number = 12) => {
  const allRecipes = getAllRecipes();
  const shuffled = [...allRecipes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const { width } = Dimensions.get("window");
const CARD_PADDING = 22;
const CARD_GAP = 12;
const CARD_WIDTH = (width - CARD_PADDING * 2 - CARD_GAP) / 2;

/**
 * Categories screen visual system
 * - Soft blue gradient accents with a subtle glassmorphism card layer over a dimmed food image.
 * - Airy, centered header typography and generous vertical spacing for a modern 2025 feel.
 * - Rounded, floating tiles and CTA with depth via shadows, blur, and light motion/entrance animations.
 */
export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  // Animation for Add Recipe button press
  const addButtonScale = useRef(new Animated.Value(1)).current;
  const cardEntrance = useRef(categories.map(() => new Animated.Value(0))).current;
  const [featuredRecipes, setFeaturedRecipes] = useState(getRandomFeaturedRecipes);

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}` as any);
  };

  const handleAddRecipe = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(addButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(addButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    console.log("Add recipe pressed");
    // TODO: Navigate to add recipe screen
  };

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  useEffect(() => {
    Animated.stagger(
      90,
      cardEntrance.map((value) =>
        Animated.timing(value, {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      )
    ).start();
  }, [cardEntrance]);

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
            {/* Floating Recipes Section */}
            <View style={styles.header}>
              <Text variant="headlineLarge" style={styles.title}>
                Cookly
              </Text>
              <View style={styles.titleUnderline} />
              <Text variant="bodyMedium" style={styles.subtitle}>
                Discover something delicious tonight.
              </Text>
            </View>

            <RecipeGrid recipes={featuredRecipes} onRecipePress={handleRecipePress} />

            {/* Categories Section */}
            <View style={styles.sectionHeader}>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Categories
              </Text>
            </View>

            <View style={styles.categoriesGrid}>
              {categories.map((category, index) => {
                const animatedValue = cardEntrance[index];
                const animatedStyle = {
                  opacity: animatedValue,
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [24, 0],
                      }),
                    },
                  ],
                };

                return (
                  <CategoryCard
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    emoji={category.emoji}
                    recipeCount={category.recipeCount}
                    imageUri={CATEGORY_IMAGES[category.name]}
                    onPress={() => handleCategoryPress(category.id)}
                    width={CARD_WIDTH}
                    containerStyle={animatedStyle}
                  />
                );
              })}
            </View>
          </ScrollView>

          {/* Floating Add Recipe Button */}
          <Animated.View
            style={[styles.addButtonWrapper, { transform: [{ scale: addButtonScale }] }]}
          >
            <View style={styles.addButtonBlur}>
              <TouchableOpacity onPress={handleAddRecipe} activeOpacity={0.88}>
                <LinearGradient
                  colors={CATEGORY_SCREEN_TOKENS.primaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.addButtonGradient}
                >
                  <MaterialCommunityIcons name="plus" size={22} color="#FFFFFF" />
                  <Text style={styles.addButtonText}>Add Recipe</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <BottomNav />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 160,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 18,
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "600",
    fontSize: CATEGORY_SCREEN_TOKENS.titleFontSize,
    letterSpacing: -0.8,
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: "left",
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: CATEGORY_SCREEN_TOKENS.subtitleFontSize,
    color: COLORS.textPrimary,
    opacity: 0.8,
    fontWeight: "400",
    lineHeight: 22,
    textAlign: "left",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: CARD_PADDING,
    gap: CARD_GAP,
    justifyContent: "space-between",
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingTop: 6,
    paddingBottom: 12,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  addButtonWrapper: {
    position: "absolute",
    bottom: 88,
    alignSelf: "center",
    borderRadius: 999,
    ...CATEGORY_SCREEN_TOKENS.cardShadow,
  },
  addButtonBlur: {
    borderRadius: 999,
    overflow: "hidden",
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 999,
    gap: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
