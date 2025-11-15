import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { Text, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "@/components/BottomNav";
import RecipeCard from "@/components/RecipeCard";

// Mock search results
const allRecipes = [
  { id: "1", title: "Pancakes with Berries", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" },
  { id: "2", title: "Avocado Toast", imageUrl: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400" },
  { id: "3", title: "French Toast", imageUrl: "https://images.unsplash.com/photo-1484723091739-30a097b8f16b?w=400" },
  { id: "4", title: "Caesar Salad", imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400" },
  { id: "5", title: "Grilled Chicken", imageUrl: "https://images.unsplash.com/photo-1532550907401-a498c2d314b7?w=400" },
  { id: "6", title: "Pasta Carbonara", imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400" },
  { id: "7", title: "Beef Steak", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },
  { id: "8", title: "Chocolate Cake", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
];

export default function SearchScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof allRecipes>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = allRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  return (
    <LinearGradient
      colors={["#F8F9FA", "#FFFFFF", "#F8F9FA"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <Card style={[styles.searchCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.searchBar}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={24}
                  color={theme.colors.onSurfaceVariant}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search recipes..."
                  placeholderTextColor={theme.colors.onSurfaceVariant}
                  value={searchQuery}
                  onChangeText={handleSearch}
                  autoFocus
                  returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={20}
                    color={theme.colors.onSurfaceVariant}
                    onPress={() => handleSearch("")}
                    style={styles.clearIcon}
                  />
                )}
              </View>
            </Card>
          </View>

          <ScrollView
            style={styles.resultsContainer}
            contentContainerStyle={styles.resultsContent}
            showsVerticalScrollIndicator={false}
          >
            {searchQuery.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={64}
                  color={theme.colors.onSurfaceVariant}
                />
                <Text variant="titleMedium" style={styles.emptyText}>
                  Search for recipes
                </Text>
                <Text variant="bodyMedium" style={styles.emptySubtext}>
                  Type to find your favorite recipes
                </Text>
              </View>
            ) : searchResults.length > 0 ? (
              <>
                <Text variant="titleMedium" style={styles.resultsTitle}>
                  {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
                </Text>
                {searchResults.map((recipe) => (
                  <View key={recipe.id} style={styles.resultCard}>
                    <RecipeCard
                      id={recipe.id}
                      title={recipe.title}
                      imageUrl={recipe.imageUrl}
                      onPress={() => handleRecipePress(recipe.id)}
                    />
                  </View>
                ))}
              </>
            ) : (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="magnify-close"
                  size={64}
                  color={theme.colors.onSurfaceVariant}
                />
                <Text variant="titleMedium" style={styles.emptyText}>
                  No results found
                </Text>
                <Text variant="bodyMedium" style={styles.emptySubtext}>
                  Try a different search term
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        <BottomNav />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 40,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchCard: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  clearIcon: {
    marginLeft: 8,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  resultsTitle: {
    marginBottom: 16,
    fontWeight: "600",
  },
  resultCard: {
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 16,
    opacity: 0.7,
  },
  emptySubtext: {
    marginTop: 8,
    opacity: 0.5,
  },
});


