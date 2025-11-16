import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "@/components/BottomNav";
import CategoryCard from "@/components/CategoryCard";
import { getCategories as getRecipeCategories, getRecipesByCategory } from "@/data/recipes";
import { COLORS } from "@/constants/colors";
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
    <View style={styles.root}>
      <SafeAreaView style={commonBackgroundStyles.safeArea} edges={["top"]}>
        <ScrollView
          style={commonBackgroundStyles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.title}>
              Categories
            </Text>
            <View style={styles.titleUnderline} />
            <Text variant="bodyMedium" style={styles.subtitle}>
              What are you feeling today?
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
                  onPress={() => handleCategoryPress(category.id)}
                  width={CARD_WIDTH}
                  containerStyle={animatedStyle}
                />
              );
            })}
          </View>
        </ScrollView>

        {/* Modern Floating Add Recipe Button */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 26,
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: CATEGORY_SCREEN_TOKENS.titleFontSize,
    letterSpacing: -0.8,
    color: COLORS.textMain,
    marginBottom: 8,
    textAlign: "center",
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
    color: COLORS.textMuted,
    opacity: 1,
    fontWeight: "400",
    lineHeight: 22,
    textAlign: "center",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: CARD_PADDING,
    gap: CARD_GAP,
    justifyContent: "space-between",
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
