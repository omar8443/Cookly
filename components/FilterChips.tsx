import React from "react";
import { View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { SearchFilters } from "@/types/recipe";
import { COLORS } from "@/constants/colors";

interface FilterChipsProps {
  filters: SearchFilters;
  onFilterToggle: (filter: keyof SearchFilters) => void;
}

const FILTER_LABELS: (keyof SearchFilters)[] = [
  "Diet",
  "High Protein",
  "Student-Friendly",
  "Gourmet",
];

export default function FilterChips({ filters, onFilterToggle }: FilterChipsProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {FILTER_LABELS.map((filter) => {
        const isActive = filters[filter];
        return (
          <Chip
            key={filter}
            selected={isActive}
            onPress={() => onFilterToggle(filter)}
            style={[
              styles.chip,
              isActive && { backgroundColor: COLORS.primary + "40" },
            ]}
            textStyle={[
              styles.chipText,
              isActive && { color: COLORS.primary },
            ]}
            mode={isActive ? "flat" : "outlined"}
          >
            {filter}
          </Chip>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 20,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    borderColor: COLORS.borderUnfocused,
  },
  chipText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
});

