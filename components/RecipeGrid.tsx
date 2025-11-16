import { View, StyleSheet, Dimensions } from "react-native";
import RecipeCard from "./RecipeCard";

interface Recipe {
  id: string;
  title: string;
  imageUrl?: string;
  category?: string;
  cookTime?: string;
}

interface RecipeGridProps {
  recipes: Recipe[];
  onRecipePress: (recipeId: string) => void;
}

const { width } = Dimensions.get("window");
const PADDING = 16;
const GAP = 16;
const CARD_WIDTH = (width - PADDING * 2 - GAP) / 2;

// Variable heights for masonry effect - alternating patterns
const getHeightForIndex = (index: number): number => {
  const heights = [220, 280, 240, 300, 260, 250, 290, 230, 270, 240, 300, 250];
  return heights[index % heights.length];
};

export default function RecipeGrid({ recipes, onRecipePress }: RecipeGridProps) {
  // Split recipes into two columns for masonry effect
  const leftColumn: (Recipe & { height: number })[] = [];
  const rightColumn: (Recipe & { height: number })[] = [];

  recipes.forEach((recipe, index) => {
    const recipeWithHeight = { ...recipe, height: getHeightForIndex(index) };
    if (index % 2 === 0) {
      leftColumn.push(recipeWithHeight);
    } else {
      rightColumn.push(recipeWithHeight);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {leftColumn.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            imageUrl={recipe.imageUrl}
            category={recipe.category}
            cookTime={recipe.cookTime}
            height={recipe.height}
            onPress={() => onRecipePress(recipe.id)}
          />
        ))}
      </View>
      <View style={styles.column}>
        {rightColumn.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            imageUrl={recipe.imageUrl}
            category={recipe.category}
            cookTime={recipe.cookTime}
            height={recipe.height}
            onPress={() => onRecipePress(recipe.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: PADDING,
    gap: GAP,
    alignItems: "flex-start",
  },
  column: {
    flex: 1,
    maxWidth: CARD_WIDTH,
  },
});

