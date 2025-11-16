import { StoreProduct } from "@/types/store";

export function normalizeIngredientKey(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[.,:;()\-_/]/g, "")
    .replace(/\s+/g, " ");
}

export const STORE_PRODUCTS: StoreProduct[] = [
  // Chicken breast
  {
    storeId: "provigo",
    ingredientKey: "chicken breast",
    productName: "Fresh Chicken Breast Fillets ~500 g",
    unitPrice: 8.99,
    unitSize: "500 g",
  },
  {
    storeId: "maxi",
    ingredientKey: "chicken breast",
    productName: "Maxi Boneless Chicken Breasts ~500 g",
    unitPrice: 7.99,
    unitSize: "500 g",
  },
  {
    storeId: "iga",
    ingredientKey: "chicken breast",
    productName: "IGA Fresh Chicken Breast ~500 g",
    unitPrice: 8.49,
    unitSize: "500 g",
  },

  // Eggs
  {
    storeId: "provigo",
    ingredientKey: "eggs",
    productName: "Large White Eggs (Dozen)",
    unitPrice: 4.49,
    unitSize: "12 eggs",
  },
  {
    storeId: "maxi",
    ingredientKey: "eggs",
    productName: "No Name Large White Eggs (Dozen)",
    unitPrice: 3.99,
    unitSize: "12 eggs",
  },
  {
    storeId: "iga",
    ingredientKey: "eggs",
    productName: "IGA Large White Eggs (Dozen)",
    unitPrice: 4.29,
    unitSize: "12 eggs",
  },

  // Milk
  {
    storeId: "provigo",
    ingredientKey: "milk",
    productName: "2% Milk 2L",
    unitPrice: 5.29,
    unitSize: "2 L",
  },
  {
    storeId: "maxi",
    ingredientKey: "milk",
    productName: "No Name 2% Milk 2L",
    unitPrice: 4.79,
    unitSize: "2 L",
  },
  {
    storeId: "iga",
    ingredientKey: "milk",
    productName: "IGA 2% Milk 2L",
    unitPrice: 5.09,
    unitSize: "2 L",
  },

  // Rice
  {
    storeId: "provigo",
    ingredientKey: "rice",
    productName: "Long Grain White Rice 900 g",
    unitPrice: 4.99,
    unitSize: "900 g",
  },
  {
    storeId: "maxi",
    ingredientKey: "rice",
    productName: "No Name Long Grain Rice 900 g",
    unitPrice: 3.99,
    unitSize: "900 g",
  },
  {
    storeId: "iga",
    ingredientKey: "rice",
    productName: "IGA Long Grain White Rice 900 g",
    unitPrice: 4.59,
    unitSize: "900 g",
  },

  // Pasta
  {
    storeId: "provigo",
    ingredientKey: "pasta",
    productName: "Spaghetti Pasta 500 g",
    unitPrice: 2.49,
    unitSize: "500 g",
  },
  {
    storeId: "maxi",
    ingredientKey: "pasta",
    productName: "No Name Spaghetti 500 g",
    unitPrice: 1.79,
    unitSize: "500 g",
  },
  {
    storeId: "iga",
    ingredientKey: "pasta",
    productName: "IGA Spaghetti 500 g",
    unitPrice: 2.19,
    unitSize: "500 g",
  },

  // Canned tomatoes
  {
    storeId: "provigo",
    ingredientKey: "canned tomatoes",
    productName: "Diced Tomatoes 796 mL",
    unitPrice: 2.99,
    unitSize: "796 mL",
  },
  {
    storeId: "maxi",
    ingredientKey: "canned tomatoes",
    productName: "No Name Diced Tomatoes 796 mL",
    unitPrice: 1.99,
    unitSize: "796 mL",
  },
  {
    storeId: "iga",
    ingredientKey: "canned tomatoes",
    productName: "IGA Diced Tomatoes 796 mL",
    unitPrice: 2.49,
    unitSize: "796 mL",
  },

  // Cheese
  {
    storeId: "provigo",
    ingredientKey: "mozzarella cheese",
    productName: "Kirkland Mozzarella Shredded Cheese 500 g",
    unitPrice: 7.0,
    unitSize: "500 g",
  },
  {
    storeId: "maxi",
    ingredientKey: "mozzarella cheese",
    productName: "No Name Mozzarella Shredded Cheese 500 g",
    unitPrice: 6.5,
    unitSize: "500 g",
  },
  {
    storeId: "iga",
    ingredientKey: "mozzarella cheese",
    productName: "IGA Mozzarella Cheese 500 g",
    unitPrice: 6.75,
    unitSize: "500 g",
  },

  // Olive oil
  {
    storeId: "provigo",
    ingredientKey: "olive oil",
    productName: "Extra Virgin Olive Oil 1L",
    unitPrice: 11.99,
    unitSize: "1 L",
  },
  {
    storeId: "maxi",
    ingredientKey: "olive oil",
    productName: "No Name Olive Oil 1L",
    unitPrice: 9.99,
    unitSize: "1 L",
  },
  {
    storeId: "iga",
    ingredientKey: "olive oil",
    productName: "IGA Extra Virgin Olive Oil 1L",
    unitPrice: 10.99,
    unitSize: "1 L",
  },
];


