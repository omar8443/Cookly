import BottomNav from "@/components/BottomNav";
import RecipeCard from "@/components/RecipeCard";
import { useAuth } from "@/contexts/AuthContext";
import { getUserStreak, UserStreakData } from "@/lib/streaks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Chip, Divider, List, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, COOKING_BACKGROUND_IMAGE } from "@/constants/colors";
import { commonBackgroundStyles } from "@/constants/styles";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = (width - 52) / 2; // 2 columns with padding and gap
const HERO_HEIGHT = height * 0.35; // Top 35% for hero gradient

// Mock cooking stats
const cookingStats = {
  dishesThisWeek: 7,
  dishesLastWeek: 5,
  currentStreak: 5,
  moneySavedThisWeek: 42,
  moneySavedThisMonth: 156,
  topCuisines: [
    { name: "Italian", count: 12, flag: "🇮🇹" },
    { name: "Mexican", count: 8, flag: "🇲🇽" },
    { name: "Japanese", count: 5, flag: "🇯🇵" },
  ],
  totalDishesCooked: 87,
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

// Mock pantry items
const pantryItems = [
  { id: "1", name: "Olive Oil", icon: "🍶", inPantry: true },
  { id: "2", name: "Garlic", icon: "🧄", inPantry: true },
  { id: "3", name: "Flour", icon: "🌾", inPantry: true },
  { id: "4", name: "Salt", icon: "🧂", inPantry: true },
  { id: "5", name: "Pepper", icon: "🌶️", inPantry: false },
  { id: "6", name: "Onions", icon: "🧅", inPantry: true },
  { id: "7", name: "Rice", icon: "🍚", inPantry: false },
  { id: "8", name: "Pasta", icon: "🍝", inPantry: true },
];

// Mock social data
const socialData = {
  friends: 12,
  followers: 8,
  following: 15,
  communities: 3,
  recentActivity: [
    { type: "friend", name: "Sarah", action: "cooked Pasta Carbonara", time: "yesterday" },
    { type: "community", name: "Montreal Vegan Group", action: "shared a new recipe", time: "2 hours ago" },
  ],
};

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
    <View style={[commonBackgroundStyles.container, { backgroundColor: COLORS.bg }]}>
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
                  {renderStatsCard("🍳", cookingStats.dishesThisWeek, "This Week")}
                  {renderStatsCard("🔥", `${streakData?.currentStreak ?? cookingStats.currentStreak}`, "Streak")}
                  {renderStatsCard("💰", `$${cookingStats.moneySavedThisWeek}`, "Saved")}
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
                  "This Week",
                  cookingStats.dishesThisWeek,
                  `↑ ${cookingStats.dishesThisWeek - cookingStats.dishesLastWeek} more than last week`,
                  "silverware-fork-knife",
                  COLORS.accent
                )}
                {renderActivityCard(
                  "Streak",
                  `${streakData?.currentStreak ?? cookingStats.currentStreak} days`,
                  "Keep it up! 2 more days for weekly badge",
                  "fire",
                  "#FF9800"
                )}
                {renderActivityCard(
                  "Money Saved",
                  `$${cookingStats.moneySavedThisWeek}`,
                  `$${cookingStats.moneySavedThisMonth} this month`,
                  "cash-multiple",
                  COLORS.primary
                )}
              </View>

              <Card style={styles.cuisinesCard}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cuisinesTitle}>Top Cuisines This Month</Text>
                  <View style={styles.cuisinesRow}>
                    {cookingStats.topCuisines.map((cuisine, index) => (
                      <View key={index} style={styles.cuisineItem}>
                        <Text style={styles.cuisineFlag}>{cuisine.flag}</Text>
                        <Text variant="bodySmall" style={styles.cuisineName}>{cuisine.name}</Text>
                        <Text variant="bodySmall" style={[styles.cuisineCount, { color: COLORS.primary }]}>
                          {cuisine.count}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Card.Content>
              </Card>
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

            {/* Pantry & Staples */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text variant="titleLarge" style={[styles.sectionTitle, { color: COLORS.primary }]}>
                    My Pantry & Staples
                  </Text>
                  <Text variant="bodySmall" style={[styles.sectionSubtitle, { color: COLORS.textMuted }]}>
                    Mark ingredients you usually have at home
                  </Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <MaterialCommunityIcons name="plus-circle" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.pantryGrid}>
                {pantryItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.pantryItem,
                      item.inPantry && { backgroundColor: COLORS.primary + "20" },
                    ]}
                  >
                    <Text style={styles.pantryIcon}>{item.icon}</Text>
                    <Text variant="bodySmall" style={styles.pantryName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    {item.inPantry && (
                      <View style={[styles.checkmark, { backgroundColor: COLORS.primary }]}>
                        <MaterialCommunityIcons name="check" size={12} color="#FFF" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <Card style={styles.pantryInfoCard}>
                <Card.Content>
                  <View style={styles.pantryInfoRow}>
                    <MaterialCommunityIcons name="information-outline" size={20} color={COLORS.primary} />
                    <Text variant="bodySmall" style={styles.pantryInfoText}>
                      Having these items helps us suggest recipes that cost less and use what you already have.
                    </Text>
                  </View>
                  <Text variant="bodySmall" style={[styles.pantryStats, { color: COLORS.primary }]}>
                    12 recipes available with your pantry items
                  </Text>
                </Card.Content>
              </Card>
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

            {/* Social Layer */}
            <View style={styles.section}>
              <Text variant="titleLarge" style={[styles.sectionTitle, { color: COLORS.primary }]}>
                Social
              </Text>

              <Card style={styles.socialStatsCard}>
                <Card.Content>
                  <View style={styles.socialStatsRow}>
                    <TouchableOpacity style={styles.socialStatItem}>
                      <Text style={[styles.socialStatValue, { color: COLORS.primary }]}>{socialData.friends}</Text>
                      <Text variant="bodySmall" style={styles.socialStatLabel}>Friends</Text>
                    </TouchableOpacity>
                    <View style={styles.socialStatDivider} />
                    <TouchableOpacity style={styles.socialStatItem}>
                      <Text style={[styles.socialStatValue, { color: COLORS.primary }]}>{socialData.followers}</Text>
                      <Text variant="bodySmall" style={styles.socialStatLabel}>Followers</Text>
                    </TouchableOpacity>
                    <View style={styles.socialStatDivider} />
                    <TouchableOpacity style={styles.socialStatItem}>
                      <Text style={[styles.socialStatValue, { color: COLORS.primary }]}>{socialData.following}</Text>
                      <Text variant="bodySmall" style={styles.socialStatLabel}>Following</Text>
                    </TouchableOpacity>
                    <View style={styles.socialStatDivider} />
                    <TouchableOpacity style={styles.socialStatItem}>
                      <Text style={[styles.socialStatValue, { color: COLORS.primary }]}>{socialData.communities}</Text>
                      <Text variant="bodySmall" style={styles.socialStatLabel}>Communities</Text>
                    </TouchableOpacity>
                  </View>
                </Card.Content>
              </Card>

              <Card style={styles.activityFeedCard}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.activityFeedTitle}>Recent Activity</Text>
                  {socialData.recentActivity.map((activity, index) => (
                    <View key={index} style={styles.activityFeedItem}>
                      <View style={styles.activityFeedAvatar}>
                        <MaterialCommunityIcons
                          name={activity.type === "friend" ? "account" : "account-group"}
                          size={20}
                          color={COLORS.primary}
                        />
                      </View>
                      <View style={styles.activityFeedContent}>
                        <Text variant="bodyMedium" style={{ color: COLORS.textPrimary }}>
                          <Text style={{ fontWeight: "600" }}>{activity.name}</Text> {activity.action}
                        </Text>
                        <Text variant="bodySmall" style={[styles.activityFeedTime, { color: COLORS.textMuted }]}>
                          {activity.time}
                        </Text>
                      </View>
                    </View>
                  ))}
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
  // Activity Dashboard
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
  cuisinesCard: {
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
  cuisinesTitle: {
    fontWeight: "600",
    marginBottom: 12,
    color: COLORS.textPrimary,
  },
  cuisinesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cuisineItem: {
    alignItems: "center",
  },
  cuisineFlag: {
    fontSize: 32,
    marginBottom: 4,
  },
  cuisineName: {
    marginBottom: 2,
    color: COLORS.textPrimary,
  },
  cuisineCount: {
    fontWeight: "600",
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
  // Pantry
  pantryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  pantryItem: {
    width: (width - 56) / 3,
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    position: "relative",
  },
  pantryIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  pantryName: {
    textAlign: "center",
    fontSize: 11,
    color: COLORS.textPrimary,
  },
  checkmark: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pantryInfoCard: {
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 1,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  pantryInfoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  pantryInfoText: {
    flex: 1,
    marginLeft: 8,
    lineHeight: 18,
    color: COLORS.textPrimary,
  },
  pantryStats: {
    fontWeight: "600",
    marginTop: 4,
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
  // Social
  socialStatsCard: {
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 2,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  socialStatsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  socialStatItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  socialStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.borderUnfocused,
  },
  socialStatValue: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  socialStatLabel: {
    opacity: 0.7,
    color: COLORS.textPrimary,
  },
  activityFeedCard: {
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  activityFeedTitle: {
    fontWeight: "600",
    marginBottom: 12,
    color: COLORS.textPrimary,
  },
  activityFeedItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  activityFeedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityFeedContent: {
    flex: 1,
  },
  activityFeedTime: {
    marginTop: 4,
    fontSize: 12,
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
