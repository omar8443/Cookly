import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Text, Card, Chip } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Mock recipe data - replace with your actual data source
const getRecipeById = (id: string) => {
  const recipes: Record<string, any> = {
    "1": {
      id: "1",
      title: "Pancakes with Berries",
      imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
      category: "Breakfast",
      cookTime: "15 min",
      servings: 2,
      ingredients: [
        "1 cup all-purpose flour",
        "2 tablespoons sugar",
        "2 teaspoons baking powder",
        "1 cup milk",
        "1 egg",
        "2 tablespoons butter",
        "Fresh berries",
      ],
      instructions: [
        "Mix dry ingredients in a bowl",
        "Whisk wet ingredients separately",
        "Combine wet and dry ingredients",
        "Cook on griddle until golden",
        "Serve with fresh berries",
      ],
    },
  };
  return recipes[id] || {
    id,
    title: "Recipe",
    imageUrl: "",
    category: "General",
    cookTime: "30 min",
    servings: 4,
    ingredients: ["Ingredient 1", "Ingredient 2"],
    instructions: ["Step 1", "Step 2"],
  };
};

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const recipe = getRecipeById(id);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top"]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          {recipe.imageUrl ? (
            <Image source={{ uri: recipe.imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.placeholderImage, { backgroundColor: theme.colors.surfaceVariant }]}>
              <MaterialCommunityIcons name="image-outline" size={64} color={theme.colors.onSurfaceVariant} />
            </View>
          )}
          <View style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={theme.colors.onSurface}
              onPress={() => router.back()}
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            {recipe.title}
          </Text>

          {/* Meta Info */}
          <View style={styles.metaContainer}>
            <Chip icon="clock-outline" style={styles.chip}>
              {recipe.cookTime}
            </Chip>
            <Chip icon="account-group" style={styles.chip}>
              {recipe.servings} servings
            </Chip>
            <Chip style={[styles.chip, { backgroundColor: theme.colors.primaryContainer }]}>
              {recipe.category}
            </Chip>
          </View>

          {/* Ingredients */}
          <Card style={styles.sectionCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Ingredients
              </Text>
              {recipe.ingredients.map((ingredient: string, index: number) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={[styles.bullet, { backgroundColor: theme.colors.primary }]} />
                  <Text variant="bodyLarge" style={styles.ingredientText}>
                    {ingredient}
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Instructions */}
          <Card style={styles.sectionCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Instructions
              </Text>
              {recipe.instructions.map((instruction: string, index: number) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text variant="bodyLarge" style={styles.instructionText}>
                    {instruction}
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
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
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
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
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  sectionCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
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
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  instructionText: {
    flex: 1,
    lineHeight: 24,
  },
});


