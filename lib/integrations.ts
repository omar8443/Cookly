import * as Linking from "expo-linking";
import { Alert } from "react-native";
import { StorePriceEstimate } from "@/types/store";

function buildQueryFromEstimate(estimate: StorePriceEstimate): string {
  const ingredients = estimate.items
    .map((item) => item.ingredientLabel)
    .slice(0, 5)
    .join(", ");

  const params = new URLSearchParams({
    store: estimate.store.name,
    ingredients,
  });

  return params.toString();
}

export function openUberEatsForStore(estimate: StorePriceEstimate) {
  const query = buildQueryFromEstimate(estimate);
  const url = `https://www.ubereats.com/ca?${query}`;

  Alert.alert(
    "Opening Uber Eats",
    "This is a demo link. In a real integration, we’d deep-link into a store or pre-filled cart.",
    [
      {
        text: "Continue",
        onPress: () => {
          Linking.openURL(url).catch((err) => {
            console.error("Failed to open Uber Eats URL", err);
          });
        },
      },
      { text: "Cancel", style: "cancel" },
    ]
  );
}

export function openDoorDashForStore(estimate: StorePriceEstimate) {
  const query = buildQueryFromEstimate(estimate);
  const url = `https://www.doordash.com/en-CA?${query}`;

  Alert.alert(
    "Opening DoorDash",
    "This is a demo link. In a real integration, we’d deep-link into a store or pre-filled cart.",
    [
      {
        text: "Continue",
        onPress: () => {
          Linking.openURL(url).catch((err) => {
            console.error("Failed to open DoorDash URL", err);
          });
        },
      },
      { text: "Cancel", style: "cancel" },
    ]
  );
}


