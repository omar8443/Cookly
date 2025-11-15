import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Text, List, Divider, Button, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "@/components/BottomNav";
import RecipeCard from "@/components/RecipeCard";

// Mock user data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
};

// Mock saved recipes
const savedRecipes = [
  { id: "1", title: "Pancakes with Berries", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" },
  { id: "6", title: "Pasta Carbonara", imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400" },
  { id: "8", title: "Chocolate Cake", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useTheme();

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logout pressed");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.colors.primaryContainer }]}>
            <Text style={[styles.avatarText, { color: theme.colors.primary }]}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text variant="headlineMedium" style={styles.name}>
            {user.name}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {user.email}
          </Text>
        </View>

        {/* My Recipes Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            My Recipes
          </Text>
          {savedRecipes.length > 0 ? (
            <View style={styles.recipesGrid}>
              {savedRecipes.map((recipe) => (
                <View key={recipe.id} style={styles.recipeCard}>
                  <RecipeCard
                    id={recipe.id}
                    title={recipe.title}
                    imageUrl={recipe.imageUrl}
                    onPress={() => handleRecipePress(recipe.id)}
                  />
                </View>
              ))}
            </View>
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <MaterialCommunityIcons
                  name="book-outline"
                  size={48}
                  color={theme.colors.onSurfaceVariant}
                />
                <Text variant="bodyMedium" style={styles.emptyText}>
                  No saved recipes yet
                </Text>
              </Card.Content>
            </Card>
          )}
        </View>

        <Divider style={styles.divider} />

        {/* Account Settings Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Account Settings
          </Text>
          <Card style={styles.settingsCard}>
            <List.Item
              title="Edit Name"
              description={user.name}
              left={(props) => <List.Icon {...props} icon="account-edit" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log("Edit name")}
            />
            <Divider />
            <List.Item
              title="Edit Email"
              description={user.email}
              left={(props) => <List.Icon {...props} icon="email-edit" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => console.log("Edit email")}
            />
          </Card>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            textColor={theme.colors.error}
            icon="logout"
          >
            Logout
          </Button>
        </View>
      </ScrollView>

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
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
  },
  name: {
    fontWeight: "700",
    marginBottom: 4,
  },
  email: {
    opacity: 0.7,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
  },
  recipesGrid: {
    gap: 12,
  },
  recipeCard: {
    marginBottom: 12,
  },
  emptyCard: {
    borderRadius: 16,
    elevation: 0,
  },
  emptyContent: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 16,
    opacity: 0.7,
  },
  divider: {
    marginVertical: 8,
    marginHorizontal: 20,
  },
  settingsCard: {
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
  logoutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoutButton: {
    borderRadius: 12,
  },
});


