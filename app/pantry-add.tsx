import { COLORS } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import {
  addToPantry,
  getUserPantry,
  isIngredientInPantry,
  removeFromPantry,
} from "@/lib/pantry";
import { normalizeIngredientKey } from "@/data/storeInventory";
import { Pantry } from "@/types/pantry";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Chip, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ALL_INGREDIENT_OPTIONS: string[] = [
  "Chicken breast",
  "Chicken thighs",
  "Ground beef",
  "Steak",
  "Pork chops",
  "Salmon fillet",
  "White fish",
  "Shrimp",
  "Eggs",
  "Milk",
  "Greek yogurt",
  "Cheddar cheese",
  "Mozzarella cheese",
  "Parmesan cheese",
  "Butter",
  "Olive oil",
  "Canola oil",
  "Rice",
  "White rice",
  "Brown rice",
  "Quinoa",
  "Pasta",
  "Spaghetti",
  "Bread",
  "Tortillas",
  "Potatoes",
  "Sweet potatoes",
  "Onions",
  "Garlic",
  "Bell peppers",
  "Carrots",
  "Broccoli",
  "Spinach",
  "Lettuce",
  "Tomatoes",
  "Cucumber",
  "Mushrooms",
  "Zucchini",
  "Lemon",
  "Lime",
  "Salt",
  "Pepper",
  "Paprika",
  "Chili powder",
  "Cumin",
  "Oregano",
  "Basil",
  "Soy sauce",
  "Tomato sauce",
  "Canned tomatoes",
  "Black beans",
  "Chickpeas",
  "Kidney beans",
  "Corn",
  "Frozen mixed vegetables",
  "Honey",
  "Sugar",
  "Flour",
  "Baking powder",
  "Vanilla extract",
];

export default function PantryAddScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [pantry, setPantry] = useState<Pantry>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPantry = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const userPantry = await getUserPantry(user.uid);
        setPantry(Array.isArray(userPantry) ? userPantry : []);
      } catch (error) {
        console.error("Failed to load pantry on add screen:", error);
        setPantry([]);
      } finally {
        setLoading(false);
      }
    };

    loadPantry();
  }, [user]);

  const filteredIngredients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return ALL_INGREDIENT_OPTIONS;
    return ALL_INGREDIENT_OPTIONS.filter((label) =>
      label.toLowerCase().includes(query)
    );
  }, [search]);

  const handleToggleIngredient = async (label: string) => {
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
        console.error("Failed to remove ingredient from pantry:", error);
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
        console.error("Failed to add ingredient to pantry:", error);
      }
    }
  };

  const handleAddFromSearch = async () => {
    if (!user) return;

    const trimmed = search.trim();
    if (!trimmed) return;

    const ingredientKey = normalizeIngredientKey(trimmed);
    if (isIngredientInPantry(pantry, ingredientKey)) {
      return;
    }

    const newItem = {
      ingredientKey,
      label: trimmed,
      addedAt: new Date().toISOString(),
    };

    // Optimistic add
    setPantry((prev) => [...prev, newItem]);

    try {
      await addToPantry(user.uid, newItem);
    } catch (error) {
      console.error("Failed to add searched ingredient to pantry:", error);
    }
  };

  return (
    <View style={styles.fullScreen}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
          <Text
            variant="titleMedium"
            style={[styles.headerTitle, { color: COLORS.textPrimary }]}
          >
            Add pantry ingredients
          </Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              mode="outlined"
              placeholder="Search any ingredient you have"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              textColor="#000000"
              underlineColor="transparent"
              outlineColor={COLORS.borderUnfocused}
              activeOutlineColor={COLORS.primary}
              placeholderTextColor="#555555"
              left={
                <TextInput.Icon icon="magnify" color={COLORS.textMuted} />
              }
            />

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.chipsContainer}
              showsVerticalScrollIndicator={false}
            >
              {filteredIngredients.map((label) => {
                const key = normalizeIngredientKey(label);
                const selected = isIngredientInPantry(pantry, key);
                return (
                  <Chip
                    key={key}
                    mode={selected ? "flat" : "outlined"}
                    selected={selected}
                    style={[
                      styles.ingredientChip,
                      selected && styles.ingredientChipSelected,
                    ]}
                    textStyle={{
                      color: COLORS.textPrimary,
                    }}
                    onPress={() => handleToggleIngredient(label)}
                  >
                    {label}
                  </Chip>
                );
              })}

              {filteredIngredients.length === 0 && !loading && (
                <View style={styles.emptyState}>
                  <Text
                    variant="bodySmall"
                    style={{ color: COLORS.textMuted, marginBottom: 8 }}
                  >
                    No matches found.
                  </Text>
                  {!!search.trim() && (
                    <Chip
                      mode="flat"
                      style={styles.addFromSearchChip}
                      textStyle={{ color: COLORS.textPrimary }}
                      onPress={handleAddFromSearch}
                    >
                      Add “{search.trim()}” to pantry
                    </Chip>
                  )}
                </View>
              )}
            </ScrollView>
          </Card.Content>
        </Card>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  headerTitle: {
    fontWeight: "600",
  },
  card: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderWidth: 1,
    borderColor: COLORS.borderUnfocused,
  },
  searchInput: {
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    flex: 1,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingBottom: 20,
    marginTop: 8,
  },
  ingredientChip: {
    borderRadius: 999,
    marginRight: 4,
    marginBottom: 8,
    borderColor: COLORS.borderUnfocused,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  ingredientChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  emptyState: {
    marginTop: 16,
    alignItems: "flex-start",
  },
  addFromSearchChip: {
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
});


