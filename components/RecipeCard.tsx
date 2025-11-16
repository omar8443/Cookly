import { Recipe } from "@/types/recipe";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Chip, Text, useTheme } from "react-native-paper";

// Support both old interface (for backwards compatibility) and new interface
interface RecipeCardPropsNew {
  recipe: Recipe;
  onPress: () => void;
  height?: number;
}

interface RecipeCardPropsOld {
  id: string;
  title: string;
  imageUrl?: string;
  cookTime?: string;
  cost?: string;
  filters?: Recipe["filters"];
  onPress: () => void;
  height?: number;
}

type RecipeCardProps = RecipeCardPropsNew | RecipeCardPropsOld;

// Helper to check if props are new format
function isNewFormat(props: RecipeCardProps): props is RecipeCardPropsNew {
  return "recipe" in props;
}

export default function RecipeCard(props: RecipeCardProps) {
  const theme = useTheme();

  // Handle both old and new prop formats
  const recipe: Recipe = isNewFormat(props)
    ? props.recipe
    : {
        id: props.id,
        title: props.title,
        imageUrl: props.imageUrl,
        category: "",
        description: "",
        cookTime: props.cookTime || "",
        prepTime: 0,
        totalTime: 0,
        servings: 0,
        difficulty: "Easy",
        cost: (props.cost as any) || "$",
        filters: props.filters || [],
        ingredients: [],
        instructions: [],
      };

  const onPress = props.onPress;
  const height = props.height ?? 160;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={[styles.imageContainer, { height }]}>
          {recipe.imageUrl ? (
            <Image source={{ uri: recipe.imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.placeholderImage, { backgroundColor: theme.colors.surfaceVariant }]}>
              <MaterialCommunityIcons
                name="chef-hat"
                size={48}
                color={theme.colors.onSurfaceVariant}
              />
            </View>
          )}
        </View>
        <Card.Content style={styles.content}>
          <View style={styles.contentInner}>
            <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
              {recipe.title}
            </Text>

            {/* Meta tags row */}
            {(recipe.cookTime || (recipe.cost && recipe.cost !== "$")) && (
              <View style={styles.metaRow}>
                {recipe.cookTime && (
                  <View style={styles.metaItem}>
                    <Text
                      variant="bodySmall"
                      style={[styles.metaText, { color: COLORS.black }]}
                    >
                      {recipe.cookTime}
                    </Text>
                  </View>
                )}

                {recipe.cost && recipe.cost !== "$" && (
                  <View style={styles.metaItem}>
                    <Text
                      variant="bodySmall"
                      style={[styles.costText, { color: theme.colors.primary }]}
                    >
                      {recipe.cost}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Filter tags */}
            {recipe.filters.length > 0 && (
              <View style={styles.tagsContainer}>
                {recipe.filters.map((filter) => (
                  <Chip
                    key={filter}
                    mode="outlined"
                    compact
                    style={[
                      styles.tag,
                      { backgroundColor: "transparent", borderColor: COLORS.black },
                    ]}
                    textStyle={[styles.tagText, { color: COLORS.black }]}
                  >
                    {filter}
                  </Chip>
                ))}
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    overflow: "hidden",
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
  content: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  contentInner: {
    paddingBottom: 0,
  },
  title: {
    fontWeight: "600",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
  },
  costText: {
    fontSize: 12,
    fontWeight: "600",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 4,
    paddingBottom: 2,
  },
  tag: {
    marginRight: 6,
    marginBottom: 4,
    marginTop: 0,
  },
  tagText: {
    fontSize: 11,
  },
  moreTags: {
    fontSize: 11,
    marginLeft: 4,
  },
});
