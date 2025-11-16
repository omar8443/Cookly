import { COLORS, COOKING_BACKGROUND_IMAGE } from "@/constants/colors";
import { commonBackgroundStyles } from "@/constants/styles";
import { useAuth } from "@/contexts/AuthContext";
import { getRecipeById } from "@/data/recipes";
import { getRecipeRatingSummary, setUserRecipeRating } from "@/lib/ratings";
import { recordCookEvent, UserStreakData } from "@/lib/streaks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Chip, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { user } = useAuth();
  const recipeId = parseInt(id || "0", 10);
  const recipe = getRecipeById(recipeId);

  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [streakData, setStreakData] = useState<UserStreakData | null>(null);
  const [isSavingRating, setIsSavingRating] = useState(false);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        if (!recipe || !user) return;
        const summary = await getRecipeRatingSummary(recipe.id.toString(), user.uid);
        setAverageRating(summary.averageRating);
        setRatingCount(summary.ratingCount);
        setUserRating(summary.userRating ?? null);
      } catch (error) {
        console.error("Failed to load recipe ratings:", error);
      }
    };

    loadRatings();
  }, [recipe, user]);

  const handleRatingPress = async (rating: number) => {
    if (!user || !recipe) return;
    try {
      setIsSavingRating(true);

      const recipeIdStr = recipe.id.toString();

      // Save the user's rating
      await setUserRecipeRating(user.uid, recipeIdStr, rating);

      // Record a cook event which will update the user's streak
      const updatedStreak = await recordCookEvent(user.uid, recipeIdStr, rating);
      setStreakData(updatedStreak);

      // Refresh rating summary
      const summary = await getRecipeRatingSummary(recipeIdStr, user.uid);
      setAverageRating(summary.averageRating);
      setRatingCount(summary.ratingCount);
      setUserRating(summary.userRating ?? null);
    } catch (error) {
      console.error("Failed to save rating:", error);
    } finally {
      setIsSavingRating(false);
    }
  };

  if (!recipe) {
    return (
      <View style={commonBackgroundStyles.container}>
        <ImageBackground
          source={{ uri: COOKING_BACKGROUND_IMAGE }}
          style={commonBackgroundStyles.backgroundImage}
          resizeMode="cover"
        >
          <View style={commonBackgroundStyles.overlay} />
          <SafeAreaView style={[styles.container, commonBackgroundStyles.safeArea]} edges={["top"]}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={24}
                    color={COLORS.textPrimary}
                  />
                </TouchableOpacity>
                <View style={styles.emptyState}>
                  <MaterialCommunityIcons
                    name="alert-circle-outline"
                    size={64}
                    color={COLORS.textMuted}
                  />
                  <Text variant="headlineMedium" style={[styles.title, { color: COLORS.textPrimary }]}>
                    Recipe Not Found
                  </Text>
                  <Text variant="bodyLarge" style={[styles.emptyText, { color: COLORS.textMuted }]}>
                    The recipe you're looking for doesn't exist.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={commonBackgroundStyles.container}>
      <ImageBackground
        source={{ uri: COOKING_BACKGROUND_IMAGE }}
        style={commonBackgroundStyles.backgroundImage}
        resizeMode="cover"
      >
        <View style={commonBackgroundStyles.overlay} />
        <SafeAreaView style={[styles.container, commonBackgroundStyles.safeArea]} edges={["top"]}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
            </View>

            {recipe.imageUrl && (
              <View style={styles.heroImageContainer}>
                <ImageBackground
                  source={{ uri: recipe.imageUrl }}
                  style={styles.heroImage}
                  imageStyle={styles.heroImageRadius}
                  resizeMode="cover"
                >
                  <View style={styles.heroOverlay} />
                </ImageBackground>
              </View>
            )}

            {/* Content */}
            <View style={styles.content}>
              {/* Title */}
              <Text variant="headlineLarge" style={[styles.title, { color: COLORS.textPrimary }]}>
                {recipe.name}
              </Text>

              {/* Rating & Streak Summary */}
              {user && (
                <View style={styles.ratingContainer}>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => handleRatingPress(star)}
                        disabled={isSavingRating}
                        style={styles.starButton}
                      >
                        <MaterialCommunityIcons
                          name={
                            (userRating ?? 0) >= star ? "star" : "star-outline"
                          }
                          size={24}
                          color={COLORS.accent}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.ratingMetaRow}>
                    <Text
                      variant="bodySmall"
                      style={[styles.ratingText, { color: COLORS.textMuted }]}
                    >
                      {ratingCount > 0
                        ? `${averageRating.toFixed(1)} • ${ratingCount} review${ratingCount === 1 ? "" : "s"}`
                        : "No ratings yet"}
                    </Text>
                    {streakData && (
                      <View style={styles.streakBadge}>
                        <MaterialCommunityIcons
                          name="fire"
                          size={16}
                          color="#FF9800"
                        />
                        <Text
                          variant="bodySmall"
                          style={[styles.streakText, { color: COLORS.textPrimary }]}
                        >
                          {streakData.currentStreak} day streak
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}

              {/* Category and Cuisine Tags */}
              <View style={styles.tagsContainer}>
                <Chip
                  style={[styles.categoryChip, { backgroundColor: COLORS.primary + "40" }]}
                  textStyle={{ color: COLORS.primary, fontWeight: "600" }}
                >
                  {recipe.category}
                </Chip>
                <Chip
                  style={[styles.cuisineChip, { backgroundColor: COLORS.accent + "40" }]}
                  textStyle={{ color: COLORS.accent, fontWeight: "600" }}
                >
                  {recipe.cuisine}
                </Chip>
              </View>

              {/* Time and Macros Info Bar */}
              <Card style={styles.infoBarCard}>
                <Card.Content style={styles.infoBarContent}>
                  <View style={styles.infoBarRow}>
                    <View style={styles.infoBarItem}>
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color={COLORS.primary}
                      />
                      <Text style={styles.infoBarLabel}>Time</Text>
                      <Text style={[styles.infoBarValue, { color: COLORS.textPrimary }]}>
                        {recipe.timeMinutes} min
                      </Text>
                    </View>
                    <View style={styles.infoBarDivider} />
                    <View style={styles.infoBarItem}>
                      <MaterialCommunityIcons
                        name="fire"
                        size={20}
                        color={COLORS.accent}
                      />
                      <Text style={styles.infoBarLabel}>Calories</Text>
                      <Text style={[styles.infoBarValue, { color: COLORS.textPrimary }]}>
                        {recipe.macros.calories}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.macrosRow}>
                    <View style={styles.macroItem}>
                      <Text style={[styles.macroValue, { color: COLORS.textPrimary }]}>
                        {recipe.macros.protein}g
                      </Text>
                      <Text style={[styles.macroLabel, { color: COLORS.textMuted }]}>Protein</Text>
                    </View>
                    <View style={styles.macroItem}>
                      <Text style={[styles.macroValue, { color: COLORS.textPrimary }]}>
                        {recipe.macros.carbs}g
                      </Text>
                      <Text style={[styles.macroLabel, { color: COLORS.textMuted }]}>Carbs</Text>
                    </View>
                    <View style={styles.macroItem}>
                      <Text style={[styles.macroValue, { color: COLORS.textPrimary }]}>
                        {recipe.macros.fat}g
                      </Text>
                      <Text style={[styles.macroLabel, { color: COLORS.textMuted }]}>Fat</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>

              {/* Ingredients */}
              <Card style={styles.sectionCard}>
                <Card.Content>
                  <Text variant="titleLarge" style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>
                    Ingredients
                  </Text>
                  {recipe.ingredients.map((ingredient: string, index: number) => (
                    <View key={index} style={styles.ingredientItem}>
                      <View style={[styles.bullet, { backgroundColor: COLORS.primary }]} />
                      <Text variant="bodyLarge" style={[styles.ingredientText, { color: COLORS.textPrimary }]}>
                        {ingredient}
                      </Text>
                    </View>
                  ))}
                </Card.Content>
              </Card>

              {/* Instructions */}
              {recipe.instructions && recipe.instructions.length > 0 && (
                <Card style={styles.sectionCard}>
                  <Card.Content>
                    <Text variant="titleLarge" style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>
                      Instructions
                    </Text>
                    {recipe.instructions.map((step: string, index: number) => (
                      <View key={index} style={styles.instructionItem}>
                        <View style={[styles.stepBadge, { borderColor: COLORS.primary }]}>
                          <Text style={[styles.stepBadgeText, { color: COLORS.primary }]}>
                            {index + 1}
                          </Text>
                        </View>
                        <Text variant="bodyLarge" style={[styles.instructionText, { color: COLORS.textPrimary }]}>
                          {step}
                        </Text>
                      </View>
                    ))}
                  </Card.Content>
                </Card>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  heroImageContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: 24,
    overflow: "hidden",
  },
  heroImageRadius: {
    borderRadius: 24,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    padding: 20,
  },
  title: {
    fontWeight: "700",
    marginBottom: 16,
    fontSize: 28,
    lineHeight: 36,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  categoryChip: {
    marginRight: 8,
  },
  cuisineChip: {
    marginRight: 8,
  },
  infoBarCard: {
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 2,
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  infoBarContent: {
    padding: 20,
  },
  infoBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoBarItem: {
    flex: 1,
    alignItems: "center",
  },
  infoBarLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 4,
    fontWeight: "500",
  },
  infoBarValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  infoBarDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.borderUnfocused,
    marginHorizontal: 16,
  },
  macrosRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderUnfocused,
  },
  macroItem: {
    alignItems: "center",
  },
  macroValue: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  sectionCard: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 2,
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
    fontSize: 20,
  },
  ratingContainer: {
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  starButton: {
    marginRight: 4,
  },
  ratingMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingText: {
    fontSize: 12,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  streakText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  ingredientText: {
    flex: 1,
    lineHeight: 24,
    fontSize: 16,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginRight: 12,
  },
  stepBadgeText: {
    fontWeight: "700",
    fontSize: 14,
  },
  instructionText: {
    flex: 1,
    lineHeight: 24,
    fontSize: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    marginTop: 16,
    textAlign: "center",
    opacity: 0.8,
  },
});
