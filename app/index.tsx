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
import { getRecipeImage } from "@/lib/images";

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
  const cardEntrance = useRef(categories.map(() => new Animated.Value(0))).current;
  const [featuredRecipes, setFeaturedRecipes] = useState(getRandomFeaturedRecipes);
  const [categoryImageUrls, setCategoryImageUrls] = useState<Record<string, string | undefined>>(
    () =>
      categories.reduce((acc, category) => {
        const recipesInCategory = getRecipesByCategory(category.name);
        acc[category.name] = recipesInCategory[0]?.imageUrl;
        return acc;
      }, {} as Record<string, string | undefined>)
  );

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}` as any);
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

  // If a category does not have an imageUrl derived from recipes,
  // lazily fetch one from Pexels using the category name.
  useEffect(() => {
    categories.forEach((category) => {
      const currentUrl = categoryImageUrls[category.name];
      if (currentUrl) return;

      let isMounted = true;

      const loadImage = async () => {
        try {
          const url = await getRecipeImage(category.name);
          if (isMounted) {
            setCategoryImageUrls((prev) => ({
              ...prev,
              [category.name]: url,
            }));
          }
        } catch (error) {
          console.warn("Failed to fetch category image from Pexels:", error);
        }
      };

      // eslint-disable-next-line no-floating-promises
      loadImage();

      return () => {
        isMounted = false;
      };
    });
  }, [categoryImageUrls]);

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
                    imageUri={categoryImageUrls[category.name]}
                    onPress={() => handleCategoryPress(category.id)}
                    width={CARD_WIDTH}
                    containerStyle={animatedStyle}
                  />
                );
              })}
            </View>
          </ScrollView>

          <BottomNav />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 200,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: CATEGORY_SCREEN_TOKENS.titleFontSize + 4,
    letterSpacing: -1.2,
    color: COLORS.textPrimary,
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  titleUnderline: {
    width: 86,
    height: 4,
    backgroundColor: COLORS.accent,
    borderRadius: 999,
    marginBottom: 14,
  },
  subtitle: {
    fontSize: CATEGORY_SCREEN_TOKENS.subtitleFontSize + 1,
    color: COLORS.textPrimary,
    opacity: 0.95,
    fontWeight: "500",
    lineHeight: 24,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: CARD_PADDING,
    gap: CARD_GAP - 2,
    justifyContent: "space-between",
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 10,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
});
