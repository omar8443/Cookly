import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, FAB } from "react-native-paper";
import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "@/components/BottomNav";
import RecipeCard from "@/components/RecipeCard";

// Mock data - replace with your actual data source
const categories = [
  {
    id: "breakfast",
    name: "Breakfast",
    recipes: [
      { id: "1", title: "Pancakes with Berries", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" },
      { id: "2", title: "Avocado Toast", imageUrl: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400" },
      { id: "3", title: "French Toast", imageUrl: "https://images.unsplash.com/photo-1484723091739-30a097b8f16b?w=400" },
    ],
  },
  {
    id: "lunch",
    name: "Lunch",
    recipes: [
      { id: "4", title: "Caesar Salad", imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400" },
      { id: "5", title: "Grilled Chicken", imageUrl: "https://images.unsplash.com/photo-1532550907401-a498c2d314b7?w=400" },
    ],
  },
  {
    id: "dinner",
    name: "Dinner",
    recipes: [
      { id: "6", title: "Pasta Carbonara", imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400" },
      { id: "7", title: "Beef Steak", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400" },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    recipes: [
      { id: "8", title: "Chocolate Cake", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
      { id: "9", title: "Ice Cream", imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400" },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    recipes: [
      { id: "10", title: "Smoothie Bowl", imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da1b8c?w=400" },
    ],
  },
  {
    id: "snacks",
    name: "Snacks",
    recipes: [
      { id: "11", title: "Trail Mix", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400" },
    ],
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  const handleAddRecipe = () => {
    // Navigate to add recipe screen or show modal
    console.log("Add recipe pressed");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            My Recipes
          </Text>
        </View>

        {categories.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <Text variant="titleLarge" style={[styles.categoryTitle, { color: theme.colors.primary }]}>
              {category.name}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recipeRow}
            >
              {category.recipes.map((recipe) => (
                <View key={recipe.id} style={styles.recipeCardWrapper}>
                  <RecipeCard
                    id={recipe.id}
                    title={recipe.title}
                    imageUrl={recipe.imageUrl}
                    onPress={() => handleRecipePress(recipe.id)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleAddRecipe}
        label="Add Recipe"
      />

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontWeight: "700",
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryTitle: {
    paddingHorizontal: 20,
    marginBottom: 16,
    fontWeight: "600",
  },
  recipeRow: {
    paddingHorizontal: 20,
    gap: 16,
  },
  recipeCardWrapper: {
    width: 200,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 100,
    borderRadius: 28,
  },
});


