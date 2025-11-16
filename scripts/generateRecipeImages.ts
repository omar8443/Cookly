import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Recipe, recipes } from "../data/recipes";

dotenv.config();

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

if (!PEXELS_API_KEY) {
  console.error("Missing PEXELS_API_KEY in environment. Please set it in your .env file.");
  process.exit(1);
}

interface PexelsPhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

interface PexelsPhoto {
  id: number;
  url: string;
  src: PexelsPhotoSrc;
}

interface PexelsSearchResponse {
  photos: PexelsPhoto[];
}

async function fetchRecipeImage(recipeName: string): Promise<string | null> {
  const query = encodeURIComponent(recipeName);
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;

  const response = await fetch(url, {
    headers: {
      Authorization: PEXELS_API_KEY as string,
    },
  });

  if (!response.ok) {
    console.warn(`Pexels request failed for "${recipeName}" with status ${response.status}`);
    return null;
  }

  const data = (await response.json()) as PexelsSearchResponse;
  const photo = data.photos?.[0];

  if (!photo || !photo.src) {
    console.warn(`No photo found for "${recipeName}"`);
    return null;
  }

  // Prefer large, fall back to medium
  return photo.src.large || photo.src.medium || null;
}

async function main() {
  console.log(`Generating image URLs for ${recipes.length} recipes using Pexels...`);

  const updatedRecipes: Recipe[] = [];

  for (const recipe of recipes) {
    const currentUrl = recipe.imageUrl;

    if (currentUrl && currentUrl.trim().length > 0) {
      // Keep existing URL if already set
      updatedRecipes.push({ ...recipe, imageUrl: currentUrl });
      continue;
    }

    console.log(`Fetching image for: ${recipe.name}`);
    try {
      const imageUrl = await fetchRecipeImage(recipe.name);
      if (!imageUrl) {
        updatedRecipes.push({ ...recipe, imageUrl: "" });
      } else {
        updatedRecipes.push({ ...recipe, imageUrl });
      }
    } catch (error) {
      console.error(`Error fetching image for "${recipe.name}":`, error);
      updatedRecipes.push({ ...recipe, imageUrl: "" });
    }
  }

  const outputPath = path.resolve(__dirname, "../data/recipes.ts");

  const fileHeader = `/**
 * Recipe Data File
 * 
 * AUTO-GENERATED IMAGE URLs
 * This file has been updated by scripts/generateRecipeImages.ts
 * to include stable imageUrl fields for each recipe using the Pexels API.
 */

// Static recipe type used for macros-based meals feature
export type Recipe = {
  id: number;
  name: string;
  category: string; // e.g. "Chicken", "Beef", "Vegetarian"
  cuisine: string;
  timeMinutes: number; // approximate total cook time
  imageUrl?: string; // optional photo URL for the recipe card
  ingredients: string[];
  instructions?: string[]; // step-by-step cooking instructions (optional for older entries)
  macros: {
    calories: number; // per serving (approx)
    protein: number;  // g
    carbs: number;    // g
    fat: number;      // g
  };
};

export const recipes: Recipe[] = [
`;

  const fileFooter = `];

// --- Compatibility helpers for existing search & category screens ---
import type { Recipe as LegacyRecipe } from "@/types/recipe";
import type { Recipe as StaticRecipe } from "./recipes";

const toLegacyRecipe = (recipe: StaticRecipe): LegacyRecipe => ({
  id: String(recipe.id),
  title: recipe.name,
  imageUrl: recipe.imageUrl,
  category: recipe.category,
  description: \`\${recipe.cuisine} · \${recipe.category}\`,
  cookTime: \`\${recipe.timeMinutes} min\`,
  prepTime: 0,
  totalTime: recipe.timeMinutes,
  servings: 1,
  difficulty: "Easy",
  cost: "$",
  filters: [],
  ingredients: recipe.ingredients,
  instructions: recipe.instructions ?? [],
});

export const getAllRecipes = (): LegacyRecipe[] => recipes.map(toLegacyRecipe);

export const getRecipesByCategory = (category: string): LegacyRecipe[] =>
  getAllRecipes().filter((r) => r.category === category);

export const getCategories = (): string[] =>
  Array.from(new Set(recipes.map((r) => r.category))).sort();
`;

  const recipeEntries = updatedRecipes
    .map((recipe) => {
      const ingredients = recipe.ingredients
        .map((i) => `      "${i.replace(/"/g, '\\"')}",`)
        .join("\n");

      const instructions = recipe.instructions && recipe.instructions.length > 0
        ? `,\n    instructions: [\n${recipe.instructions
            .map((step) => `      "${step.replace(/"/g, '\\"')}",`)
            .join("\n")}\n    ]`
        : "";

      const imageLine =
        recipe.imageUrl && recipe.imageUrl.trim().length > 0
          ? `\n    imageUrl: "${recipe.imageUrl.replace(/"/g, '\\"')}",`
          : "";

      return `  {
    id: ${recipe.id},
    name: "${recipe.name.replace(/"/g, '\\"')}",
    category: "${recipe.category.replace(/"/g, '\\"')}",
    cuisine: "${recipe.cuisine.replace(/"/g, '\\"')}",
    timeMinutes: ${recipe.timeMinutes},${imageLine}
    ingredients: [
${ingredients}
    ],
    macros: { calories: ${recipe.macros.calories}, protein: ${recipe.macros.protein}, carbs: ${recipe.macros.carbs}, fat: ${recipe.macros.fat} }${instructions}
  }`;
    })
    .join(",\n\n");

  const fileContents = `${fileHeader}${recipeEntries}\n${fileFooter}`;

  fs.writeFileSync(outputPath, fileContents, { encoding: "utf8" });

  console.log(`Updated recipes written to ${outputPath}`);
}

// Run the script (only when executed directly)
if (require.main === module) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  main();
}


