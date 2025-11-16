import { COLORS, COOKING_BACKGROUND_IMAGE } from "@/constants/colors";
import { commonBackgroundStyles } from "@/constants/styles";
import { useAuth } from "@/contexts/AuthContext";
import { getRecipeById } from "@/data/recipes";
import { getRecipeRatingSummary, setUserRecipeRating } from "@/lib/ratings";
import { getStorePriceEstimatesForRecipe } from "@/lib/pricing";
import { openDoorDashForStore, openUberEatsForStore } from "@/lib/integrations";
import { recordCookEvent, UserStreakData } from "@/lib/streaks";
import { getUserPantry } from "@/lib/pantry";
import { Pantry } from "@/types/pantry";
import { StorePriceEstimate } from "@/types/store";
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
  const recipe = getRecipeById(id || "");

  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [streakData, setStreakData] = useState<UserStreakData | null>(null);
  const [isSavingRating, setIsSavingRating] = useState(false);
  const [storeEstimates, setStoreEstimates] = useState<StorePriceEstimate[]>(
    []
  );
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [pricingError, setPricingError] = useState<string | null>(null);
  const [pantry, setPantry] = useState<Pantry>([]);

  // Load the user's pantry so we can exclude pantry items from the shopping list
  useEffect(() => {
    const loadPantry = async () => {
      try {
        if (!user) {
          setPantry([]);
          return;
        }
        const userPantry = await getUserPantry(user.uid);
        setPantry(userPantry);
      } catch (error) {
        console.error("Failed to load pantry for recipe pricing:", error);
        setPantry([]);
      }
    };

    loadPantry();
  }, [user]);

  // Track when the user opened this recipe (simple client-side timestamp).
  useEffect(() => {
    if (!recipe) return;
    const openedAt = new Date().toISOString();
    console.log("[RecipeDetail] Opened recipe", {
      id: recipe.id,
      title: recipe.title,
      openedAt,
    });
    // In the future, this could be persisted to AsyncStorage or sent to the backend
    // to power features like “recently viewed” or detailed cook history.
  }, [recipe?.id]);

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

  useEffect(() => {
    if (!recipe) return;
    try {
      const estimates = getStorePriceEstimatesForRecipe(recipe, pantry);
      setStoreEstimates(estimates);
      const cheapest = estimates.find((e) => e.isCheapest) ?? estimates[0];
      setSelectedStoreId(cheapest ? cheapest.store.id : null);
      setPricingError(null);
    } catch (error) {
      console.error("Failed to compute price estimates", error);
      setPricingError("Price estimates are currently unavailable.");
      setStoreEstimates([]);
      setSelectedStoreId(null);
    }
    // Depend only on the route id and pantry so we don't re-run on every render:
    // getRecipeById(id) returns a new object each time, which caused the
    // previous [recipe] dependency to trigger an infinite update loop.
  }, [id, pantry]);

  const selectedStoreEstimate =
    storeEstimates.find((e) => e.store.id === selectedStoreId) ??
    storeEstimates[0] ??
    null;

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

            {/* Content (no hero image, focus on name/details) */}
            <View style={styles.content}>
              {/* Title */}
              <Text variant="headlineLarge" style={[styles.title, { color: COLORS.textPrimary }]}>
                {recipe.title}
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
                          color={COLORS.ratingGold}
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
                          {streakData.currentStreak} day
                          {streakData.currentStreak === 1 ? "" : "s"} streak
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}

              {/* Category and Cuisine Tags */}
              {(recipe.category || recipe.cuisine) && (
                <View style={styles.tagsContainer}>
                  {recipe.category && (
                    <Chip
                      style={[styles.categoryChip, { backgroundColor: "rgba(148, 163, 184, 0.35)" }]}
                      textStyle={{ color: COLORS.white, fontWeight: "700" }}
                    >
                      {recipe.category}
                    </Chip>
                  )}
                  {recipe.cuisine && (
                    <Chip
                      style={[styles.cuisineChip, { backgroundColor: "rgba(148, 163, 184, 0.35)" }]}
                      textStyle={{ color: COLORS.white, fontWeight: "700" }}
                    >
                      {recipe.cuisine}
                    </Chip>
                  )}
                </View>
              )}

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
                        {recipe.totalTime} min
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

              {/* Price Comparison */}
              <Card style={styles.sectionCard}>
                <Card.Content>
                  <Text
                    variant="titleLarge"
                    style={[styles.sectionTitle, { color: COLORS.textPrimary }]}
                  >
                    Estimated price at nearby stores
                  </Text>

                  {pricingError ? (
                    <Text
                      variant="bodyMedium"
                      style={{ color: COLORS.textMuted }}
                    >
                      {pricingError}
                    </Text>
                  ) : storeEstimates.length === 0 ? (
                    <Text
                      variant="bodyMedium"
                      style={{ color: COLORS.textMuted }}
                    >
                      Price estimates are currently unavailable.
                    </Text>
                  ) : (
                    <>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.storeScroll}
                        contentContainerStyle={styles.storeScrollContent}
                      >
                        {storeEstimates.map((estimate) => {
                          const isSelected =
                            estimate.store.id === selectedStoreId;
                          const baseTime = recipe.totalTime || 25;
                          const storeTimeOffset = (() => {
                            switch (estimate.store.id) {
                              case "provigo":
                                return 0;
                              case "maxi":
                                return 5;
                              case "iga":
                                return 10;
                              default:
                                return 0;
                            }
                          })();
                          const minTime = baseTime + storeTimeOffset;
                          const maxTime = minTime + 10;

                          return (
                            <TouchableOpacity
                              key={estimate.store.id}
                              style={[
                                styles.storeCard,
                                isSelected && styles.storeCardSelected,
                              ]}
                              onPress={() =>
                                setSelectedStoreId(estimate.store.id)
                              }
                            >
                              <Text
                                variant="titleMedium"
                                style={[
                                  styles.storeName,
                                  { color: COLORS.textPrimary },
                                ]}
                              >
                                {estimate.store.name}
                              </Text>
                              <Text
                                variant="headlineSmall"
                                style={[
                                  styles.storePrice,
                                  { color: COLORS.textPrimary },
                                ]}
                              >
                                ${estimate.totalPrice.toFixed(2)}
                              </Text>
                              <Text
                                variant="bodySmall"
                                style={styles.storeDeliveryTime}
                              >
                                {minTime}–{maxTime} min delivery
                              </Text>
                              {estimate.isCheapest && (
                                <View style={styles.cheapestBadge}>
                                  <Text
                                    style={[
                                      styles.cheapestBadgeText,
                                      { color: COLORS.textPrimary },
                                    ]}
                                  >
                                    Cheapest
                                  </Text>
                                </View>
                              )}
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>

                      {selectedStoreEstimate && (
                        <View style={styles.breakdownContainer}>
                          <Text
                            variant="titleMedium"
                            style={[
                              styles.breakdownTitle,
                              { color: COLORS.textPrimary },
                            ]}
                          >
                            Price breakdown at {selectedStoreEstimate.store.name}
                          </Text>
                          {selectedStoreEstimate.items.map((item, index) => (
                            <View
                              key={`${item.ingredientLabel}-${index}`}
                              style={styles.breakdownRow}
                            >
                              <View style={styles.breakdownTextContainer}>
                                <Text
                                  variant="bodyMedium"
                                  style={[
                                    styles.breakdownIngredient,
                                    { color: COLORS.textPrimary },
                                  ]}
                                >
                                  {item.ingredientLabel}
                                </Text>
                                <Text
                                  variant="bodySmall"
                                  style={[
                                    styles.breakdownProduct,
                                    { color: COLORS.textMuted },
                                  ]}
                                >
                                  {item.productName} • {item.unitSize}
                                </Text>
                              </View>
                              <Text
                                variant="bodyMedium"
                                style={[
                                  styles.breakdownPrice,
                                  { color: COLORS.textPrimary },
                                ]}
                              >
                                ${item.unitPrice.toFixed(2)}
                              </Text>
                            </View>
                          ))}
                          <View style={styles.breakdownTotalRow}>
                            <Text
                              variant="bodyMedium"
                              style={[
                                styles.breakdownTotalLabel,
                                { color: COLORS.textMuted },
                              ]}
                            >
                              Total
                            </Text>
                            <Text
                              variant="titleMedium"
                              style={[
                                styles.breakdownTotalValue,
                                { color: COLORS.textPrimary },
                              ]}
                            >
                              ${selectedStoreEstimate.totalPrice.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      )}
                    </>
                  )}
                </Card.Content>
              </Card>

              {/* Ordering Buttons (moved up between price and ingredients) */}
              {selectedStoreEstimate && (
                <View style={styles.orderButtonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.orderButton,
                      styles.uberEatsButton,
                    ]}
                    onPress={() => openUberEatsForStore(selectedStoreEstimate)}
                  >
                    <Text style={styles.orderButtonText}>
                      Order ingredients on Uber Eats
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.orderButton,
                      styles.doorDashButton,
                    ]}
                    onPress={() =>
                      openDoorDashForStore(selectedStoreEstimate)
                    }
                  >
                    <Text style={styles.orderButtonText}>
                      Order ingredients on DoorDash
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Ingredients */}
              <Card style={styles.sectionCard}>
                <Card.Content>
                  <Text variant="titleLarge" style={[styles.sectionTitle, { color: COLORS.textPrimary }]}>
                    Ingredients
                  </Text>
                  {recipe.ingredients.map((ingredient: string, index: number) => (
                    <View key={index} style={styles.ingredientItem}>
                      <View style={[styles.bullet, { backgroundColor: COLORS.white }]} />
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
                          <Text style={[styles.stepBadgeText, { color: COLORS.white }]}>
                            {index + 1}
                          </Text>
                        </View>
                        <Text
                          variant="bodyLarge"
                          style={[styles.instructionText, { color: COLORS.textPrimary }]}
                        >
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
    flexDirection: "row",
    alignItems: "center",
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
  headerTitle: {
    marginLeft: 12,
    fontWeight: "600",
    fontSize: 18,
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
  storeScroll: {
    marginBottom: 16,
  },
  storeScrollContent: {
    paddingVertical: 4,
  },
  storeCard: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    marginRight: 12,
    minWidth: 140,
  },
  storeCardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: "rgba(60, 201, 167, 0.16)",
  },
  storeName: {
    fontWeight: "600",
    marginBottom: 4,
  },
  storePrice: {
    fontWeight: "700",
  },
  storeDeliveryTime: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  cheapestBadge: {
    marginTop: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: COLORS.accent,
  },
  cheapestBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  breakdownContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderUnfocused,
    paddingTop: 8,
  },
  breakdownTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  breakdownRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  breakdownTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  breakdownIngredient: {
    fontSize: 14,
    marginBottom: 2,
  },
  breakdownProduct: {
    fontSize: 12,
  },
  breakdownPrice: {
    fontWeight: "600",
    fontSize: 14,
  },
  breakdownTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.borderUnfocused,
    marginTop: 8,
    paddingTop: 8,
  },
  breakdownTotalLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  breakdownTotalValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  orderButtonsContainer: {
    marginTop: 8,
    marginBottom: 20,
    gap: 8,
  },
  orderButton: {
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  uberEatsButton: {
    backgroundColor: "#22C55E",
  },
  doorDashButton: {
    backgroundColor: "#F97316",
  },
  orderButtonText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: 15,
  },
});
