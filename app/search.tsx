import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomNav from "@/components/BottomNav";
import FilterChips from "@/components/FilterChips";
import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes, getCategories as getRecipeCategories, getRecipesByCategory } from "@/data/recipes";
import { useRecipeSearch } from "@/hooks/useRecipeSearch";
import { Recipe, SearchFilters } from "@/types/recipe";
import { COLORS, SEARCH_BACKGROUND_IMAGE } from "@/constants/colors";
import { commonBackgroundStyles, CATEGORY_SCREEN_TOKENS } from "@/constants/styles";
import CategoryCard from "@/components/CategoryCard";

// Get all recipes from centralized database
const allRecipes: Recipe[] = getAllRecipes();

// Build categories list (same source as home) for stacked layout
const CATEGORY_EMOJIS: Record<string, string> = {
  Chicken: "🍗",
  Beef: "🥩",
  Pork: "🥓",
  Fish: "🐟",
  Seafood: "🦐",
  Vegetarian: "🥦",
  Vegan: "🥗",
};

const searchCategories = getRecipeCategories().map((categoryName) => ({
  id: categoryName,
  name: categoryName,
  emoji: CATEGORY_EMOJIS[categoryName] ?? "🍽️",
  recipeCount: getRecipesByCategory(categoryName).length,
}));

