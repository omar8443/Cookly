export interface PantryItem {
  ingredientKey: string; // normalized key (e.g. "egg", "milk", "cheddar cheese")
  label: string; // user-friendly label, e.g. "Eggs"
  addedAt?: string; // ISO timestamp for future features
}

export type Pantry = PantryItem[];


