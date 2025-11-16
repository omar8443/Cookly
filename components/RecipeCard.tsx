import { COLORS } from "@/constants/colors";
import { Recipe } from "@/types/recipe";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

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
  category?: string;
  cookTime?: string;
  height?: number;
  onPress: () => void;
}

type RecipeCardProps = RecipeCardPropsNew | RecipeCardPropsOld;

// Helper to check if props are new format
function isNewFormat(props: RecipeCardProps): props is RecipeCardPropsNew {
  return "recipe" in props;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

export default function RecipeCard(props: RecipeCardProps) {
  const theme = useTheme();
  
  // Handle both old and new prop formats
  const recipe: Recipe = isNewFormat(props)
    ? props.recipe
    : {
        id: props.id,
        title: props.title,
        imageUrl: props.imageUrl,
        category: props.category || "",
        description: "",
        cookTime: props.cookTime || "",
        prepTime: 0,
        totalTime: 0,
        servings: 0,
        difficulty: "Easy",
        cost: "$",
        filters: [],
        ingredients: [],
        instructions: [],
      };
  
  const onPress = props.onPress;
  const height = props.height || 220;
  
  // Animation for card press interaction
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.touchable}
      >
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.imageContainer, { height }]}>
            <View style={styles.skeletonContainer}>
              {!imageLoaded && <View style={styles.skeleton} />}
            </View>
            {recipe.imageUrl ? (
              <>
                <Animated.Image
                  source={{ uri: recipe.imageUrl }}
                  style={[styles.image, { opacity: imageOpacity }]}
                  resizeMode="cover"
                  onLoad={handleImageLoad}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.8)"]}
                  style={styles.imageOverlay}
                >
                  {recipe.category && (
                    <LinearGradient
                      colors={COLORS.primaryGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.categoryBadge}
                    >
                      <Text style={styles.categoryText} numberOfLines={1}>
                        {recipe.category.toUpperCase()}
                      </Text>
                    </LinearGradient>
                  )}
                  <View style={styles.titleOverlay}>
                    <Text variant="titleMedium" style={styles.titleOnImage} numberOfLines={2}>
                      {recipe.title}
                    </Text>
                    {recipe.cookTime && (
                      <View style={styles.metaInfo}>
                        <Text style={styles.cookTime}>{recipe.cookTime}</Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </>
            ) : (
              <View style={[styles.placeholderImage, { backgroundColor: theme.colors.surfaceVariant }]}>
                <View style={styles.titleOverlay}>
                  <Text variant="titleMedium" style={styles.titleOnImage} numberOfLines={2}>
                    {recipe.title}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  touchable: {
    width: "100%",
  },
  card: {
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
  imageContainer: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  skeletonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  skeleton: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    backgroundColor: "rgba(148, 163, 184, 0.35)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 12,
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    maxWidth: "70%",
    shadowColor: COLORS.primaryDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  titleOverlay: {
    width: "100%",
  },
  titleOnImage: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    marginBottom: 4,
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  cookTime: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.9,
    fontWeight: "500",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 12,
    backgroundColor: COLORS.bg,
  },
  placeholderText: {
    fontSize: 48,
    position: "absolute",
    top: "30%",
    opacity: 0.3,
  },
});
