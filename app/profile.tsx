import BottomNav from "@/components/BottomNav";
import RecipeCard from "@/components/RecipeCard";
import { useAuth } from "@/contexts/AuthContext";
import { getUserStreak, UserStreakData } from "@/lib/streaks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, Chip, Divider, List, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, PROFILE_BACKGROUND_IMAGE } from "@/constants/colors";
import { commonBackgroundStyles } from "@/constants/styles";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 52) / 2; // 2 columns with padding and gap

// Lightweight cooking stats used only as fallback around real streak data
const cookingStats = {
  dishesThisWeek: 7,
  currentStreak: 5,
};

// Mock recipes
const createdRecipes = [
  { id: "1", title: "My Pasta Recipe", imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400", cookedCount: 3 },
  { id: "2", title: "Homemade Pizza", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400", cookedCount: 5 },
];

const favoriteRecipes = [
  { id: "3", title: "Pancakes with Berries", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" },
  { id: "4", title: "Pasta Carbonara", imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400" },
  { id: "5", title: "Chocolate Cake", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
];

const recentlyCooked = [
  { id: "6", title: "Caesar Salad", imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400", date: "2 days ago" },
  { id: "7", title: "Grilled Chicken", imageUrl: "https://images.unsplash.com/photo-1532550907401-a498c2d314b7?w=400", date: "3 days ago" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { user, userData, loading, signOut } = useAuth();
  const [activeRecipeTab, setActiveRecipeTab] = useState<"created" | "favorites" | "recent">("favorites");
  const [streakData, setStreakData] = useState<UserStreakData | null>(null);

  useEffect(() => {
    const loadStreak = async () => {
      try {
        if (!user) return;
        const data = await getUserStreak(user.uid);
        setStreakData(data);
      } catch (error) {
        console.error("Failed to load user streak:", error);
      }
    };

    loadStreak();
  }, [user]);

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getCurrentRecipes = () => {
    switch (activeRecipeTab) {
      case "created":
        return createdRecipes;
      case "favorites":
        return favoriteRecipes;
      case "recent":
        return recentlyCooked;
      default:
        return favoriteRecipes;
    }
  };

  const renderStatsCard = (icon: string, value: string | number, label: string, color?: string) => (
    <View style={styles.quickStatItem}>
      <Text style={[styles.quickStatValue, { color: color || COLORS.primary }]}>{value}</Text>
      <Text style={[styles.quickStatLabel, { color: COLORS.textMuted }]}>{label}</Text>
    </View>
  );

  const renderActivityCard = (
    title: string,
    value: string | number,
    subtitle: string,
    icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"],
    color: string
  ) => (
    <Card style={styles.activityCard}>
      <Card.Content style={styles.activityCardContent}>
        <View style={styles.activityCardHeader}>
          <MaterialCommunityIcons name={icon} size={24} color={color} />
          <Text variant="titleMedium" style={styles.activityCardTitle}>{title}</Text>
        </View>
        <Text style={[styles.activityCardValue, { color }]}>{value}</Text>
        <Text variant="bodySmall" style={[styles.activityCardSubtitle, { color: COLORS.textMuted }]}>
          {subtitle}
        </Text>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: COLORS.bg }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const displayName = userData?.displayName || user?.displayName || user?.email?.split("@")[0] || "User";
  const email = userData?.email || user?.email || "";
  const phone = (userData as any)?.phone || user?.phoneNumber || "Not set";
  const photoURL = userData?.photoURL || user?.photoURL;
  const location = (userData as any)?.location || "Not set";
  const bio = (userData as any)?.bio || "";
  const dietaryTags = (userData as any)?.dietaryTags || [];
  const budgetLabel = (userData as any)?.budgetLabel || "Not set";
  const skillLevel = (userData as any)?.skillLevel || "Beginner";

  return (
    <View style={commonBackgroundStyles.container}>
      <ImageBackground
        source={{ uri: PROFILE_BACKGROUND_IMAGE }}
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
            {/* Profile Header Card */}
            <Card style={styles.profileHeaderCard}>
              <Card.Content style={styles.profileHeaderContent}>
                <TouchableOpacity 
                  style={styles.avatarWrapper}
                  onPress={() => router.push("/edit-profile" as any)}
                >
                  <View style={[styles.avatarContainer, { backgroundColor: COLORS.primary + "20" }]}>
                    {photoURL ? (
                      <Image source={{ uri: photoURL }} style={styles.avatarImage} />
                    ) : (
                      <Text style={[styles.avatarText, { color: COLORS.primary }]}>
                        {displayName.charAt(0).toUpperCase()}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.editBadge, { backgroundColor: COLORS.primary }]}>
                    <MaterialCommunityIcons name="pencil" size={12} color="#FFF" />
                  </View>
                </TouchableOpacity>

                <Text variant="headlineSmall" style={styles.name}>
                  {displayName}
                </Text>

                <View style={styles.locationRow}>
                  <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.textMuted} />
                  <Text variant="bodyMedium" style={[styles.location, { color: COLORS.textMuted }]}>
                    {location}
                  </Text>
                </View>

                {bio && (
                  <Text variant="bodySmall" style={[styles.bio, { color: COLORS.textMuted }]}>
                    {bio}
                  </Text>
                )}

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
                  {dietaryTags.map((tag: string, index: number) => (
                    <Chip key={index} mode="flat" style={[styles.tagChip, { backgroundColor: COLORS.primary + "20" }]} textStyle={styles.tagText}>
                      {tag}
                    </Chip>
                  ))}
                  <Chip mode="flat" style={[styles.tagChip, { backgroundColor: COLORS.primary + "20" }]} textStyle={styles.tagText}>
                    {budgetLabel}
                  </Chip>
                  <Chip mode="flat" style={[styles.tagChip, { backgroundColor: COLORS.primary + "20" }]} textStyle={styles.tagText}>
                    {skillLevel}
                  </Chip>
                </ScrollView>

                <View style={styles.quickStatsRow}>
                  {renderStatsCard("🍳", cookingStats.dishesThisWeek, "This week")}
                  {renderStatsCard(
                    "🔥",
                    `${streakData?.currentStreak ?? cookingStats.currentStreak}`,
                    "Streak"
                  )}
                </View>
              </Card.Content>
            </Card>

            {/* Cooking Activity Dashboard */}
            <View style={styles.section}>
              <Text variant="titleLarge" style={[styles.sectionTitle, { color: COLORS.primary }]}>
                Cooking Activity
              </Text>

              <View style={styles.activityGrid}>
                {renderActivityCard(
                  "Streak",
                  `${streakData?.currentStreak ?? cookingStats.currentStreak} days`,
                  "Cook consistently to keep your streak going.",
                  "fire",
                  "#FF9800"
                )}
              </View>
            </View>

            {/* My Recipes Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text variant="titleLarge" style={[styles.sectionTitle, { color: COLORS.primary }]}>
                  My Recipes
                </Text>
              </View>

              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[styles.tab, activeRecipeTab === "created" && styles.activeTab]}
                  onPress={() => setActiveRecipeTab("created")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeRecipeTab === "created" && { color: COLORS.primary, fontWeight: "600" },
                    ]}
                  >
                    Created
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, activeRecipeTab === "favorites" && styles.activeTab]}
                  onPress={() => setActiveRecipeTab("favorites")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeRecipeTab === "favorites" && { color: COLORS.primary, fontWeight: "600" },
                    ]}
                  >
                    Favorites
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, activeRecipeTab === "recent" && styles.activeTab]}
                  onPress={() => setActiveRecipeTab("recent")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeRecipeTab === "recent" && { color: COLORS.primary, fontWeight: "600" },
                    ]}
                  >
                    Recently Cooked
                  </Text>
                </TouchableOpacity>
              </View>

              {getCurrentRecipes().length > 0 ? (
                <View style={styles.recipesGrid}>
                  {getCurrentRecipes().map((recipe) => (
                    <View key={recipe.id} style={[styles.recipeCard, { width: CARD_WIDTH }]}>
                      <RecipeCard
                        id={recipe.id}
                        title={recipe.title}
                        imageUrl={recipe.imageUrl}
                        onPress={() => handleRecipePress(recipe.id)}
                      />
                      {activeRecipeTab === "recent" && "date" in recipe && typeof recipe.date === "string" && (
                        <Text variant="bodySmall" style={styles.recipeDate}>
                          {recipe.date}
                        </Text>
                      )}
                      {activeRecipeTab === "created" && "cookedCount" in recipe && typeof recipe.cookedCount === "number" && (
                        <View style={styles.cookedBadge}>
                          <MaterialCommunityIcons name="silverware-fork-knife" size={12} color={COLORS.primary} />
                          <Text variant="bodySmall" style={[styles.cookedCount, { color: COLORS.primary }]}>
                            Cooked {recipe.cookedCount}x
                          </Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              ) : (
                <Card style={styles.emptyCard}>
                  <Card.Content style={styles.emptyContent}>
                    <MaterialCommunityIcons name="book-outline" size={48} color={COLORS.textMuted} />
                    <Text variant="bodyMedium" style={styles.emptyText}>
                      No {activeRecipeTab === "created" ? "created" : activeRecipeTab === "favorites" ? "favorite" : "recent"} recipes yet
                    </Text>
                  </Card.Content>
                </Card>
              )}
            </View>

            {/* Preferences */}
            <View style={styles.section}>
              <Text variant="titleLarge" style={[styles.sectionTitle, { color: COLORS.primary }]}>
                Preferences
              </Text>

              <Card style={styles.preferencesCard}>
                <Card.Content>
                  <View style={styles.preferenceRow}>
                    <MaterialCommunityIcons name="food-variant" size={20} color={COLORS.primary} />
                    <View style={styles.preferenceContent}>
                      <Text variant="titleSmall" style={{ color: COLORS.textPrimary }}>Dietary Preferences</Text>
                      <View style={styles.chipsRow}>
                        {dietaryTags.map((tag: string, index: number) => (
                          <Chip key={index} mode="flat" style={styles.preferenceChip}>
                            {tag}
                          </Chip>
                        ))}
                      </View>
                    </View>
                  </View>

                  <Divider style={styles.preferenceDivider} />

                  <View style={styles.preferenceRow}>
                    <MaterialCommunityIcons name="currency-usd" size={20} color={COLORS.primary} />
                    <View style={styles.preferenceContent}>
                      <Text variant="titleSmall" style={{ color: COLORS.textPrimary }}>Budget Range</Text>
                      <Chip mode="flat" style={styles.preferenceChip}>
                        {budgetLabel}
                      </Chip>
                    </View>
                  </View>

                  <Divider style={styles.preferenceDivider} />

                  <View style={styles.preferenceRow}>
                    <MaterialCommunityIcons name="account-group" size={20} color={COLORS.primary} />
                    <View style={styles.preferenceContent}>
                      <Text variant="titleSmall" style={{ color: COLORS.textPrimary }}>Default Serving Size</Text>
                      <Chip mode="flat" style={styles.preferenceChip}>
                        2 people
                      </Chip>
                    </View>
                  </View>

                  <Divider style={styles.preferenceDivider} />

                  <View style={styles.preferenceRow}>
                    <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={COLORS.primary} />
                    <View style={styles.preferenceContent}>
                      <Text variant="titleSmall" style={{ color: COLORS.textPrimary }}>Cooking Skill Level</Text>
                      <Chip mode="flat" style={styles.preferenceChip}>
                        {skillLevel}
                      </Chip>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </View>


            {/* Visual Separator */}
            <View style={styles.settingsDivider}>
              <Divider style={styles.divider} />
            </View>

            {/* Account & App Settings */}
            <View style={styles.section}>
              <Text variant="titleLarge" style={[styles.settingsSectionTitle, { color: COLORS.textMuted }]}>
                Account & Settings
              </Text>

              <Card style={styles.settingsCard}>
                <List.Item
                  title="Edit Profile"
                  description="Name, email, bio, location"
                  left={(props) => <List.Icon {...props} icon="account-edit" color={COLORS.textMuted} />}
                  right={(props) => <List.Icon {...props} icon="chevron-right" color={COLORS.textMuted} />}
                  onPress={() => router.push("/edit-profile" as any)}
                  titleStyle={{ color: COLORS.textPrimary }}
                  descriptionStyle={{ color: COLORS.textMuted }}
                />
                <Divider style={{ backgroundColor: COLORS.borderUnfocused }} />
                <List.Item
                  title="Notifications"
                  description="Push, email preferences"
                  left={(props) => <List.Icon {...props} icon="bell" color={COLORS.textMuted} />}
                  right={(props) => <List.Icon {...props} icon="chevron-right" color={COLORS.textMuted} />}
                  onPress={() => console.log("Notifications")}
                  titleStyle={{ color: COLORS.textPrimary }}
                  descriptionStyle={{ color: COLORS.textMuted }}
                />
                <Divider style={{ backgroundColor: COLORS.borderUnfocused }} />
                <List.Item
                  title="Language"
                  description="English / Français"
                  left={(props) => <List.Icon {...props} icon="translate" color={COLORS.textMuted} />}
                  right={(props) => <List.Icon {...props} icon="chevron-right" color={COLORS.textMuted} />}
                  onPress={() => console.log("Language")}
                  titleStyle={{ color: COLORS.textPrimary }}
                  descriptionStyle={{ color: COLORS.textMuted }}
                />
                <Divider style={{ backgroundColor: COLORS.borderUnfocused }} />
                <List.Item
                  title="Help Center"
                  description="FAQs, support"
                  left={(props) => <List.Icon {...props} icon="help-circle" color={COLORS.textMuted} />}
                  right={(props) => <List.Icon {...props} icon="chevron-right" color={COLORS.textMuted} />}
                  onPress={() => console.log("Help")}
                  titleStyle={{ color: COLORS.textPrimary }}
                  descriptionStyle={{ color: COLORS.textMuted }}
                />
              </Card>

              <View style={styles.logoutContainer}>
                <Button
                  mode="outlined"
                  onPress={handleLogout}
                  style={[styles.logoutButton, { borderColor: COLORS.error }]}
                  textColor={COLORS.error}
                  icon="logout"
                >
                  Logout
                </Button>
              </View>
            </View>
          </ScrollView>

          <BottomNav />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  // Profile Header
  profileHeaderCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 4,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  profileHeaderContent: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "700",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.85)",
  },
  name: {
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: COLORS.textPrimary,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    marginLeft: 4,
  },
  bio: {
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  tagsContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  tagChip: {
    marginRight: 8,
    height: 32,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
  quickStatsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  quickStatItem: {
    alignItems: "center",
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
  },
  // Sections
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
  },
  sectionSubtitle: {
    marginTop: 4,
  },
  addButton: {
    padding: 4,
  },
  activityGrid: {
    gap: 12,
    marginBottom: 16,
  },
  activityCard: {
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 3,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  activityCardContent: {
    paddingVertical: 16,
  },
  activityCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  activityCardTitle: {
    marginLeft: 8,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  activityCardValue: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  activityCardSubtitle: {
    fontSize: 12,
  },
  // Recipe Tabs
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  tabText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  // Recipes Grid
  recipesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  recipeCard: {
    marginBottom: 12,
  },
  recipeDate: {
    marginTop: 4,
    textAlign: "center",
    opacity: 0.7,
    color: COLORS.textPrimary,
  },
  cookedBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    gap: 4,
  },
  cookedCount: {
    fontSize: 11,
    fontWeight: "600",
  },
  emptyCard: {
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 1,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  emptyContent: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyText: {
    marginTop: 16,
    opacity: 0.7,
    color: COLORS.textPrimary,
  },
  // Preferences
  preferencesCard: {
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 2,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  preferenceRow: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  preferenceContent: {
    flex: 1,
    marginLeft: 12,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  preferenceChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  preferenceDivider: {
    marginVertical: 4,
    backgroundColor: COLORS.borderUnfocused,
  },
  // Settings
  settingsDivider: {
    marginVertical: 24,
    paddingHorizontal: 20,
  },
  divider: {
    marginVertical: 8,
    backgroundColor: COLORS.borderUnfocused,
  },
  settingsSectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
    opacity: 0.8,
  },
  settingsCard: {
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 1,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  logoutContainer: {
    marginTop: 16,
  },
  logoutButton: {
    borderRadius: 12,
  },
});
