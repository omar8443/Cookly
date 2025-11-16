import React, { useRef } from "react";
import { TouchableOpacity, Animated, StyleSheet, ViewStyle, Image, View } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/colors";
import { CATEGORY_SCREEN_TOKENS } from "@/constants/styles";

interface CategoryCardProps {
  id: string;
  name: string;
  emoji: string;
  recipeCount: number;
  onPress: () => void;
  width: number;
  imageUri?: string;
  containerStyle?: Animated.WithAnimatedObject<ViewStyle>;
}

export default function CategoryCard({
  id,
  name,
  emoji,
  recipeCount,
  onPress,
  width,
  imageUri,
  containerStyle,
}: CategoryCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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

  return (
    <Animated.View
      style={[
        styles.categoryCardWrapper,
        { width, transform: [{ scale: scaleAnim }] },
        containerStyle,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={COLORS.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.categoryCard}
        >
          <View style={styles.content}>
            <Text variant="titleMedium" style={styles.categoryCardTitle} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.categoryCount}>
              {recipeCount} {recipeCount === 1 ? "recipe" : "recipes"}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  categoryCardWrapper: {
    marginBottom: 12,
  },
  categoryCard: {
    borderRadius: CATEGORY_SCREEN_TOKENS.cardRadius,
    padding: CATEGORY_SCREEN_TOKENS.cardPadding,
    minHeight: 168,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.14)",
    overflow: "hidden",
    ...CATEGORY_SCREEN_TOKENS.cardShadow,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  photoWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.9)",
  },
  photoImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    resizeMode: "cover",
  },
  categoryCardTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: CATEGORY_SCREEN_TOKENS.cardTitleFontSize,
    marginBottom: 4,
    textAlign: "left",
  },
  categoryCount: {
    color: "#FFFFFF",
    fontSize: CATEGORY_SCREEN_TOKENS.cardSubtitleFontSize,
    opacity: 0.75,
    fontWeight: "500",
  },
});

