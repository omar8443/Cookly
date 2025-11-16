export type StoreId = "provigo" | "maxi" | "iga";

export interface Store {
  id: StoreId;
  name: string;
  logoUrl?: string;
  accentColor?: string;
}

export interface StoreProduct {
  storeId: StoreId;
  ingredientKey: string;
  productName: string;
  unitPrice: number;
  unitSize: string;
}

export interface IngredientPriceBreakdownItem {
  ingredientLabel: string;
  productName: string;
  unitSize: string;
  unitPrice: number;
}

export interface StorePriceEstimate {
  store: Store;
  totalPrice: number;
  items: IngredientPriceBreakdownItem[];
  isCheapest?: boolean;
}


