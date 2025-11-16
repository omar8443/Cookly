// Recipe types for Cookly app
export type FilterType =
  | "Diet"
  | "High Protein"
  | "Student-Friendly"
  | "Gourmet";

export type CostLevel = "$" | "$$" | "$$$";

export type Difficulty = "Easy" | "Medium" | "Hard";

// Original Recipe type used across search, categories, etc.
export interface Recipe {
  id: string;
  title: string;
  imageUrl?: string;
  category: string;
  description: string;
  cookTime: string; // Display format like "15 min"
  prepTime: number; // In minutes
  totalTime: number; // In minutes (prep + cook)
  servings: number;
  difficulty: Difficulty;
  cost: CostLevel;
  filters: FilterType[];
  // Detailed fields for recipe detail page
  ingredients: string[];
  instructions: string[];
  // Macros for detail page nutrition section
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface SearchFilters {
  Diet: boolean;
  "High Protein": boolean;
  "Student-Friendly": boolean;
  Gourmet: boolean;
}

export type SearchState = "idle" | "searching" | "results" | "empty" | "error";

