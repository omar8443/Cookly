import { STORES } from "@/data/stores";
import { STORE_PRODUCTS, normalizeIngredientKey } from "@/data/storeInventory";
import { Pantry, isIngredientInPantry } from "@/lib/pantry";
import {
  IngredientPriceBreakdownItem,
  StorePriceEstimate,
  StoreProduct,
  StoreId,
} from "@/types/store";
import { Recipe } from "@/types/recipe";

function getDefaultPriceForStore(storeId: StoreId): number {
  switch (storeId) {
    case "provigo":
      return 3.0;
    case "maxi":
      return 2.5;
    case "iga":
      return 2.75;
    default:
      return 2.5;
  }
}

function findStoreProduct(
  storeId: StoreId,
  normalizedKey: string
): StoreProduct | undefined {
  return STORE_PRODUCTS.find(
    (p) => p.storeId === storeId && p.ingredientKey === normalizedKey
  );
}

export function getStorePriceEstimatesForRecipe(
  recipe: Recipe,
  pantry?: Pantry
): StorePriceEstimate[] {
  if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) {
    return [];
  }

  const estimates: StorePriceEstimate[] = STORES.map((store) => {
    const ingredientLabelsToBuy = recipe.ingredients.filter((ingredientLabel) => {
      const normalizedKey = normalizeIngredientKey(ingredientLabel);
      // If we have a pantry, skip ingredients that are already there
      return !pantry || !isIngredientInPantry(pantry, normalizedKey);
    });

    const items: IngredientPriceBreakdownItem[] = ingredientLabelsToBuy.map(
      (ingredientLabel) => {
        const normalizedKey = normalizeIngredientKey(ingredientLabel);
        const product =
          findStoreProduct(store.id, normalizedKey) ||
          findStoreProduct(store.id, ingredientLabel.toLowerCase().trim());

        if (product) {
          return {
            ingredientLabel,
            productName: product.productName,
            unitSize: product.unitSize,
            unitPrice: product.unitPrice,
          };
        }

        // Fallback generic product
        const fallbackPrice = getDefaultPriceForStore(store.id);
        return {
          ingredientLabel,
          productName: ingredientLabel,
          unitSize: "1 unit",
          unitPrice: fallbackPrice,
        };
      }
    );

    const totalPrice = items.reduce(
      (sum, item) => sum + item.unitPrice,
      0
    );

    return {
      store,
      totalPrice,
      items,
    };
  });

  if (estimates.length === 0) {
    return [];
  }

  // Mark cheapest
  let cheapestIndex = 0;
  estimates.forEach((estimate, index) => {
    if (estimate.totalPrice < estimates[cheapestIndex].totalPrice) {
      cheapestIndex = index;
    }
  });

  const estimatesWithCheapest = estimates.map((estimate, index) => ({
    ...estimate,
    isCheapest: index === cheapestIndex,
  }));

  // Sort by total price ascending
  return estimatesWithCheapest.sort(
    (a, b) => a.totalPrice - b.totalPrice
  );
}


