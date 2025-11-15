import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, Card } from "react-native-paper";
import { useTheme } from "react-native-paper";

interface RecipeCardProps {
  id: string;
  title: string;
  imageUrl?: string;
  onPress: () => void;
}

export default function RecipeCard({ id, title, imageUrl, onPress }: RecipeCardProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.placeholderImage, { backgroundColor: theme.colors.surfaceVariant }]}>
              <Text style={styles.placeholderText}>📷</Text>
            </View>
          )}
        </View>
        <Card.Content style={styles.content}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
            {title}
          </Text>
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
    height: 160,
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
  placeholderText: {
    fontSize: 48,
  },
  content: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontWeight: "600",
  },
});


