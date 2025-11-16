import BottomNav from "@/components/BottomNav";
import RecipeCard from "@/components/RecipeCard";
import { useAuth } from "@/contexts/AuthContext";
import { getUserStreak, UserStreakData } from "@/lib/streaks";
import { Pantry } from "@/types/pantry";
import {
  addToPantry,
  getUserPantry,
  isIngredientInPantry,
  removeFromPantry,
} from "@/lib/pantry";
import { normalizeIngredientKey } from "@/data/storeInventory";
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
import {
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  List,
  Text,
  useTheme,
} from "react-native-paper";
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

// Past orders system placeholder: no past orders yet
// In the future, this can be wired up to real order history from the backend.
const pastOrders: Array<{
  id: string;
  title: string;
  imageUrl?: string;
  date?: string;
}> = [];

// Very small curated list of common pantry staples for quick toggling
const BASIC_PANTRY_INGREDIENTS: string[] = [
  "Eggs",
  "Milk",
  "Olive oil",
  "Rice",
  "Pasta",
  "Salt",
  "Pepper",
  "Butter",
  "Onions",
  "Garlic",
];

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { user, userData, loading, signOut } = useAuth();
  const [streakData, setStreakData] = useState<UserStreakData | null>(null);
  const [pantry, setPantry] = useState<Pantry>([]);
  const [pantryLoading, setPantryLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!user) return;

        const [streak, userPantry] = await Promise.all([
          getUserStreak(user.uid),
          (async () => {
            setPantryLoading(true);
            try {
              return await getUserPantry(user.uid);
            } finally {
              setPantryLoading(false);
            }
          })(),
        ]);

        setStreakData(streak);
        setPantry(Array.isArray(userPantry) ? userPantry : []);
      } catch (error) {
        console.error("Failed to load profile data:", error);
        setPantry([]);
        setPantryLoading(false);
      }
    };

    loadData();
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

  const handleRemovePantryItem = async (ingredientKey: string) => {
    if (!user) return;

    // Optimistic update
    setPantry((prev) => prev.filter((item) => item.ingredientKey !== ingredientKey));
    try {
      await removeFromPantry(user.uid, ingredientKey);
    } catch (error) {
      console.error("Failed to remove pantry item:", error);
      // Best-effort: reload pantry on failure in the future if needed
    }
  };

  const handleToggleBasicPantryItem = async (label: string) => {
    if (!user) return;

    const ingredientKey = normalizeIngredientKey(label);
    const alreadyInPantry = isIngredientInPantry(pantry, ingredientKey);

    if (alreadyInPantry) {
      // Optimistic remove
      setPantry((prev) =>
        prev.filter((item) => item.ingredientKey !== ingredientKey)
      );
      try {
        await removeFromPantry(user.uid, ingredientKey);
      } catch (error) {
        console.error("Failed to remove basic pantry item:", error);
      }
    } else {
      const newItem = {
        ingredientKey,
        label,
        addedAt: new Date().toISOString(),
      };
      // Optimistic add
      setPantry((prev) => [...prev, newItem]);
      try {
        await addToPantry(user.uid, newItem);
      } catch (error) {
        console.error("Failed to add basic pantry item:", error);
      }
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
  const defaultServingSize = (userData as any)?.defaultServingSize || "Not set";

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
            {/* Profile Header - Uber Eats style */}
            <View style={styles.headerRow}>
              <View style={styles.headerTitleBlock}>
                <Text variant="labelSmall" style={styles.headerLabel}>
                  Profile
                </Text>
                <Text variant="headlineMedium" style={styles.headerTitle}>
                  {displayName}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.headerAvatarTouch}
                onPress={() => router.push("/edit-profile" as any)}
              >
                <View style={[styles.headerAvatarContainer, { backgroundColor: COLORS.primary + "20" }]}>
                  {photoURL ? (
                    <Image source={{ uri: photoURL }} style={styles.headerAvatarImage} />
                  ) : (
                    <Text style={[styles.headerAvatarText, { color: COLORS.primary }]}>
                      {displayName.charAt(0).toUpperCase()}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <Card style={styles.profileHeaderCard}>
              <Card.Content style={styles.profileHeaderContent}>
                <View style={styles.headerInfoRow}>
                  <View style={styles.headerInfoMain}>
                    <View style={styles.locationRow}>
                      <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.textMuted} />
                      <Text variant="bodyMedium" style={[styles.location, { color: COLORS.textMuted }]}>
                        {location === "Not set" ? "Add your address" : location}
                      </Text>
                    </View>
                    <Text
                      variant="bodySmall"
                      style={[styles.addressHint, { color: COLORS.textMuted }]}
                    >
                      {location === "Not set"
                        ? "Add your address so we can find supermarkets near you."
                        : "We’ll use this address to find supermarkets near you."}
                    </Text>

                    {bio && (
                      <Text variant="bodySmall" style={[styles.bio, { color: COLORS.textMuted }]}>
                        {bio}
                      </Text>
                    )}

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.tagsContainer}
                    >
                      {dietaryTags.map((tag: string, index: number) => (
                        <Chip
                          key={index}
                          mode="flat"
                          style={[styles.tagChip, { backgroundColor: COLORS.primary + "20" }]}
                          textStyle={styles.tagText}
                        >
                          {tag}
                        </Chip>
                      ))}
                      <Chip
                        mode="flat"
                        style={[styles.tagChip, { backgroundColor: COLORS.primary + "20" }]}
                        textStyle={styles.tagText}
                      >
                        {budgetLabel}
                      </Chip>
                    </ScrollView>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Cooking Activity Dashboard */}
            <View style={[styles.section, styles.sectionTightBelow]}>
              <Text variant="titleLarge" style={[styles.sectionTitle, { color: COLORS.primary }]}>
                Cooking Activity
              </Text>

              <View style={styles.activityGrid}>
                {renderActivityCard(
                  "Streak",
                  (() => {
                    const days = streakData?.currentStreak ?? cookingStats.currentStreak;
                    return `${days} day${days === 1 ? "" : "s"}`;
                  })(),
                  "Cook consistently to keep your streak going.",
                  "fire",
                  "#FF9800"
                )}
              </View>
            </View>

            {/* Past Orders Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderTight}>
                <Text variant="titleLarge" style={[styles.sectionTitleTight, { color: COLORS.primary }]}>
                  Past Orders
                </Text>
              </View>

              {pastOrders.length > 0 ? (
                <View style={styles.recipesGrid}>
                  {pastOrders.map((order) => (
                    <View key={order.id} style={[styles.recipeCard, { width: CARD_WIDTH }]}>
                      <RecipeCard
                        id={order.id}
                        title={order.title}
                        imageUrl={order.imageUrl}
                        onPress={() => handleRecipePress(order.id)}
                      />
                      <Text variant="bodySmall" style={styles.recipeDate}>
                        {order.date}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                  <Card style={styles.emptyCard}>
                  <Card.Content style={styles.emptyContent}>
                    <MaterialCommunityIcons name="book-outline" size={48} color={COLORS.textMuted} />
                    <Text variant="bodyMedium" style={styles.emptyText}>
                      No past orders yet
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
                      <View style={styles.preferenceValueContainer}>
                        <Chip
                          mode={budgetLabel === "Not set" ? "outlined" : "flat"}
                          style={[
                            styles.preferenceChip,
                            budgetLabel === "Not set" && {
                              backgroundColor: "transparent",
                              borderColor: "#FFFFFF",
                            },
                          ]}
                          textStyle={{
                            color: budgetLabel === "Not set" ? "#FFFFFF" : COLORS.textPrimary,
                          }}
                        >
                          {budgetLabel}
                        </Chip>
                      </View>
                    </View>
                  </View>

                  <Divider style={styles.preferenceDivider} />

                  <View style={styles.preferenceRow}>
                    <MaterialCommunityIcons name="account-group" size={20} color={COLORS.primary} />
                    <View style={styles.preferenceContent}>
                      <Text variant="titleSmall" style={{ color: COLORS.textPrimary }}>Default Serving Size</Text>
                      <View style={styles.preferenceValueContainer}>
                        <Chip
                          mode={defaultServingSize === "Not set" ? "outlined" : "flat"}
                          style={[
                            styles.preferenceChip,
                            defaultServingSize === "Not set" && {
                              backgroundColor: "transparent",
                              borderColor: "#FFFFFF",
                            },
                          ]}
                          textStyle={{
                            color:
                              defaultServingSize === "Not set"
                                ? "#FFFFFF"
                                : COLORS.textPrimary,
                          }}
                        >
                          {defaultServingSize}
                        </Chip>
                      </View>
                    </View>
                  </View>

                </Card.Content>
              </Card>
            </View>

            {/* Pantry */}
            <View style={styles.section}>
              <Text
                variant="titleLarge"
                style={[styles.sectionTitle, { color: COLORS.primary }]}
              >
                Pantry
              </Text>

              <Card style={styles.preferencesCard}>
                <Card.Content>
                  {!user ? (
                    <Text
                      variant="bodyMedium"
                      style={{ color: COLORS.textMuted }}
                    >
                      Sign in to manage your common pantry staples.
                    </Text>
                  ) : (
                    <>
                      {pantryLoading && (
                        <View style={styles.pantryLoadingRow}>
                          <ActivityIndicator size="small" color={COLORS.primary} />
                          <Text
                            variant="bodySmall"
                            style={[
                              styles.pantryLoadingText,
                              { color: COLORS.textMuted },
                            ]}
                          >
                            Loading your pantry...
                          </Text>
                        </View>
                      )}

                      {/* Quick add/remove for common staples */}
                      {!pantryLoading && (
                        <View style={{ marginTop: 12 }}>
                          <View style={styles.pantryHeaderRow}>
                            <Text
                              variant="bodySmall"
                              style={{ color: COLORS.textMuted }}
                            >
                              Common staples
                            </Text>
                            <IconButton
                              icon="plus"
                              size={18}
                              iconColor={COLORS.textMuted}
                              style={styles.pantryAddButton}
                              onPress={() => router.push("/pantry-add" as any)}
                            />
                          </View>
                          <View style={styles.pantryChipsRow}>
                            {BASIC_PANTRY_INGREDIENTS.map((label) => {
                              const key = normalizeIngredientKey(label);
                              const selected = isIngredientInPantry(pantry, key);
                              return (
                                <Chip
                                  key={key}
                                  mode={selected ? "flat" : "outlined"}
                                  selected={selected}
                                  style={styles.pantryChip}
                                  textStyle={{
                                    color: "#000000",
                                  }}
                                  onPress={() => handleToggleBasicPantryItem(label)}
                                >
                                  {label}
                                </Chip>
                              );
                            })}
                          </View>
                        </View>
                      )}
                    </>
                  )}
                </Card.Content>
              </Card>
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
  // Profile Header (Uber Eats style)
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerTitleBlock: {
    flexDirection: "column",
  },
  headerLabel: {
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 1,
    opacity: 0.7,
    color: COLORS.textMuted,
  },
  headerTitle: {
    marginTop: 4,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  headerAvatarTouch: {
    padding: 2,
  },
  headerAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerAvatarText: {
    fontSize: 18,
    fontWeight: "700",
  },
  profileHeaderCard: {
    marginHorizontal: 20,
    marginTop: 16,
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
    paddingVertical: 18,
    paddingHorizontal: 16,
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
    marginTop: 12,
    marginBottom: 8,
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
  headerInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerInfoMain: {
    flex: 1,
    paddingRight: 16,
  },
  addressHint: {
    marginBottom: 8,
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
  sectionHeaderTight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
  },
  sectionTitleTight: {
    fontWeight: "600",
    marginBottom: 8,
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
  sectionTightBelow: {
    marginBottom: 20,
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
    marginTop: 0,
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
    paddingVertical: 16,
  },
  preferenceContent: {
    flex: 1,
    marginLeft: 14,
  },
  preferenceValueContainer: {
    marginTop: 8,
    alignItems: "flex-start",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 10,
  },
  preferenceChip: {
    marginTop: 6,
    marginRight: 10,
    marginBottom: 10,
  },
  preferenceDivider: {
    marginVertical: 4,
    backgroundColor: COLORS.borderUnfocused,
  },
  pantrySubtitle: {
    marginBottom: 8,
    textAlign: "center",
  },
  pantryLoadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pantryLoadingText: {
    marginLeft: 8,
  },
  pantryChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 10,
  },
  pantryChip: {
    marginTop: 6,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 999,
    paddingHorizontal: 6,
  },
  pantrySubtitle: {
    marginBottom: 8,
  },
  pantryLoadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pantryLoadingText: {
    marginLeft: 8,
  },
  pantryChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 10,
  },
  pantryChip: {
    marginTop: 6,
    marginRight: 10,
    marginBottom: 10,
  },
  pantryHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  pantryAddButton: {
    margin: 0,
  },
  customPantryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  customPantryInput: {
    flex: 1,
  },
  customPantryButton: {
    borderRadius: 999,
  },
  // Settings
  settingsDivider: {
    marginVertical: 12,
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
    marginTop: 32,
  },
  logoutButton: {
    borderRadius: 12,
  },
});