export default function SearchScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    Diet: false,
    "High Protein": false,
    "Student-Friendly": false,
    Gourmet: false,
  });

  // Use the search hook
  const { results, state, isLoading } = useRecipeSearch({
    recipes: allRecipes,
    query: searchQuery,
    filters,
    debounceMs: 400,
  });

  // Handle keyboard dismissal when navigating away
  useEffect(() => {
    return () => {
      Keyboard.dismiss();
    };
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilters({
      Diet: false,
      "High Protein": false,
      "Student-Friendly": false,
      Gourmet: false,
    });
    Keyboard.dismiss();
  };

  const handleFilterToggle = (filter: keyof SearchFilters) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const handleRecipePress = (recipeId: string) => {
    Keyboard.dismiss();
    router.push(`/recipe/${recipeId}` as any);
  };

  const handleCategoryPress = (categoryId: string) => {
    Keyboard.dismiss();
    router.push(`/category/${categoryId}` as any);
  };

  const handleSubmitSearch = () => {
    Keyboard.dismiss();
  };

  const hasQuery = searchQuery.trim().length > 0;
  const hasActiveFilters = Object.values(filters).some((v) => v);
  const showIdleState = state === "idle" && !hasQuery && !hasActiveFilters;

  return (
    <View style={commonBackgroundStyles.container}>
      <ImageBackground
        source={{ uri: SEARCH_BACKGROUND_IMAGE }}
        style={commonBackgroundStyles.backgroundImage}
        resizeMode="cover"
      >
        <View style={commonBackgroundStyles.overlay} />
        <SafeAreaView style={commonBackgroundStyles.safeArea} edges={["top"]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <View style={styles.content}>
              {/* Search Bar - Always visible */}
              <View style={styles.searchContainer}>
                <Card style={styles.searchCard}>
                  <View style={styles.searchBar}>
                    <MaterialCommunityIcons
                      name="magnify"
                      size={24}
                      color={COLORS.textMuted}
                      style={styles.searchIcon}
                    />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="What are you feeling today?"
                      placeholderTextColor={COLORS.textMuted + "80"}
                      value={searchQuery}
                      onChangeText={handleSearchChange}
                      onSubmitEditing={handleSubmitSearch}
                      returnKeyType="search"
                      editable={true}
                      autoFocus={false}
                      autoCorrect={true}
                      autoCapitalize="none"
                      accessibilityLabel="Search recipes"
                    />
                    {(hasQuery || hasActiveFilters) && (
                      <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
                        <MaterialCommunityIcons
                          name="close-circle"
                          size={20}
                          color={COLORS.textMuted}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </Card>
              </View>

              {/* Filter Chips - Show when not in idle state or when filters are active */}
              {(!showIdleState || hasActiveFilters) && (
                <View style={styles.filtersContainer}>
                  <FilterChips filters={filters} onFilterToggle={handleFilterToggle} />
                </View>
              )}

              {/* Idle State - Stacked categories list (Uber Eats style) */}
              {showIdleState && (
                <ScrollView
                  style={styles.idleScroll}
                  contentContainerStyle={styles.idleContainer}
                  showsVerticalScrollIndicator={false}
                >
                  <Text
                    variant="titleMedium"
                    style={[styles.idleTitle, { color: COLORS.textPrimary }]}
                  >
                    Browse by category
                  </Text>
                  <Text variant="bodySmall" style={[styles.idleSubtitle, { color: COLORS.textMuted }]}>
                    Tap a category to explore dishes, just like scrolling menus in a delivery app.
                  </Text>

                  <View style={styles.categoryList}>
                    {searchCategories.map((category) => (
                      <CategoryCard
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        emoji={category.emoji}
                        recipeCount={category.recipeCount}
                        imageUri={undefined}
                        onPress={() => handleCategoryPress(category.id)}
                        width={"100%" as unknown as number}
                        containerStyle={styles.categoryListItem as any}
                      />
                    ))}
                  </View>
                </ScrollView>
              )}

              {/* Results Area */}
              {!showIdleState && (
                <ScrollView
                  style={styles.resultsScrollView}
                  contentContainerStyle={styles.resultsContent}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {/* Loading State */}
                  {isLoading && state === "searching" && (
                    <View style={styles.centerContainer}>
                      <ActivityIndicator size="large" color={COLORS.primary} />
                      <Text variant="bodyMedium" style={[styles.loadingText, { color: COLORS.textMuted }]}>
                        Searching...
                      </Text>
                    </View>
                  )}

                  {/* Results State */}
                  {!isLoading && state === "results" && (
                    <>
                      <Text variant="titleMedium" style={[styles.resultsTitle, { color: COLORS.textPrimary }]}>
                        {results.length} recipe{results.length !== 1 ? "s" : ""} found
                      </Text>
                      {results.map((recipe) => (
                        <View key={recipe.id} style={styles.resultCard}>
                          <RecipeCard
                            recipe={recipe}
                            onPress={() => handleRecipePress(recipe.id)}
                          />
                        </View>
                      ))}
                    </>
                  )}

                  {/* Empty State */}
                  {!isLoading && state === "empty" && (
                    <View style={styles.centerContainer}>
                      <MaterialCommunityIcons
                        name="magnify-close"
                        size={64}
                        color={COLORS.textMuted}
                      />
                      <Text variant="titleMedium" style={[styles.emptyText, { color: COLORS.textPrimary }]}>
                        No results found
                      </Text>
                      <Text variant="bodyMedium" style={[styles.emptySubtext, { color: COLORS.textMuted }]}>
                        {hasQuery
                          ? `We couldn't find anything for "${searchQuery}". Try another dish or mood?`
                          : "Try adjusting your filters or search for something different"}
                      </Text>
                    </View>
                  )}

                  {/* Error State */}
                  {state === "error" && (
                    <View style={styles.centerContainer}>
                      <MaterialCommunityIcons
                        name="alert-circle-outline"
                        size={64}
                        color={COLORS.error}
                      />
                      <Text variant="titleMedium" style={[styles.emptyText, { color: COLORS.textPrimary }]}>
                        Something went wrong
                      </Text>
                      <Text variant="bodyMedium" style={[styles.emptySubtext, { color: COLORS.textMuted }]}>
                        Please try again
                      </Text>
                      <Button
                        mode="contained"
                        onPress={() => {
                          setSearchQuery((prev) => prev);
                        }}
                        style={[styles.retryButton, { backgroundColor: COLORS.primary }]}
                      >
                        Retry
                      </Button>
                    </View>
                  )}
                </ScrollView>
              )}
            </View>
          </KeyboardAvoidingView>

          <BottomNav />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
    zIndex: 10,
  },
  searchCard: {
    borderRadius: 16,
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(15, 23, 42, 0.06)",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    minHeight: 32,
    color: COLORS.textPrimary,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  idleContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 120,
  },
  idleTitle: {
    marginBottom: 8,
    fontWeight: "700",
    opacity: 0.95,
  },
  idleSubtitle: {
    marginBottom: 16,
    opacity: 0.8,
  },
  popularChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  popularChip: {
    marginHorizontal: 4,
    marginVertical: 4,
  },
  popularChipLabel: {
    fontSize: 14,
  },
  idleScroll: {
    flex: 1,
  },
  categoryList: {
    marginTop: 8,
    gap: 12,
  },
  categoryListItem: {
    marginBottom: 4,
  },
  resultsScrollView: {
    flex: 1,
  },
  resultsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  resultsTitle: {
    marginBottom: 16,
    fontWeight: "600",
    color: COLORS.textMain,
  },
  resultCard: {
    marginBottom: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    opacity: 0.7,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "600",
    textAlign: "center",
    color: COLORS.textMain,
  },
  emptySubtext: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 24,
  },
});
