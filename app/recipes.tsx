import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text, Card, Chip, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "@/components/BottomNav";
import { getRecipes, getCategories, type Recipe } from "@/data/recipes";
import { COLORS, COOKING_BACKGROUND_IMAGE } from "@/constants/colors";
import { commonBackgroundStyles } from "@/constants/styles";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

const TIME_FILTERS = [
  { label: "Any", value: null },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "60 min", value: 60 },
];

export default function RecipesPage() {
  const router = useRouter();
  const theme = useTheme();
  const allRecipes = getRecipes();
  const categories = getCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxTime, setMaxTime] = useState<number | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    let filtered = allRecipes;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((recipe) => recipe.category === selectedCategory);
    }

    // Time filter
    if (maxTime !== null) {
      filtered = filtered.filter((recipe) => recipe.timeMinutes <= maxTime);
    }

    return filtered;
  }, [searchQuery, selectedCategory, maxTime, allRecipes]);

  const handleRecipePress = (recipeId: number) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setMaxTime(null);
  };

  const hasActiveFilters = searchQuery.trim() || selectedCategory || maxTime !== null;

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
            {/* Header */}
            <View style={styles.header}>
              <Text variant="headlineLarge" style={styles.title}>
                Recipes
              </Text>
              <View style={styles.titleUnderline} />
              <Text variant="bodyMedium" style={styles.subtitle}>
                Browse {allRecipes.length} recipes
              </Text>
            </View>

            {/* Search Bar */}
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
                    placeholder="Search recipes..."
                    placeholderTextColor={COLORS.textMuted + "80"}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    returnKeyType="search"
                  />
                  {searchQuery.trim() && (
                    <TouchableOpacity
                      onPress={() => setSearchQuery("")}
                      style={styles.clearButton}
                    >
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

            {/* Filters */}
            <View style={styles.filtersContainer}>
              {/* Category Filter */}
              <View style={styles.filterRow}>
                <Text variant="bodyMedium" style={styles.filterLabel}>
                  Category:
                </Text>
                <View style={styles.filterChips}>
                  <TouchableOpacity
                    onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    style={[
                      styles.filterChip,
                      selectedCategory && styles.filterChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedCategory && styles.filterChipTextActive,
                      ]}
                    >
                      {selectedCategory || "All"}
                    </Text>
                    <MaterialCommunityIcons
                      name={showCategoryDropdown ? "chevron-up" : "chevron-down"}
                      size={20}
                      color={selectedCategory ? COLORS.textPrimary : COLORS.textMuted}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Category Dropdown */}
              {showCategoryDropdown && (
                <View style={styles.dropdown}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCategory(null);
                      setShowCategoryDropdown(false);
                    }}
                    style={[
                      styles.dropdownItem,
                      !selectedCategory && styles.dropdownItemActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        !selectedCategory && styles.dropdownItemTextActive,
                      ]}
                    >
                      All
                    </Text>
                  </TouchableOpacity>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() => {
                        setSelectedCategory(category);
                        setShowCategoryDropdown(false);
                      }}
                      style={[
                        styles.dropdownItem,
                        selectedCategory === category && styles.dropdownItemActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          selectedCategory === category && styles.dropdownItemTextActive,
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Time Filter */}
              <View style={styles.filterRow}>
                <Text variant="bodyMedium" style={styles.filterLabel}>
                  Max Time:
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.timeFilterScroll}
                >
                  {TIME_FILTERS.map((filter) => (
                    <TouchableOpacity
                      key={filter.label}
                      onPress={() => setMaxTime(filter.value)}
                      style={[
                        styles.timeFilterChip,
                        maxTime === filter.value && styles.timeFilterChipActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.timeFilterChipText,
                          maxTime === filter.value && styles.timeFilterChipTextActive,
                        ]}
                      >
                        {filter.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <TouchableOpacity
                  onPress={handleClearFilters}
                  style={styles.clearFiltersButton}
                >
                  <MaterialCommunityIcons
                    name="close-circle-outline"
                    size={18}
                    color={COLORS.primary}
                  />
                  <Text style={styles.clearFiltersText}>Clear filters</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Results Count */}
            <View style={styles.resultsHeader}>
              <Text variant="titleMedium" style={styles.resultsCount}>
                {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""} found
              </Text>
            </View>

            {/* Recipes Grid */}
            {filteredRecipes.length > 0 ? (
              <View style={styles.recipesGrid}>
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onPress={() => handleRecipePress(recipe.id)}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="magnify-close"
                  size={64}
                  color={COLORS.textMuted}
                />
                <Text variant="titleMedium" style={styles.emptyText}>
                  No recipes found
                </Text>
                <Text variant="bodyMedium" style={styles.emptySubtext}>
                  Try adjusting your filters
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

// Recipe Card Component
function RecipeCard({
  recipe,
  onPress,
}: {
  recipe: Recipe;
  onPress: () => void;
}) {
  const theme = useTheme();
  const hasCategory = !!recipe.category;
  const hasCuisine = !!recipe.cuisine;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.recipeCardContainer}
    >
      <Card style={[styles.recipeCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.recipeCardContent}>
          {/* Recipe Name */}
          <Text variant="titleMedium" style={styles.recipeName} numberOfLines={2}>
            {recipe.name}
          </Text>

          {/* Category and Cuisine Tags */}
          {(hasCategory || hasCuisine) && (
            <View style={styles.tagsContainer}>
              {hasCategory && (
                <Chip
                  style={[styles.tag, { backgroundColor: COLORS.primary }]}
                  textStyle={[styles.tagText, { color: COLORS.white, fontWeight: "700" }]}
                  compact
                >
                  {recipe.category}
                </Chip>
              )}
              {hasCuisine && (
                <Chip
                  style={[styles.tag, { backgroundColor: COLORS.primary }]}
                  textStyle={[styles.tagText, { color: COLORS.white, fontWeight: "700" }]}
                  compact
                >
                  {recipe.cuisine}
                </Chip>
              )}
            </View>
          )}

          {/* Time */}
          <View style={styles.metaRow}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={16}
              color={COLORS.textMuted}
            />
            <Text style={styles.metaText}>{recipe.timeMinutes} min</Text>
          </View>

          {/* Macros */}
          <View style={styles.macrosContainer}>
            <Text style={styles.macrosText}>
              {recipe.macros.calories} kcal · {recipe.macros.protein}P · {recipe.macros.carbs}C · {recipe.macros.fat}F
            </Text>
          </View>

          {/* View Details Button */}
          <View style={styles.viewDetailsContainer}>
            <Text style={styles.viewDetailsText}>View details →</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
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
    alignItems: "flex-start",
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchCard: {
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 4,
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
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
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  filterLabel: {
    color: COLORS.textPrimary,
    marginRight: 12,
    minWidth: 80,
    fontWeight: "500",
  },
  filterChips: {
    flex: 1,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
    maxWidth: 200,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary + "40",
    borderColor: COLORS.primary,
  },
  filterChipText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  filterChipTextActive: {
    color: COLORS.textPrimary,
  },
  dropdown: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemActive: {
    backgroundColor: COLORS.primary + "20",
  },
  dropdownItemText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  dropdownItemTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  timeFilterScroll: {
    flex: 1,
  },
  timeFilterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
    marginRight: 8,
  },
  timeFilterChipActive: {
    backgroundColor: COLORS.primary + "40",
    borderColor: COLORS.primary,
  },
  timeFilterChipText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: "500",
  },
  timeFilterChipTextActive: {
    color: COLORS.textPrimary,
  },
  clearFiltersButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  clearFiltersText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  resultsHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  resultsCount: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  recipesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    gap: 16,
    justifyContent: "space-between",
  },
  recipeCardContainer: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  recipeCard: {
    borderRadius: 24,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "rgba(15, 23, 42, 0.18)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  recipeCardContent: {
    padding: 16,
  },
  recipeName: {
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.textMain,
    marginBottom: 12,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    height: 24,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  metaText: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginLeft: 6,
    fontWeight: "500",
  },
  macrosContainer: {
    marginBottom: 12,
  },
  macrosText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "500",
  },
  viewDetailsContainer: {
    alignItems: "flex-end",
  },
  viewDetailsText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  emptyState: {
    padding: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    color: COLORS.textMuted,
    textAlign: "center",
    opacity: 0.8,
  },
});

