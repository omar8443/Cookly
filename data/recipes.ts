/**
 * Recipe Data File
 * 
 * This file contains static recipe data for the Cookly app.
 * Currently, recipes are stored as a static TypeScript array in the frontend.
 * 
 * Future Database Migration:
 * When you're ready to move to a database (Firestore, Supabase, Postgres, etc.):
 * 1. Use this recipes array as seed data
 * 2. Create a migration script that reads this file and inserts recipes into your DB
 * 3. Update the getRecipes(), getRecipeById(), and getCategories() functions to query the database instead
 * 4. Keep this file for reference or remove it after migration
 * 
 * Example migration approach:
 * - Firestore: Use batch writes to insert all recipes
 * - Supabase: Use SQL INSERT statements or the Supabase client
 * - Postgres: Use a migration script with INSERT statements
 */

// Static recipe type used for macros-based meals feature
export type Recipe = {
  id: number;
  name: string;
  category: string; // e.g. "Chicken", "Beef", "Vegetarian"
  cuisine: string;
  timeMinutes: number; // approximate total cook time
  ingredients: string[];
  instructions?: string[]; // step-by-step cooking instructions (optional for older entries)
  macros: {
    calories: number; // per serving (approx)
    protein: number;  // g
    carbs: number;    // g
    fat: number;      // g
  };
};

// Static recipes array (100 items)
export const recipes: Recipe[] = [
  // ---------- CHICKEN ----------
  {
    id: 1,
    name: "Grilled Chicken with Rice & Broccoli",
    category: "Chicken",
    cuisine: "American",
    timeMinutes: 25,
    ingredients: [
      "200 g chicken breast",
      "1 cup cooked white rice",
      "1 cup broccoli florets",
      "1 tbsp olive oil",
      "1 tsp garlic powder",
      "Salt and pepper"
    ],
    macros: { calories: 550, protein: 45, carbs: 55, fat: 15 },
  },
  {
    id: 2,
    name: "Chicken Stir-Fry with Vegetables",
    category: "Chicken",
    cuisine: "Asian",
    timeMinutes: 20,
    ingredients: [
      "200 g chicken breast, sliced",
      "1 cup mixed vegetables (bell pepper, carrot, broccoli)",
      "1 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tbsp vegetable oil",
      "1 clove garlic"
    ],
    macros: { calories: 480, protein: 38, carbs: 40, fat: 18 },
  },
  {
    id: 3,
    name: "Chicken Caesar Salad",
    category: "Chicken",
    cuisine: "American",
    timeMinutes: 15,
    ingredients: [
      "150 g grilled chicken breast",
      "2 cups romaine lettuce",
      "1/4 cup croutons",
      "2 tbsp Caesar dressing",
      "1 tbsp grated parmesan",
      "Salt and pepper"
    ],
    macros: { calories: 430, protein: 35, carbs: 20, fat: 24 },
  },
  {
    id: 4,
    name: "Chicken Fajitas",
    category: "Chicken",
    cuisine: "Mexican",
    timeMinutes: 25,
    ingredients: [
      "200 g chicken breast, strips",
      "1 small onion, sliced",
      "1 bell pepper, sliced",
      "2 small flour tortillas",
      "1 tbsp fajita seasoning",
      "1 tbsp olive oil"
    ],
    macros: { calories: 520, protein: 35, carbs: 50, fat: 18 },
  },
  {
    id: 5,
    name: "Butter Chicken with Rice",
    category: "Chicken",
    cuisine: "Indian",
    timeMinutes: 35,
    ingredients: [
      "200 g chicken thigh, cubes",
      "1/2 cup tomato puree",
      "1/4 cup cream",
      "1 tbsp butter",
      "1 tsp garam masala",
      "1 cup cooked basmati rice"
    ],
    macros: { calories: 680, protein: 32, carbs: 65, fat: 30 },
  },
  {
    id: 6,
    name: "Chicken Alfredo Pasta",
    category: "Chicken",
    cuisine: "Italian",
    timeMinutes: 30,
    ingredients: [
      "200 g chicken breast, sliced",
      "80 g fettuccine pasta (dry)",
      "1/4 cup cream",
      "2 tbsp grated parmesan",
      "1 tbsp butter",
      "1 clove garlic"
    ],
    macros: { calories: 720, protein: 35, carbs: 70, fat: 32 },
  },
  {
    id: 7,
    name: "Baked Lemon Herb Chicken",
    category: "Chicken",
    cuisine: "Mediterranean",
    timeMinutes: 35,
    ingredients: [
      "200 g chicken breast",
      "1 tbsp olive oil",
      "Juice of 1/2 lemon",
      "1 tsp dried oregano",
      "1 tsp garlic powder",
      "Salt and pepper"
    ],
    macros: { calories: 350, protein: 40, carbs: 3, fat: 18 },
  },
  {
    id: 8,
    name: "Chicken Curry with Rice",
    category: "Chicken",
    cuisine: "Indian",
    timeMinutes: 35,
    ingredients: [
      "200 g chicken breast, cubes",
      "1/2 cup coconut milk",
      "1/2 cup tomato sauce",
      "1 tbsp curry powder",
      "1/2 onion, chopped",
      "1 cup cooked rice"
    ],
    macros: { calories: 620, protein: 32, carbs: 68, fat: 22 },
  },
  {
    id: 9,
    name: "Chicken Teriyaki Bowl",
    category: "Chicken",
    cuisine: "Asian",
    timeMinutes: 25,
    ingredients: [
      "200 g chicken breast",
      "2 tbsp teriyaki sauce",
      "1 cup cooked rice",
      "1/2 cup steamed broccoli",
      "1/2 carrot, julienned",
      "1 tsp sesame seeds"
    ],
    macros: { calories: 580, protein: 38, carbs: 65, fat: 14 },
  },
  {
    id: 10,
    name: "Chicken Quesadilla",
    category: "Chicken",
    cuisine: "Mexican",
    timeMinutes: 15,
    ingredients: [
      "150 g cooked chicken, shredded",
      "2 large flour tortillas",
      "1/2 cup shredded cheese",
      "2 tbsp salsa",
      "1 tbsp sour cream",
      "1 tsp olive oil"
    ],
    macros: { calories: 560, protein: 32, carbs: 48, fat: 24 },
  },

  // ---------- BEEF ----------
  {
    id: 11,
    name: "Beef Tacos",
    category: "Beef",
    cuisine: "Mexican",
    timeMinutes: 20,
    ingredients: [
      "150 g ground beef",
      "2 small corn tortillas",
      "1/4 cup shredded lettuce",
      "1/4 cup shredded cheese",
      "2 tbsp salsa",
      "Taco seasoning"
    ],
    macros: { calories: 580, protein: 28, carbs: 40, fat: 32 },
  },
  {
    id: 12,
    name: "Spaghetti Bolognese",
    category: "Beef",
    cuisine: "Italian",
    timeMinutes: 35,
    ingredients: [
      "80 g spaghetti (dry)",
      "150 g ground beef",
      "1/2 cup tomato sauce",
      "1/4 onion, chopped",
      "1 tbsp olive oil",
      "1 tbsp grated parmesan"
    ],
    macros: { calories: 690, protein: 32, carbs: 75, fat: 26 },
  },
  {
    id: 13,
    name: "Beef Stir-Fry with Vegetables",
    category: "Beef",
    cuisine: "Asian",
    timeMinutes: 20,
    ingredients: [
      "150 g beef strips",
      "1 cup mixed vegetables",
      "1 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 tsp ginger, minced",
      "1 clove garlic"
    ],
    macros: { calories: 520, protein: 30, carbs: 30, fat: 28 },
  },
  {
    id: 14,
    name: "Cheeseburger with Salad",
    category: "Beef",
    cuisine: "American",
    timeMinutes: 20,
    ingredients: [
      "150 g beef patty",
      "1 burger bun",
      "1 slice cheddar cheese",
      "Lettuce, tomato, onion",
      "1 tbsp ketchup",
      "1 tsp mayonnaise"
    ],
    macros: { calories: 720, protein: 32, carbs: 55, fat: 38 },
  },
  {
    id: 15,
    name: "Chili con Carne",
    category: "Beef",
    cuisine: "Mexican",
    timeMinutes: 40,
    ingredients: [
      "150 g ground beef",
      "1/2 cup kidney beans",
      "1/2 cup chopped tomatoes",
      "1/4 onion, chopped",
      "1 tsp chili powder",
      "1 tsp cumin"
    ],
    macros: { calories: 580, protein: 32, carbs: 45, fat: 24 },
  },
  {
    id: 16,
    name: "Beef Stew with Potatoes",
    category: "Beef",
    cuisine: "European",
    timeMinutes: 60,
    ingredients: [
      "200 g stewing beef",
      "1 small potato, diced",
      "1 carrot, sliced",
      "1/2 onion, chopped",
      "1 cup beef broth",
      "1 tbsp flour"
    ],
    macros: { calories: 620, protein: 40, carbs: 45, fat: 26 },
  },
  {
    id: 17,
    name: "Beef and Broccoli",
    category: "Beef",
    cuisine: "Asian",
    timeMinutes: 25,
    ingredients: [
      "200 g beef strips",
      "1 cup broccoli florets",
      "2 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tsp cornstarch",
      "1 tbsp vegetable oil"
    ],
    macros: { calories: 540, protein: 32, carbs: 35, fat: 28 },
  },
  {
    id: 18,
    name: "Beef Burrito Bowl",
    category: "Beef",
    cuisine: "Mexican",
    timeMinutes: 30,
    ingredients: [
      "150 g ground beef",
      "1 cup cooked rice",
      "1/2 cup black beans",
      "1/4 cup shredded cheese",
      "2 tbsp salsa",
      "1 tbsp sour cream"
    ],
    macros: { calories: 640, protein: 30, carbs: 70, fat: 22 },
  },
  {
    id: 19,
    name: "Beef Meatballs with Pasta",
    category: "Beef",
    cuisine: "Italian",
    timeMinutes: 35,
    ingredients: [
      "150 g ground beef",
      "80 g pasta (dry)",
      "1/2 cup tomato sauce",
      "1 tbsp grated parmesan",
      "1 egg",
      "1/4 cup breadcrumbs"
    ],
    macros: { calories: 680, protein: 34, carbs: 72, fat: 24 },
  },
  {
    id: 20,
    name: "Beef and Rice Casserole",
    category: "Beef",
    cuisine: "American",
    timeMinutes: 45,
    ingredients: [
      "200 g ground beef",
      "1 cup cooked rice",
      "1/2 cup tomato sauce",
      "1/4 cup shredded cheese",
      "1/2 onion, chopped",
      "1 tsp Italian seasoning"
    ],
    macros: { calories: 660, protein: 30, carbs: 65, fat: 28 },
  },

  // ---------- PORK ----------
  {
    id: 21,
    name: "Pork Stir-Fry with Vegetables",
    category: "Pork",
    cuisine: "Asian",
    timeMinutes: 20,
    ingredients: [
      "150 g pork strips",
      "1 cup mixed vegetables",
      "1 tbsp soy sauce",
      "1 tbsp vegetable oil",
      "1 clove garlic",
      "1 tsp ginger"
    ],
    macros: { calories: 520, protein: 30, carbs: 28, fat: 28 },
  },
  {
    id: 22,
    name: "BBQ Pulled Pork Sandwich",
    category: "Pork",
    cuisine: "American",
    timeMinutes: 40,
    ingredients: [
      "150 g pulled pork",
      "1 burger bun",
      "2 tbsp BBQ sauce",
      "1/4 cup coleslaw",
      "Salt and pepper"
    ],
    macros: { calories: 680, protein: 30, carbs: 60, fat: 30 },
  },
  {
    id: 23,
    name: "Pork Chops with Vegetables",
    category: "Pork",
    cuisine: "European",
    timeMinutes: 30,
    ingredients: [
      "200 g pork chop",
      "1 cup green beans",
      "1 small potato, boiled",
      "1 tbsp olive oil",
      "Salt and pepper",
      "1 tsp dried thyme"
    ],
    macros: { calories: 610, protein: 38, carbs: 35, fat: 30 },
  },
  {
    id: 24,
    name: "Bacon and Egg Breakfast Burrito",
    category: "Pork",
    cuisine: "Tex-Mex",
    timeMinutes: 15,
    ingredients: [
      "2 slices bacon",
      "2 eggs",
      "1 small flour tortilla",
      "1/4 cup shredded cheese",
      "Salt and pepper"
    ],
    macros: { calories: 520, protein: 26, carbs: 30, fat: 32 },
  },
  {
    id: 25,
    name: "Pork Fried Rice",
    category: "Pork",
    cuisine: "Asian",
    timeMinutes: 25,
    ingredients: [
      "150 g pork, diced",
      "1 cup cooked rice",
      "1/2 cup mixed vegetables",
      "1 tbsp soy sauce",
      "1 egg",
      "1 tbsp vegetable oil"
    ],
    macros: { calories: 580, protein: 28, carbs: 65, fat: 20 },
  },
  {
    id: 26,
    name: "Pork Tacos",
    category: "Pork",
    cuisine: "Mexican",
    timeMinutes: 20,
    ingredients: [
      "150 g pork, shredded",
      "2 small corn tortillas",
      "1/4 cup shredded cabbage",
      "2 tbsp salsa",
      "1 tbsp lime juice",
      "Cilantro"
    ],
    macros: { calories: 540, protein: 30, carbs: 42, fat: 24 },
  },
  {
    id: 27,
    name: "Pork and Apple Sausage with Potatoes",
    category: "Pork",
    cuisine: "European",
    timeMinutes: 35,
    ingredients: [
      "2 pork sausages",
      "1 small potato, roasted",
      "1/2 apple, sliced",
      "1 cup green beans",
      "1 tbsp olive oil",
      "Salt and pepper"
    ],
    macros: { calories: 620, protein: 24, carbs: 48, fat: 32 },
  },
  {
    id: 28,
    name: "Pork Lo Mein",
    category: "Pork",
    cuisine: "Asian",
    timeMinutes: 25,
    ingredients: [
      "150 g pork strips",
      "80 g lo mein noodles",
      "1 cup mixed vegetables",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 clove garlic"
    ],
    macros: { calories: 600, protein: 32, carbs: 68, fat: 20 },
  },

  // ---------- FISH & SEAFOOD ----------
  {
    id: 29,
    name: "Baked Salmon with Vegetables",
    category: "Fish",
    cuisine: "Mediterranean",
    timeMinutes: 25,
    ingredients: [
      "180 g salmon fillet",
      "1 cup broccoli florets",
      "1/2 cup cherry tomatoes",
      "1 tbsp olive oil",
      "Lemon wedge",
      "Salt and pepper"
    ],
    macros: { calories: 560, protein: 38, carbs: 12, fat: 36 },
  },
  {
    id: 30,
    name: "Shrimp Stir-Fry with Rice",
    category: "Seafood",
    cuisine: "Asian",
    timeMinutes: 20,
    ingredients: [
      "150 g shrimp, peeled",
      "1 cup mixed vegetables",
      "1 tbsp soy sauce",
      "1 tbsp vegetable oil",
      "1 cup cooked rice"
    ],
    macros: { calories: 540, protein: 32, carbs: 60, fat: 16 },
  },
  {
    id: 31,
    name: "Fish Tacos",
    category: "Fish",
    cuisine: "Mexican",
    timeMinutes: 20,
    ingredients: [
      "150 g white fish fillet",
      "2 small corn tortillas",
      "1/4 cup shredded cabbage",
      "2 tbsp yogurt or sour cream",
      "1 tbsp lime juice",
      "Chili powder, salt"
    ],
    macros: { calories: 480, protein: 30, carbs: 45, fat: 16 },
  },
  {
    id: 32,
    name: "Tuna Salad Sandwich",
    category: "Fish",
    cuisine: "American",
    timeMinutes: 10,
    ingredients: [
      "1 can tuna in water (about 120 g drained)",
      "2 slices wholegrain bread",
      "1 tbsp mayonnaise",
      "Lettuce leaves",
      "Salt and pepper"
    ],
    macros: { calories: 430, protein: 30, carbs: 34, fat: 16 },
  },
  {
    id: 33,
    name: "Garlic Butter Shrimp Pasta",
    category: "Seafood",
    cuisine: "Italian",
    timeMinutes: 25,
    ingredients: [
      "150 g shrimp",
      "80 g spaghetti (dry)",
      "1 tbsp butter",
      "1 tbsp olive oil",
      "2 cloves garlic",
      "1 tbsp grated parmesan"
    ],
    macros: { calories: 620, protein: 32, carbs: 65, fat: 24 },
  },
  {
    id: 34,
    name: "Teriyaki Salmon Rice Bowl",
    category: "Fish",
    cuisine: "Asian",
    timeMinutes: 25,
    ingredients: [
      "180 g salmon fillet",
      "1 tbsp teriyaki sauce",
      "1 cup cooked rice",
      "1/2 cup steamed broccoli",
      "1/2 carrot, julienned"
    ],
    macros: { calories: 640, protein: 38, carbs: 65, fat: 22 },
  },
  {
    id: 35,
    name: "Grilled Tuna Steak",
    category: "Fish",
    cuisine: "Mediterranean",
    timeMinutes: 20,
    ingredients: [
      "200 g tuna steak",
      "1 cup roasted vegetables",
      "1 tbsp olive oil",
      "Lemon wedge",
      "Salt and pepper",
      "Fresh herbs"
    ],
    macros: { calories: 480, protein: 42, carbs: 15, fat: 24 },
  },
  {
    id: 36,
    name: "Shrimp Scampi",
    category: "Seafood",
    cuisine: "Italian",
    timeMinutes: 20,
    ingredients: [
      "150 g shrimp",
      "80 g linguine (dry)",
      "2 tbsp butter",
      "2 cloves garlic",
      "1/4 cup white wine",
      "1 tbsp lemon juice"
    ],
    macros: { calories: 580, protein: 30, carbs: 62, fat: 20 },
  },
  {
    id: 37,
    name: "Cod with Roasted Vegetables",
    category: "Fish",
    cuisine: "Mediterranean",
    timeMinutes: 30,
    ingredients: [
      "200 g cod fillet",
      "1 cup roasted vegetables",
      "1 tbsp olive oil",
      "Lemon wedge",
      "Salt, pepper, herbs"
    ],
    macros: { calories: 420, protein: 36, carbs: 20, fat: 18 },
  },
  {
    id: 38,
    name: "Crab Cakes with Salad",
    category: "Seafood",
    cuisine: "American",
    timeMinutes: 25,
    ingredients: [
      "150 g crab meat",
      "1/4 cup breadcrumbs",
      "1 egg",
      "1 tbsp mayonnaise",
      "Mixed greens",
      "Lemon wedge"
    ],
    macros: { calories: 480, protein: 28, carbs: 25, fat: 28 },
  },

  // ---------- VEGETARIAN / VEGAN ----------
  {
    id: 39,
    name: "Tofu Vegetable Stir-Fry",
    category: "Vegetarian",
    cuisine: "Asian",
    timeMinutes: 20,
    ingredients: [
      "150 g firm tofu, cubes",
      "1 cup mixed vegetables",
      "1 tbsp soy sauce",
      "1 tbsp vegetable oil",
      "1 clove garlic",
      "1 tsp ginger"
    ],
    macros: { calories: 460, protein: 22, carbs: 30, fat: 26 },
  },
  {
    id: 40,
    name: "Lentil Curry with Rice",
    category: "Vegan",
    cuisine: "Indian",
    timeMinutes: 30,
    ingredients: [
      "1/2 cup dried lentils",
      "1/2 cup tomato puree",
      "1/2 cup coconut milk",
      "1 tsp curry powder",
      "1/4 onion, chopped",
      "1 cup cooked rice"
    ],
    macros: { calories: 610, protein: 22, carbs: 90, fat: 18 },
  },
  // Keto Recipes
  {
    id: 41,
    name: "Cauliflower Fried Rice with Chicken",
    category: "Keto",
    cuisine: "Chinese",
    timeMinutes: 30,
    ingredients: [
      "Cauliflower (riced)",
      "Chicken breast",
      "Eggs",
      "Bell pepper",
      "Green peas",
      "Soy sauce (or tamari)",
      "Sesame oil",
      "Garlic",
      "Green onions"
    ],
    macros: { calories: 320, protein: 25, carbs: 10, fat: 18 },
    instructions: [
      "Heat 1 tablespoon of sesame oil in a large pan or wok over medium-high heat. Add minced garlic and sauté until fragrant (about 30 seconds).",
      "Add diced chicken breast to the pan and cook until no longer pink, about 5-6 minutes. Push the cooked chicken to one side of the pan.",
      "Crack the eggs into the other side of the pan and scramble them until just set. Mix the cooked eggs with the chicken.",
      "Stir in the riced cauliflower, diced bell pepper, and a handful of green peas. Cook everything for 5-7 minutes, stirring frequently, until the vegetables are tender-crisp.",
      "Drizzle soy sauce (or tamari for gluten-free) over the cauliflower rice and stir-fry for another 2-3 minutes, allowing the flavors to combine.",
      "Season with salt and pepper to taste. Remove from heat and garnish with sliced green onions before serving hot."
    ]
  },
  {
    id: 42,
    name: "Zucchini Noodle Chicken Alfredo",
    category: "Keto",
    cuisine: "Italian",
    timeMinutes: 25,
    ingredients: [
      "Zucchini",
      "Chicken breast",
      "Heavy cream",
      "Parmesan cheese",
      "Butter",
      "Garlic",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 400, protein: 30, carbs: 8, fat: 28 },
    instructions: [
      "Spiralize the zucchini into noodles ('zoodles') and set aside. Pat the chicken breast dry and season with salt and pepper on both sides.",
      "Heat a tablespoon of butter in a skillet over medium heat. Add the chicken breast and cook for 5-6 minutes per side or until cooked through. Remove and slice the chicken.",
      "In the same skillet, add minced garlic and sauté for 30 seconds. Pour in the heavy cream and bring it to a gentle simmer, scraping up any browned bits from the pan.",
      "Stir in grated Parmesan cheese until it melts into the sauce. Let the sauce simmer for 2-3 minutes, stirring frequently, until slightly thickened.",
      "Add the zucchini noodles to the pan and toss gently in the Alfredo sauce for 2-3 minutes until they soften slightly (avoid overcooking).",
      "Serve the zucchini noodles topped with the sliced chicken. Spoon any extra Alfredo sauce over the top and garnish with additional Parmesan if desired."
    ]
  },
  {
    id: 43,
    name: "Cheeseburger Lettuce Wraps",
    category: "Keto",
    cuisine: "American",
    timeMinutes: 20,
    ingredients: [
      "Ground beef",
      "Iceberg lettuce leaves",
      "Cheddar cheese",
      "Tomato",
      "Red onion",
      "Pickles",
      "Mustard",
      "Mayonnaise",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 450, protein: 25, carbs: 5, fat: 35 },
    instructions: [
      "Season the ground beef with salt and pepper, then form it into small patties or break into crumbles. In a skillet over medium-high heat, cook the beef until browned and cooked through, about 5-7 minutes. Drain excess fat.",
      "Prepare the lettuce wraps by layering two sturdy lettuce leaves for each wrap. Place a spoonful of cooked ground beef onto each lettuce bun.",
      "Top the beef with shredded or sliced cheddar cheese, diced tomato, chopped red onion, and pickle slices.",
      "Drizzle each wrap with a little mustard and mayonnaise (or your favorite burger sauce).",
      "Wrap the lettuce around the fillings and serve immediately. Enjoy your cheeseburger wrap by hand, just like a regular burger."
    ]
  },
  {
    id: 44,
    name: "Creamy Garlic Butter Salmon & Broccoli",
    category: "Keto",
    cuisine: "American",
    timeMinutes: 25,
    ingredients: [
      "Salmon fillets",
      "Broccoli florets",
      "Butter",
      "Garlic",
      "Heavy cream",
      "Lemon",
      "Olive oil",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 520, protein: 30, carbs: 6, fat: 40 },
    instructions: [
      "Season salmon fillets with salt and pepper. In a large skillet over medium heat, add a drizzle of olive oil. Once hot, place the salmon fillets skin-side down and sear for 3-4 minutes, then flip and cook another 3-4 minutes until almost cooked through. Remove salmon and set aside.",
      "In the same skillet, melt 2 tablespoons of butter. Add minced garlic and sauté for 30 seconds until fragrant.",
      "Pour in heavy cream and squeeze in juice from half a lemon. Stir the sauce, scraping up any salmon bits from the pan, and let it simmer for 2 minutes to thicken slightly.",
      "Return the salmon fillets to the pan and spoon the garlic butter cream sauce over them. Let them simmer in the sauce for another 2-3 minutes until fully cooked.",
      "Meanwhile, steam or microwave the broccoli florets until tender-crisp (about 3-4 minutes). Season with a pinch of salt.",
      "Serve the salmon with creamy garlic butter sauce alongside the broccoli. You can drizzle some extra sauce over the broccoli as well."
    ]
  },
  {
    id: 45,
    name: "Grilled Chicken Caesar Salad (Keto)",
    category: "Keto",
    cuisine: "American",
    timeMinutes: 20,
    ingredients: [
      "Chicken breast",
      "Romaine lettuce",
      "Parmesan cheese",
      "Caesar dressing",
      "Olive oil",
      "Garlic powder",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 380, protein: 30, carbs: 4, fat: 26 },
    instructions: [
      "Preheat a grill pan or outdoor grill over medium-high heat. Season the chicken breast with olive oil, garlic powder, salt, and pepper. Grill the chicken for about 5-6 minutes per side, until cooked through. Let it rest, then slice into strips.",
      "Chop or tear the romaine lettuce and place it in a large bowl. Add grated or shaved Parmesan cheese.",
      "Add the grilled chicken slices on top of the lettuce. Drizzle with Caesar dressing (use a low-carb dressing to keep it keto-friendly).",
      "Toss the salad gently to combine, ensuring the chicken and lettuce are coated with dressing. Divide into servings.",
      "Optionally, garnish with additional Parmesan. Serve immediately."
    ]
  },
  {
    id: 46,
    name: "Keto Taco Salad",
    category: "Keto",
    cuisine: "Mexican",
    timeMinutes: 25,
    ingredients: [
      "Ground beef",
      "Taco seasoning (sugar-free)",
      "Romaine lettuce",
      "Tomato",
      "Avocado",
      "Cheddar cheese",
      "Sour cream",
      "Salsa",
      "Olive oil",
      "Salt"
    ],
    macros: { calories: 500, protein: 28, carbs: 10, fat: 40 },
    instructions: [
      "Heat a drizzle of olive oil in a skillet over medium heat. Add the ground beef and cook, breaking it apart, until browned. Drain any excess fat.",
      "Stir in taco seasoning (ensure it's sugar-free for keto) and a pinch of salt. Add a few tablespoons of water and simmer for 2-3 minutes until the beef is well seasoned. Remove from heat.",
      "In a large bowl, combine chopped romaine lettuce and diced tomato. Add the seasoned ground beef on top.",
      "Sprinkle with shredded cheddar cheese and diced avocado. Add a dollop of sour cream and a spoonful of salsa on each serving.",
      "Toss or arrange the salad as desired. Serve immediately, mixing everything together just before eating."
    ]
  },
  {
    id: 47,
    name: "Philly Cheesesteak Stuffed Peppers",
    category: "Keto",
    cuisine: "American",
    timeMinutes: 35,
    ingredients: [
      "Bell peppers",
      "Steak (thinly sliced)",
      "Mushrooms",
      "Onion",
      "Provolone cheese",
      "Olive oil",
      "Garlic powder",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 370, protein: 26, carbs: 9, fat: 25 },
    instructions: [
      "Preheat your oven to 375°F (190°C). Slice the bell peppers in half lengthwise and remove the seeds. Place the pepper halves on a baking sheet and drizzle with a little olive oil. Roast in the oven for 10 minutes to soften slightly, then remove.",
      "In a skillet, heat a tablespoon of olive oil over medium-high heat. Add thinly sliced steak, season with salt, pepper, and garlic powder, and cook for 2-3 minutes until just browned. Remove steak and set aside.",
      "In the same skillet, sauté sliced onions and mushrooms until softened and golden, about 5 minutes. Season with a little more salt and pepper.",
      "Fill each pre-roasted pepper half with the cooked steak, onions, and mushrooms. Top each stuffed pepper with a slice of provolone cheese.",
      "Return the stuffed peppers to the oven and bake for another 10 minutes, or until the cheese is melted and the peppers are tender. Serve hot."
    ]
  },
  {
    id: 48,
    name: "Spinach and Feta Frittata",
    category: "Keto",
    cuisine: "Italian",
    timeMinutes: 30,
    ingredients: [
      "Eggs",
      "Spinach",
      "Feta cheese",
      "Heavy cream",
      "Butter",
      "Garlic",
      "Onion",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 320, protein: 18, carbs: 5, fat: 25 },
    instructions: [
      "Preheat oven to 375°F (190°C). In a bowl, whisk together the eggs, heavy cream, salt, and pepper.",
      "Heat an oven-safe skillet over medium heat and melt a tablespoon of butter. Sauté chopped onion and garlic until fragrant and translucent, about 3 minutes.",
      "Add fresh spinach to the skillet and cook until wilted, about 2 minutes. Spread the spinach and onion evenly across the pan.",
      "Pour the egg mixture into the skillet over the vegetables. Sprinkle crumbled feta cheese on top.",
      "Cook on the stovetop for 2-3 minutes until the edges start to set. Then transfer the skillet to the preheated oven.",
      "Bake for 10-12 minutes, or until the frittata is set in the center and lightly golden on top. Let it cool slightly, then slice and serve."
    ]
  },
  {
    id: 49,
    name: "Keto Thai Coconut Chicken Curry",
    category: "Keto",
    cuisine: "Thai",
    timeMinutes: 30,
    ingredients: [
      "Chicken thighs",
      "Coconut milk",
      "Thai curry paste (red or green)",
      "Zucchini",
      "Bell pepper",
      "Coconut oil",
      "Fish sauce",
      "Basil leaves",
      "Salt"
    ],
    macros: { calories: 450, protein: 30, carbs: 12, fat: 30 },
    instructions: [
      "Heat a tablespoon of coconut oil in a pot or deep skillet over medium heat. Add 2 tablespoons of Thai curry paste and sauté for 1 minute to release the aromas.",
      "Add bite-sized pieces of chicken thighs to the pan. Cook for 5-6 minutes, stirring, until the chicken is browned on the outside.",
      "Pour in the coconut milk and stir to combine with the curry paste. Bring to a simmer.",
      "Add sliced zucchini and bell pepper to the curry. Simmer for about 10 minutes, or until the chicken is cooked through and the vegetables are tender.",
      "Stir in a splash of fish sauce (for saltiness) and adjust seasoning to taste (add a pinch of salt if needed).",
      "Remove from heat and stir in a handful of fresh basil leaves. Serve the curry hot in bowls. (You can serve with cauliflower rice on the side to keep it keto.)"
    ]
  },
  {
    id: 50,
    name: "Keto Butter Chicken with Cauliflower Rice",
    category: "Keto",
    cuisine: "Indian",
    timeMinutes: 40,
    ingredients: [
      "Chicken breast",
      "Tomato puree",
      "Heavy cream",
      "Butter",
      "Garlic",
      "Ginger",
      "Garam masala",
      "Cauliflower (riced)",
      "Cilantro",
      "Salt"
    ],
    macros: { calories: 480, protein: 32, carbs: 10, fat: 34 },
    instructions: [
      "Cut the chicken breast into bite-sized pieces. In a bowl, combine chicken with garam masala, grated ginger, minced garlic, and a pinch of salt. Let it marinate for 10 minutes (or longer if you have time).",
      "In a deep pan, heat 2 tablespoons of butter over medium heat. Add the marinated chicken pieces and cook until lightly browned on all sides, about 5-6 minutes.",
      "Stir in the tomato puree and bring to a simmer. Lower the heat and cook for about 10 minutes, allowing the chicken to cook through and the sauce to reduce slightly.",
      "Pour in the heavy cream and stir well to create a rich, creamy sauce. Simmer for another 5 minutes. Taste and adjust seasoning with salt if needed.",
      "Meanwhile, microwave or sauté the riced cauliflower until tender (about 5 minutes). This will be your low-carb 'rice'.",
      "Serve the butter chicken over a bed of cauliflower rice. Garnish with fresh chopped cilantro before serving."
    ]
  },
  {
    id: 51,
    name: "Garlic Shrimp Zucchini Pasta",
    category: "Keto",
    cuisine: "Italian",
    timeMinutes: 20,
    ingredients: [
      "Shrimp",
      "Zucchini",
      "Garlic",
      "Olive oil",
      "Cherry tomatoes",
      "Parsley",
      "Lemon",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 300, protein: 25, carbs: 8, fat: 20 },
    instructions: [
      "Spiralize the zucchini into noodles and set aside. Pat the shrimp dry and season with salt and pepper.",
      "Heat 2 tablespoons of olive oil in a large skillet over medium-high heat. Add the shrimp and cook for 2 minutes per side until they turn pink and opaque. Remove shrimp and set aside.",
      "In the same skillet, add minced garlic and halved cherry tomatoes. Sauté for 1-2 minutes until the garlic is fragrant and tomatoes soften slightly.",
      "Add the zucchini noodles to the skillet. Toss them with the garlic and tomatoes for about 2-3 minutes until the zoodles are slightly tender.",
      "Return the cooked shrimp to the pan. Squeeze fresh lemon juice over everything and toss to combine. Cook for 1 more minute to heat through.",
      "Remove from heat. Sprinkle chopped fresh parsley on top and serve immediately."
    ]
  },
  {
    id: 52,
    name: "Keto Beef and Broccoli Stir-Fry",
    category: "Keto",
    cuisine: "Chinese",
    timeMinutes: 25,
    ingredients: [
      "Beef sirloin (sliced)",
      "Broccoli",
      "Soy sauce (or coconut aminos)",
      "Garlic",
      "Ginger",
      "Sesame oil",
      "Olive oil",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 350, protein: 25, carbs: 8, fat: 22 },
    instructions: [
      "In a bowl, marinate the sliced beef sirloin with 2 tablespoons of soy sauce (or coconut aminos), a minced clove of garlic, and a grated piece of ginger. Let it sit for 10 minutes while you prepare the broccoli.",
      "Cut broccoli into small florets. Heat a tablespoon of olive oil in a large skillet or wok over high heat. Add the marinated beef (discard any excess marinade) and stir-fry for 2-3 minutes until browned. Remove beef and set aside.",
      "In the same pan, add another small drizzle of oil if needed. Add the broccoli florets and stir-fry for 3-4 minutes until they are tender-crisp. You can add a tablespoon of water and cover for a minute to steam if necessary.",
      "Return the beef to the pan with the broccoli. Pour in another tablespoon of soy sauce (or coconut aminos) and drizzle with a teaspoon of sesame oil.",
      "Stir-fry everything together for another 1-2 minutes, until the beef is cooked through and coated in the sauce. Season with salt and pepper to taste.",
      "Serve hot. This dish can be enjoyed on its own or with a side of cauliflower rice to keep it low-carb."
    ]
  },
  {
    id: 53,
    name: "Stuffed Zucchini Boats with Ground Beef",
    category: "Keto",
    cuisine: "Mediterranean",
    timeMinutes: 40,
    ingredients: [
      "Zucchini",
      "Ground beef",
      "Tomato sauce (no-sugar-added)",
      "Mozzarella cheese",
      "Onion",
      "Garlic",
      "Olive oil",
      "Italian seasoning",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 340, protein: 20, carbs: 10, fat: 25 },
    instructions: [
      "Preheat oven to 375°F (190°C). Slice zucchini in half lengthwise and scoop out some of the center flesh to create boats. Place the zucchini boats on a baking sheet and brush with olive oil. Bake for about 10 minutes to soften slightly, then remove from oven.",
      "In a skillet, heat a tablespoon of olive oil over medium heat. Add diced onion and minced garlic, sautéing until softened. Add the ground beef and cook until browned, breaking it up with a spoon. Drain excess fat.",
      "Stir in tomato sauce and Italian seasoning with the beef. Simmer for 2-3 minutes, and season with salt and pepper to taste. Remove from heat.",
      "Spoon the beef and tomato filling into each pre-baked zucchini boat. Top each with shredded mozzarella cheese.",
      "Return the stuffed zucchini to the oven and bake for an additional 10-15 minutes, until the zucchini is tender, the filling is hot, and the cheese is melted and slightly golden.",
      "Let cool for a couple of minutes before serving. These keto zucchini boats are satisfying and packed with flavor."
    ]
  },
  {
    id: 54,
    name: "Creamy Tuscan Garlic Chicken",
    category: "Keto",
    cuisine: "Italian",
    timeMinutes: 30,
    ingredients: [
      "Chicken thighs",
      "Spinach",
      "Sun-dried tomatoes",
      "Heavy cream",
      "Parmesan cheese",
      "Garlic",
      "Olive oil",
      "Italian seasoning",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 480, protein: 32, carbs: 8, fat: 34 },
    instructions: [
      "Season chicken thighs with salt, pepper, and Italian seasoning. Heat 1-2 tablespoons of olive oil in a skillet over medium-high heat. Add the chicken thighs and sear for about 5 minutes per side, until golden brown and mostly cooked through. Remove and set aside.",
      "In the same skillet, lower the heat to medium. Add minced garlic and sauté for about 30 seconds until fragrant.",
      "Add heavy cream to the pan, stirring and scraping up any browned bits from the bottom. Bring it to a simmer.",
      "Stir in a handful of chopped sun-dried tomatoes and fresh spinach leaves. Let the mixture simmer for 2-3 minutes until the spinach wilts and the tomatoes warm through.",
      "Return the seared chicken thighs to the skillet, nestling them into the creamy sauce. Simmer for another 5 minutes, or until the chicken is fully cooked and the sauce has thickened slightly.",
      "Sprinkle grated Parmesan cheese over the dish and stir gently to melt it into the sauce. Serve the Tuscan garlic chicken hot, spooning extra sauce over each piece."
    ]
  },
  {
    id: 55,
    name: "Pork and Cabbage Stir-Fry (Keto)",
    category: "Keto",
    cuisine: "Chinese",
    timeMinutes: 25,
    ingredients: [
      "Ground pork",
      "Cabbage",
      "Carrot",
      "Soy sauce (or coconut aminos)",
      "Ginger",
      "Garlic",
      "Sesame oil",
      "Green onions",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 420, protein: 20, carbs: 10, fat: 34 },
    instructions: [
      "Heat a tablespoon of sesame oil in a large skillet or wok over medium-high heat. Add minced garlic and ginger, stirring until fragrant (about 30 seconds).",
      "Add the ground pork to the pan. Cook for 5-7 minutes, breaking it apart, until it is browned and cooked through.",
      "Stir in shredded cabbage and a small handful of thinly sliced carrot. Cook for another 5 minutes, stirring frequently, until the cabbage softens.",
      "Pour in 2 tablespoons of soy sauce (or coconut aminos for a paleo-friendly option). Stir everything together and let it cook for 2 more minutes so the flavors combine.",
      "Season with salt and pepper to taste, keeping in mind the soy sauce adds saltiness. Remove from heat.",
      "Serve the pork and cabbage stir-fry in bowls and garnish with chopped green onions on top."
    ]
  },

  // Vegetarian Recipes
  {
    id: 56,
    name: "Veggie Stir-Fry Noodles with Tofu",
    category: "Vegetarian",
    cuisine: "Chinese",
    timeMinutes: 25,
    ingredients: [
      "Tofu",
      "Mixed vegetables (bell pepper, broccoli, carrot)",
      "Soy sauce",
      "Ginger",
      "Garlic",
      "Rice noodles (or lo mein noodles)",
      "Sesame oil",
      "Green onions"
    ],
    macros: { calories: 400, protein: 15, carbs: 50, fat: 10 },
    instructions: [
      "Press the tofu to remove excess water, then cut it into cubes. Heat 1 tablespoon of sesame oil in a large pan or wok over medium-high heat.",
      "Add the tofu cubes and cook until lightly browned on all sides, about 5-6 minutes. Remove the tofu from the pan and set aside on a plate.",
      "In the same pan, add a bit more oil if needed. Add minced garlic and grated ginger, stirring for 30 seconds until fragrant.",
      "Toss in the mixed vegetables (sliced bell pepper, small broccoli florets, and julienned carrot). Stir-fry for 3-5 minutes until the veggies are crisp-tender.",
      "Meanwhile, cook the rice noodles according to package instructions (usually by soaking in hot water or boiling briefly). Drain well.",
      "Add the drained noodles to the pan with the vegetables, along with the browned tofu. Pour in soy sauce (about 2-3 tablespoons) and toss everything together for another 2 minutes on the heat, until the noodles and veggies are well combined.",
      "Remove from heat and sprinkle with chopped green onions. Serve hot, straight from the pan."
    ]
  },
  {
    id: 57,
    name: "Chickpea & Spinach Curry",
    category: "Vegetarian",
    cuisine: "Indian",
    timeMinutes: 30,
    ingredients: [
      "Chickpeas (canned)",
      "Spinach",
      "Tomatoes (diced or crushed)",
      "Onion",
      "Garlic",
      "Curry powder",
      "Cumin",
      "Coconut milk",
      "Oil",
      "Salt"
    ],
    macros: { calories: 320, protein: 12, carbs: 45, fat: 12 },
    instructions: [
      "Heat 1 tablespoon of oil in a pot over medium heat. Add a diced onion and sauté until translucent, about 3-4 minutes. Stir in minced garlic and cook for another 30 seconds.",
      "Mix in 2 teaspoons of curry powder and 1 teaspoon of ground cumin. Stir the spices with the onions and garlic for about 1 minute to release their aroma.",
      "Add a can of diced tomatoes (with juices) and a can of drained chickpeas to the pot. Stir everything together and bring to a simmer.",
      "Pour in 1/2 cup of coconut milk and stir. Add a pinch of salt. Simmer the curry for 10-15 minutes, allowing the flavors to meld and the sauce to thicken slightly.",
      "Stir in a few handfuls of fresh spinach leaves and cook for 2-3 minutes until the spinach wilts into the curry.",
      "Taste and adjust seasoning if needed. Serve the chickpea and spinach curry hot, on its own or over rice (if desired)."
    ]
  },
  {
    id: 58,
    name: "Vegetarian Three-Bean Chili",
    category: "Vegetarian",
    cuisine: "American",
    timeMinutes: 45,
    ingredients: [
      "Kidney beans",
      "Black beans",
      "Pinto beans",
      "Tomatoes (crushed)",
      "Onion",
      "Bell pepper",
      "Chili powder",
      "Cumin",
      "Olive oil",
      "Salt"
    ],
    macros: { calories: 350, protein: 15, carbs: 50, fat: 8 },
    instructions: [
      "In a large pot, heat 1 tablespoon of olive oil over medium heat. Add a diced onion and chopped bell pepper, sautéing for about 5 minutes until softened.",
      "Stir in 2 tablespoons of chili powder and 1 teaspoon of cumin, cooking with the vegetables for 30 seconds.",
      "Add canned crushed tomatoes (about 28 oz) and all three types of beans (kidney, black, pinto - drained and rinsed). Stir to combine.",
      "Bring the chili to a simmer, then reduce heat to low. Cover and let it simmer for about 20-25 minutes, stirring occasionally, to allow flavors to develop.",
      "Season with salt and pepper to taste. If the chili is too thick, you can add a splash of water or vegetable broth.",
      "Serve hot in bowls. You can top with shredded cheese, sour cream, or chopped green onions if desired (omit dairy toppings to keep it vegan)."
    ]
  },
  {
    id: 59,
    name: "Creamy Mushroom Stroganoff",
    category: "Vegetarian",
    cuisine: "European",
    timeMinutes: 30,
    ingredients: [
      "Mushrooms",
      "Egg noodles",
      "Onion",
      "Garlic",
      "Vegetable broth",
      "Sour cream",
      "Butter",
      "Paprika",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 420, protein: 10, carbs: 50, fat: 18 },
    instructions: [
      "Cook the egg noodles according to package instructions. Drain and set aside.",
      "In a large skillet, melt 2 tablespoons of butter over medium heat. Add a diced onion and sauté for 3 minutes until it begins to soften. Add sliced mushrooms and continue to cook for about 5-7 minutes until the mushrooms release their moisture and brown.",
      "Add minced garlic and 1 teaspoon of paprika to the mushrooms, cooking for 30 seconds until fragrant.",
      "Pour in 1 cup of vegetable broth. Stir and let it simmer for 5 minutes to reduce slightly.",
      "Reduce heat to low and stir in 1/2 cup of sour cream. Mix well to create a creamy sauce (do not boil, to prevent curdling). Season with salt and pepper to taste.",
      "Add the cooked egg noodles to the skillet and toss to coat them in the mushroom sauce. Serve warm."
    ]
  },
  {
    id: 60,
    name: "Loaded Veggie Quesadillas",
    category: "Vegetarian",
    cuisine: "Mexican",
    timeMinutes: 20,
    ingredients: [
      "Flour tortillas",
      "Cheddar cheese",
      "Black beans",
      "Bell pepper",
      "Onion",
      "Corn kernels",
      "Olive oil",
      "Cilantro",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 380, protein: 12, carbs: 45, fat: 15 },
    instructions: [
      "Heat a teaspoon of olive oil in a skillet over medium heat. Add diced bell pepper and onion, sautéing for 3-4 minutes until softened. Stir in a handful of corn kernels and a drained can of black beans. Season with salt and pepper, then remove the mixture from heat.",
      "Place a flour tortilla on a clean surface. Sprinkle one half of it with a layer of shredded cheddar cheese. Add a few spoonfuls of the cooked veggie and bean mixture on top of the cheese. Sprinkle a little fresh cilantro over the filling (optional).",
      "Fold the tortilla in half over the filling, pressing gently.",
      "Wipe out the skillet and heat another small drizzle of oil over medium heat. Carefully place the folded quesadilla in the pan. Cook for about 2 minutes on each side, or until the tortilla is golden brown and the cheese is melted inside.",
      "Repeat for additional quesadillas. Slice into wedges and serve warm."
    ]
  },
  {
    id: 61,
    name: "Mediterranean Veggie Wrap",
    category: "Vegetarian",
    cuisine: "Mediterranean",
    timeMinutes: 15,
    ingredients: [
      "Whole wheat tortilla",
      "Hummus",
      "Feta cheese",
      "Cucumber",
      "Tomato",
      "Lettuce",
      "Olives",
      "Red onion"
    ],
    macros: { calories: 300, protein: 8, carbs: 34, fat: 15 },
    instructions: [
      "Warm the whole wheat tortilla in a dry pan or microwave for a few seconds to make it pliable.",
      "Spread a generous layer of hummus over the tortilla, leaving a little space at the edges for rolling.",
      "Layer the fillings on one side of the tortilla: add a line of chopped lettuce, sliced cucumber, diced tomato, a few thin slices of red onion, crumbled feta cheese, and a few sliced olives.",
      "Fold in the sides of the tortilla and then roll it up tightly from the filling side to form a wrap.",
      "Slice the wrap in half diagonally and serve. This Mediterranean veggie wrap is great for a quick lunch."
    ]
  },
  {
    id: 62,
    name: "Black Bean Stuffed Peppers",
    category: "Vegetarian",
    cuisine: "Mexican",
    timeMinutes: 40,
    ingredients: [
      "Bell peppers",
      "Black beans",
      "Cooked rice",
      "Corn",
      "Tomato sauce",
      "Cheddar cheese",
      "Onion",
      "Chili powder",
      "Olive oil",
      "Salt"
    ],
    macros: { calories: 360, protein: 12, carbs: 50, fat: 10 },
    instructions: [
      "Preheat the oven to 375°F (190°C). Cut the tops off the bell peppers (or slice in half lengthwise) and remove the seeds. Place the peppers in a baking dish and bake for 10 minutes to soften slightly, then remove from oven.",
      "In a skillet, heat 1 tablespoon of olive oil over medium heat. Sauté a chopped onion for 3-4 minutes until softened. Add a drained can of black beans, 1 cup of cooked rice, 1 cup of corn kernels, and 1 cup of tomato sauce.",
      "Season the mixture with 1 teaspoon of chili powder and salt and pepper to taste. Stir and cook for 5 minutes to let the flavors combine.",
      "Spoon the bean and rice filling into each pre-baked pepper. Fill them generously.",
      "Top each stuffed pepper with a sprinkle of shredded cheddar cheese.",
      "Bake the peppers in the oven for an additional 15-20 minutes, until the peppers are tender and the cheese is melted and starting to brown. Serve warm."
    ]
  },
  {
    id: 63,
    name: "Margherita Zucchini Boats",
    category: "Vegetarian",
    cuisine: "Italian",
    timeMinutes: 30,
    ingredients: [
      "Zucchini",
      "Tomato sauce",
      "Mozzarella cheese",
      "Cherry tomatoes",
      "Basil",
      "Olive oil",
      "Garlic",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 250, protein: 12, carbs: 15, fat: 18 },
    instructions: [
      "Preheat oven to 400°F (200°C). Slice the zucchini in half lengthwise and use a spoon to scoop out a bit of the center flesh (you can discard this or chop it and use in the sauce). Place zucchini halves on a baking sheet and brush lightly with olive oil. Bake for 10 minutes to begin softening them.",
      "Meanwhile, in a small pot, warm up the tomato sauce with a minced clove of garlic, a pinch of salt, and pepper. Let it simmer for a few minutes to develop flavor.",
      "Remove the zucchini from the oven. Spoon tomato sauce into each zucchini boat generously.",
      "Top with shredded mozzarella cheese and a few cherry tomato halves.",
      "Return the zucchini boats to the oven and bake for another 10-15 minutes, until the zucchini is tender and the cheese is melted and bubbly.",
      "Remove from oven and sprinkle fresh basil leaves on top before serving."
    ]
  },
  {
    id: 64,
    name: "Baked Eggplant Parmesan",
    category: "Vegetarian",
    cuisine: "Italian",
    timeMinutes: 45,
    ingredients: [
      "Eggplant",
      "Breadcrumbs",
      "Marinara sauce",
      "Mozzarella cheese",
      "Parmesan cheese",
      "Eggs",
      "Olive oil",
      "Basil",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 400, protein: 15, carbs: 40, fat: 22 },
    instructions: [
      "Preheat oven to 375°F (190°C). Slice the eggplant into 1/2-inch rounds. Sprinkle them with salt and let sit for 10 minutes to draw out moisture, then pat dry.",
      "Set up a breading station: in one bowl, beat 2 eggs. In another bowl, spread breadcrumbs mixed with a little salt and pepper. Dip each eggplant slice in egg, then coat with breadcrumbs.",
      "Place the breaded eggplant slices on a baking sheet brushed with olive oil. Bake for about 20 minutes, flipping halfway, until the eggplant is tender and the breadcrumbs are golden.",
      "In a baking dish, spread a layer of marinara sauce. Arrange baked eggplant slices on top of the sauce. Spoon a bit more marinara over each slice, then top with shredded mozzarella and a sprinkle of Parmesan.",
      "Bake for another 10-15 minutes, until the cheese is melted and bubbly. Garnish with fresh basil leaves. Serve warm, perhaps with pasta or bread on the side."
    ]
  },
  {
    id: 65,
    name: "Shakshuka (Eggs in Tomato Sauce)",
    category: "Vegetarian",
    cuisine: "Middle Eastern",
    timeMinutes: 30,
    ingredients: [
      "Eggs",
      "Tomatoes (crushed)",
      "Onion",
      "Bell pepper",
      "Garlic",
      "Paprika",
      "Cumin",
      "Olive oil",
      "Cilantro",
      "Salt"
    ],
    macros: { calories: 250, protein: 12, carbs: 15, fat: 15 },
    instructions: [
      "Heat 2 tablespoons of olive oil in a skillet over medium heat. Add a diced onion and a diced bell pepper and sauté for about 5 minutes until they soften.",
      "Stir in minced garlic (2-3 cloves), 1 teaspoon of paprika, and 1/2 teaspoon of ground cumin. Cook for 30 seconds to release the spices' aroma.",
      "Pour in a can of crushed tomatoes (about 14-15 oz) and season with salt and pepper. Simmer the sauce for 5-7 minutes, stirring occasionally, until it slightly thickens.",
      "Make 4 small wells in the sauce with the back of a spoon. Crack an egg into each well.",
      "Cover the skillet and let it cook for 5-7 minutes, or until the egg whites are set but the yolks are still a bit runny (cook longer for firm yolks).",
      "Sprinkle chopped cilantro (or parsley) on top. Serve the shakshuka straight from the pan, with crusty bread for dipping (if desired)."
    ]
  },
  {
    id: 66,
    name: "Vegetarian Fried Rice",
    category: "Vegetarian",
    cuisine: "Chinese",
    timeMinutes: 20,
    ingredients: [
      "Cooked rice",
      "Eggs",
      "Carrot",
      "Peas",
      "Green onion",
      "Soy sauce",
      "Sesame oil",
      "Garlic",
      "Ginger",
      "Salt"
    ],
    macros: { calories: 300, protein: 10, carbs: 45, fat: 8 },
    instructions: [
      "Heat 1 tablespoon of sesame oil in a large skillet or wok over medium-high heat. Add a minced clove of garlic and a teaspoon of minced ginger, stir-frying for 30 seconds.",
      "Add diced carrots and a handful of peas to the pan. Stir-fry for 2-3 minutes until the carrots start to soften.",
      "Push the veggies to the side and crack 2 eggs into the pan. Scramble the eggs until just set, then mix them with the vegetables.",
      "Add 2 cups of cold cooked rice to the pan. Stir-fry everything together, breaking up any clumps of rice, for about 3-5 minutes.",
      "Drizzle 2-3 tablespoons of soy sauce over the rice and mix well. Cook for another minute. Season with a pinch of salt if needed.",
      "Remove from heat and garnish with chopped green onions. Serve hot."
    ]
  },
  {
    id: 67,
    name: "Pesto Pasta Primavera",
    category: "Vegetarian",
    cuisine: "Italian",
    timeMinutes: 25,
    ingredients: [
      "Pasta",
      "Pesto sauce",
      "Zucchini",
      "Cherry tomatoes",
      "Bell pepper",
      "Parmesan cheese",
      "Olive oil",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 420, protein: 12, carbs: 55, fat: 15 },
    instructions: [
      "Cook the pasta according to package instructions until al dente. Reserve a little pasta water, then drain the pasta.",
      "While the pasta cooks, heat 1 tablespoon of olive oil in a large skillet over medium heat. Add chopped bell pepper and zucchini (cut into bite-sized pieces). Sauté for 4-5 minutes until the vegetables are tender but still crisp. Toss in halved cherry tomatoes and cook 1-2 minutes more.",
      "Add the drained pasta to the skillet with the vegetables. Turn off the heat and add 3-4 tablespoons of pesto sauce to the pasta.",
      "Toss everything together, adding a splash of reserved pasta water if needed to loosen the sauce and coat the pasta evenly.",
      "Season with salt and pepper to taste. Serve with grated Parmesan cheese sprinkled on top."
    ]
  },
  {
    id: 68,
    name: "Hearty Lentil Vegetable Soup",
    category: "Vegetarian",
    cuisine: "Mediterranean",
    timeMinutes: 50,
    ingredients: [
      "Brown or green lentils",
      "Carrots",
      "Celery",
      "Onion",
      "Tomatoes (diced)",
      "Spinach",
      "Vegetable broth",
      "Olive oil",
      "Bay leaf",
      "Salt"
    ],
    macros: { calories: 250, protein: 12, carbs: 40, fat: 4 },
    instructions: [
      "Rinse 1 cup of lentils under cold water. In a large pot, heat 2 tablespoons of olive oil over medium heat. Add a diced onion, 2 chopped carrots, and 2 chopped celery stalks. Sauté for about 5 minutes until the onions are translucent.",
      "Add the lentils to the pot along with a can of diced tomatoes (with juices) and 4 cups of vegetable broth. Add a bay leaf and bring the soup to a boil.",
      "Reduce heat to a gentle simmer. Cover and cook for about 25-30 minutes, until the lentils are tender.",
      "Stir in a few handfuls of fresh spinach leaves and cook for 2-3 minutes until wilted.",
      "Season the soup with salt and pepper to taste. Remove the bay leaf before serving.",
      "Ladle into bowls and serve hot. This hearty lentil vegetable soup is great with a piece of crusty bread (if desired)."
    ]
  },
  {
    id: 69,
    name: "Palak Paneer (Spinach & Paneer Curry)",
    category: "Vegetarian",
    cuisine: "Indian",
    timeMinutes: 35,
    ingredients: [
      "Spinach",
      "Paneer cheese",
      "Onion",
      "Tomato",
      "Garlic",
      "Ginger",
      "Garam masala",
      "Heavy cream",
      "Oil",
      "Salt"
    ],
    macros: { calories: 320, protein: 12, carbs: 10, fat: 25 },
    instructions: [
      "Heat 2 tablespoons of oil or ghee in a pan over medium heat. Add a chopped onion and sauté until golden, about 5 minutes. Add minced garlic and ginger (about 1 teaspoon each) and cook for another minute.",
      "Stir in 1 teaspoon of garam masala and cook for 30 seconds. Add one chopped tomato and cook until it softens, about 4-5 minutes.",
      "Add roughly 6 cups of fresh spinach leaves to the pan. Cook, stirring, until the spinach wilts (you may have to add it in batches).",
      "Transfer the contents of the pan to a blender and blend into a smooth green sauce (be careful with the hot mixture). Alternatively, use an immersion blender in the pan.",
      "Return the spinach sauce to the pan and stir in 1/4 cup of heavy cream. Add salt to taste.",
      "Cut the paneer into cubes and stir it into the sauce. Simmer for 5 minutes to heat the paneer through. Serve hot with rice or flatbread on the side (note: use dairy-free cream and tofu instead of paneer for a vegan version)."
    ]
  },
  {
    id: 70,
    name: "Vegetable Fajitas",
    category: "Vegetarian",
    cuisine: "Mexican",
    timeMinutes: 25,
    ingredients: [
      "Bell peppers",
      "Onion",
      "Mushrooms",
      "Olive oil",
      "Fajita seasoning",
      "Flour or corn tortillas",
      "Avocado",
      "Lime",
      "Salt"
    ],
    macros: { calories: 300, protein: 8, carbs: 40, fat: 10 },
    instructions: [
      "Slice bell peppers and onions into strips. If using mushrooms (like portobello or button mushrooms), slice them as well.",
      "Heat 1-2 tablespoons of olive oil in a large skillet over high heat. Add the sliced peppers, onions, and mushrooms to the pan.",
      "Sprinkle with fajita seasoning (a mix of chili powder, cumin, garlic powder, etc.) and a pinch of salt. Stir-fry the vegetables for about 5-7 minutes until they're softened and a bit charred at the edges.",
      "Warm the tortillas in a dry pan or microwave. Fill each tortilla with a scoop of the sizzling vegetable mixture.",
      "Top with sliced avocado and a squeeze of fresh lime juice. You can also add salsa or sour cream on top if desired (omit sour cream for vegan). Roll up or fold and enjoy."
    ]
  },

  // High-Protein Recipes
  {
    id: 71,
    name: "Grilled Chicken Quinoa Bowl",
    category: "High-Protein",
    cuisine: "American",
    timeMinutes: 30,
    ingredients: [
      "Chicken breast",
      "Quinoa",
      "Broccoli",
      "Bell pepper",
      "Olive oil",
      "Lemon",
      "Garlic powder",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 450, protein: 35, carbs: 40, fat: 10 },
    instructions: [
      "Rinse and cook 1 cup of quinoa according to package directions (usually simmered in 2 cups of water for about 15 minutes) until fluffy. Set aside.",
      "Meanwhile, preheat a grill or grill pan over medium-high heat. Pound the chicken breast to an even thickness and season with olive oil, garlic powder, salt, and pepper.",
      "Grill the chicken for about 5-6 minutes per side, or until fully cooked through. Remove from heat and let it rest for a few minutes, then slice into strips.",
      "Lightly steam or sauté bite-sized broccoli florets until crisp-tender, about 3-4 minutes. Also, chop the bell pepper into thin strips (you can grill or sauté it lightly if desired).",
      "Assemble the bowl: start with a base of cooked quinoa, then add the grilled chicken slices, broccoli, and bell pepper. Squeeze fresh lemon juice over the bowl and drizzle with a little olive oil for extra flavor.",
      "Season with additional salt and pepper if needed. Serve warm."
    ]
  },
  {
    id: 72,
    name: "Turkey Meatballs with Zucchini Noodles",
    category: "High-Protein",
    cuisine: "Italian",
    timeMinutes: 35,
    ingredients: [
      "Ground turkey",
      "Egg",
      "Parmesan cheese",
      "Italian seasoning",
      "Zucchini",
      "Marinara sauce",
      "Olive oil",
      "Garlic",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 300, protein: 30, carbs: 10, fat: 15 },
    instructions: [
      "In a bowl, combine ground turkey with a beaten egg, 1/4 cup grated Parmesan, 1 teaspoon Italian seasoning, minced garlic, salt, and pepper. Mix well and form into small meatballs (about 1 inch in diameter).",
      "Heat 1-2 tablespoons of olive oil in a large pan over medium heat. Add the turkey meatballs, cooking for about 8-10 minutes, turning occasionally, until they are browned on all sides and cooked through. Remove meatballs and set aside.",
      "In the same pan, pour in marinara sauce (about 2 cups). Bring it to a simmer, scraping any browned bits from the bottom. Return the meatballs to the sauce and let them simmer for 5 minutes.",
      "While the meatballs simmer, make zucchini noodles using a spiralizer or vegetable peeler. Lightly sauté the zucchini noodles in a separate pan with a little olive oil for 2-3 minutes until slightly tender (do not overcook).",
      "Serve the turkey meatballs and marinara over a bed of zucchini noodles. Sprinkle extra Parmesan on top if desired."
    ]
  },
  {
    id: 73,
    name: "Egg White & Veggie Scramble",
    category: "High-Protein",
    cuisine: "American",
    timeMinutes: 15,
    ingredients: [
      "Egg whites",
      "Eggs",
      "Spinach",
      "Mushrooms",
      "Cherry tomatoes",
      "Olive oil",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 200, protein: 20, carbs: 5, fat: 8 },
    instructions: [
      "In a bowl, whisk together 4 egg whites and 1 whole egg (for added flavor) with a pinch of salt and pepper. Set aside.",
      "Heat 1 tablespoon of olive oil in a non-stick skillet over medium heat. Add sliced mushrooms and cook for 2-3 minutes until they release their moisture and begin to brown.",
      "Add a handful of cherry tomatoes (halved) and a handful of fresh spinach to the skillet. Sauté for another 1-2 minutes until the tomatoes soften and spinach wilts.",
      "Pour the egg mixture over the vegetables in the pan. Let it sit for a few seconds, then gently stir and scramble the eggs with the veggies until the eggs are cooked through but still tender, about 2-3 minutes.",
      "Remove from heat and serve the egg white veggie scramble immediately. This high-protein scramble is great for breakfast or any quick meal."
    ]
  },
  {
    id: 74,
    name: "Steak with Roasted Vegetables",
    category: "High-Protein",
    cuisine: "American",
    timeMinutes: 40,
    ingredients: [
      "Steak (sirloin or ribeye)",
      "Broccoli",
      "Carrots",
      "Olive oil",
      "Rosemary",
      "Garlic powder",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 500, protein: 40, carbs: 20, fat: 30 },
    instructions: [
      "Preheat your oven to 400°F (200°C). On a baking sheet, toss broccoli florets and carrot chunks with olive oil, salt, and pepper. Spread them out and roast for about 20-25 minutes, stirring halfway, until tender and lightly browned.",
      "Meanwhile, season the steak on both sides with salt, pepper, garlic powder, and a little chopped rosemary (optional).",
      "Heat a skillet (or grill pan) over medium-high heat. Add a drizzle of olive oil. Once hot, place the steak in the pan.",
      "Cook the steak for about 4-5 minutes per side for medium (time will vary depending on thickness and desired doneness). Remove steak from heat and let it rest on a cutting board for 5 minutes to retain juices.",
      "Slice the steak against the grain. Serve the sliced steak alongside the roasted vegetables. Spoon any pan juices over the steak for extra flavor."
    ]
  },
  {
    id: 75,
    name: "Protein-Packed Burrito Bowl",
    category: "High-Protein",
    cuisine: "Mexican",
    timeMinutes: 30,
    ingredients: [
      "Chicken breast",
      "Brown rice",
      "Black beans",
      "Corn",
      "Bell pepper",
      "Tomato",
      "Avocado",
      "Taco seasoning",
      "Olive oil",
      "Salt"
    ],
    macros: { calories: 500, protein: 35, carbs: 50, fat: 15 },
    instructions: [
      "Cook 1 cup of brown rice according to package instructions. While the rice is cooking, season the chicken breast with taco seasoning (or a mix of chili powder, cumin, garlic powder) and a pinch of salt.",
      "Heat 1 tablespoon of olive oil in a skillet over medium-high heat. Add the chicken breast and cook for about 5-6 minutes per side, until cooked through. Remove and let it rest, then cut into bite-sized pieces or strips.",
      "In the same skillet, add a little more oil if needed and sauté diced bell pepper for 3-4 minutes until tender. Warm up a can of black beans (drained) and a cup of corn (frozen or canned) in the skillet with the peppers, seasoning them lightly with salt and pepper.",
      "Assemble the burrito bowl: start with a base of brown rice, then add the cooked chicken, black beans, corn, and bell peppers. Top with diced tomato and avocado slices.",
      "You can add salsa or a squeeze of lime on top for extra flavor. Serve the bowl warm."
    ]
  },
  {
    id: 76,
    name: "Shrimp Stir-Fry with Brown Rice",
    category: "High-Protein",
    cuisine: "Chinese",
    timeMinutes: 25,
    ingredients: [
      "Shrimp",
      "Brown rice",
      "Bell pepper",
      "Broccoli",
      "Soy sauce",
      "Garlic",
      "Ginger",
      "Olive oil",
      "Cornstarch",
      "Salt"
    ],
    macros: { calories: 400, protein: 30, carbs: 45, fat: 8 },
    instructions: [
      "Cook 1 cup of brown rice according to package directions and set aside (or use pre-cooked rice).",
      "In a bowl, toss the shrimp with 1 teaspoon of cornstarch, a pinch of salt, and a minced clove of garlic. This will help give the shrimp a nice texture when cooked.",
      "Heat 1-2 tablespoons of olive oil in a large skillet or wok over high heat. Add the shrimp and cook for about 1-2 minutes per side until they turn pink and are just cooked through. Remove the shrimp and set aside.",
      "In the same pan, add a bit more oil if needed and stir-fry chopped bell pepper and broccoli florets for about 3-4 minutes until crisp-tender.",
      "Return the shrimp to the pan. Add a tablespoon or two of soy sauce and a teaspoon of grated ginger. Toss everything together for another minute on the heat to coat the shrimp and veggies in the sauce.",
      "Serve the shrimp and vegetables over the cooked brown rice."
    ]
  },
  {
    id: 77,
    name: "Lentil and Quinoa Salad with Feta",
    category: "High-Protein",
    cuisine: "Mediterranean",
    timeMinutes: 30,
    ingredients: [
      "Brown lentils",
      "Quinoa",
      "Cucumber",
      "Tomato",
      "Feta cheese",
      "Parsley",
      "Olive oil",
      "Lemon",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 350, protein: 15, carbs: 50, fat: 10 },
    instructions: [
      "Rinse 1/2 cup of brown lentils and 1/2 cup of quinoa. Cook them separately: simmer lentils in water or broth for about 20-25 minutes until tender (but not mushy), and cook quinoa in a separate pot (usually 1 cup water for 1/2 cup quinoa, about 15 minutes). Drain any excess water.",
      "Let the lentils and quinoa cool slightly. In a large bowl, combine the cooked lentils and quinoa.",
      "Add diced cucumber, diced tomato, and chopped fresh parsley to the bowl. Crumble feta cheese on top.",
      "Drizzle with olive oil and squeeze the juice of one lemon over the salad. Season with salt and black pepper to taste.",
      "Toss everything gently to combine. This salad can be served slightly warm or chilled, and it's packed with protein from the lentils, quinoa, and feta."
    ]
  },
  {
    id: 78,
    name: "Tuna and White Bean Salad",
    category: "High-Protein",
    cuisine: "Mediterranean",
    timeMinutes: 10,
    ingredients: [
      "Canned tuna",
      "Cannellini beans",
      "Cherry tomatoes",
      "Red onion",
      "Parsley",
      "Olive oil",
      "Lemon juice",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 300, protein: 25, carbs: 20, fat: 12 },
    instructions: [
      "Open and drain a can of tuna and a can of cannellini (white) beans. Add them to a mixing bowl.",
      "Add a handful of cherry tomatoes (halved) and some finely chopped red onion to the bowl.",
      "Chop a small bunch of fresh parsley and add it in.",
      "Drizzle with 2 tablespoons of olive oil and the juice of half a lemon. Season with salt and pepper.",
      "Toss everything together gently, breaking up the tuna into flakes and mixing with the beans and vegetables. Serve as is, or on a bed of lettuce. This salad is a quick high-protein meal."
    ]
  },
  {
    id: 79,
    name: "Turkey & Sweet Potato Chili",
    category: "High-Protein",
    cuisine: "American",
    timeMinutes: 50,
    ingredients: [
      "Ground turkey",
      "Sweet potato",
      "Kidney beans",
      "Tomato sauce",
      "Onion",
      "Chili powder",
      "Cumin",
      "Olive oil",
      "Garlic",
      "Salt"
    ],
    macros: { calories: 400, protein: 30, carbs: 35, fat: 10 },
    instructions: [
      "In a large pot, heat 1 tablespoon of olive oil over medium heat. Add a diced onion and cook for 3-4 minutes until softened. Add minced garlic (2 cloves) and cook another 30 seconds.",
      "Add the ground turkey to the pot, breaking it up with a spoon. Cook until it's no longer pink and beginning to brown.",
      "Stir in 2 tablespoons of chili powder and 1 teaspoon of cumin. Cook with the turkey for a minute. Then add one medium sweet potato, peeled and cut into small cubes.",
      "Pour in a can of tomato sauce (about 15 oz) and one can of kidney beans (drained). Add a cup of water or broth to ensure there's enough liquid. Stir everything to combine.",
      "Bring to a simmer, then cover and cook for about 20 minutes, stirring occasionally, until the sweet potatoes are tender.",
      "Season with salt and pepper to taste. Serve the chili hot in bowls. This chili is high in protein from the turkey and beans, and the sweet potato adds fiber and nutrients."
    ]
  },
  {
    id: 80,
    name: "Banana Oat Protein Pancakes",
    category: "High-Protein",
    cuisine: "American",
    timeMinutes: 20,
    ingredients: [
      "Banana",
      "Eggs",
      "Rolled oats",
      "Baking powder",
      "Cinnamon",
      "Vanilla extract",
      "Greek yogurt",
      "Berries"
    ],
    macros: { calories: 350, protein: 20, carbs: 45, fat: 8 },
    instructions: [
      "In a blender, combine 1 ripe banana, 2 eggs, 1/4 cup of rolled oats, 1/2 teaspoon baking powder, a pinch of cinnamon, and a drop of vanilla extract. Blend until you have a mostly smooth batter.",
      "Heat a non-stick skillet or griddle over medium heat. Lightly grease with cooking spray or a bit of butter.",
      "Pour batter onto the skillet to form pancakes (about 1/4 cup of batter for each pancake). Cook for 2-3 minutes until bubbles form on the surface and the edges look set, then flip and cook another 1-2 minutes until golden brown.",
      "Repeat with remaining batter. This should make about 4-6 small pancakes.",
      "Serve the pancakes warm. You can top them with a dollop of Greek yogurt and fresh berries for extra protein and flavor."
    ]
  },

  // Vegan Recipes
  {
    id: 81,
    name: "Vegan Buddha Bowl",
    category: "Vegan",
    cuisine: "Fusion",
    timeMinutes: 30,
    ingredients: [
      "Quinoa",
      "Sweet potato",
      "Chickpeas",
      "Spinach (or kale)",
      "Avocado",
      "Tahini",
      "Lemon",
      "Olive oil",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 500, protein: 15, carbs: 60, fat: 20 },
    instructions: [
      "Preheat oven to 400°F (200°C). Peel and dice a sweet potato into cubes. Toss the cubes with a bit of olive oil, salt, and pepper on a baking sheet. Roast for about 20-25 minutes until tender.",
      "Rinse and drain a can of chickpeas. Pat them dry, then toss in a little olive oil, salt, and pepper (you can add spices like paprika or cumin if desired). Spread on a baking sheet and roast in the oven alongside the sweet potatoes for 20 minutes, until slightly crispy.",
      "Meanwhile, cook 1/2 cup of quinoa in 1 cup of water (bring to boil, then simmer about 15 minutes) until fluffy. Set aside.",
      "Prepare the tahini dressing by mixing 2 tablespoons of tahini with the juice of half a lemon, a drizzle of olive oil, and a little warm water to thin. Stir until smooth and creamy.",
      "Assemble the Buddha bowl: in a bowl, add a scoop of cooked quinoa, a handful of fresh spinach or kale, the roasted sweet potato cubes, and roasted chickpeas. Add sliced avocado on top.",
      "Drizzle the tahini-lemon dressing over everything. Enjoy this colorful, nourishing bowl."
    ]
  },
  {
    id: 82,
    name: "Vegan Tofu Veggie Stir-Fry",
    category: "Vegan",
    cuisine: "Chinese",
    timeMinutes: 25,
    ingredients: [
      "Tofu",
      "Broccoli",
      "Bell pepper",
      "Carrot",
      "Soy sauce (or tamari)",
      "Garlic",
      "Ginger",
      "Sesame oil",
      "Brown rice"
    ],
    macros: { calories: 350, protein: 15, carbs: 50, fat: 10 },
    instructions: [
      "Press the tofu for 10-15 minutes to remove excess moisture, then cut into cubes. In a large skillet or wok, heat 1 tablespoon of sesame oil over medium-high heat.",
      "Add the tofu cubes and fry until golden brown on most sides, about 5-6 minutes. Remove tofu and set aside.",
      "In the same pan, add a bit more oil if needed. Add minced garlic (2 cloves) and grated ginger (1 tsp), stir-frying for 30 seconds until fragrant.",
      "Add broccoli florets, sliced bell pepper, and thinly sliced carrot. Stir-fry for 3-5 minutes until the vegetables are tender but still crisp.",
      "Return the tofu to the pan. Pour in 2-3 tablespoons of soy sauce or tamari and toss everything together, cooking for another 1-2 minutes so the tofu and veggies absorb the sauce.",
      "Serve the tofu veggie stir-fry over cooked brown rice for a complete meal."
    ]
  },
  {
    id: 83,
    name: "Vegan Lentil Shepherd's Pie",
    category: "Vegan",
    cuisine: "British",
    timeMinutes: 60,
    ingredients: [
      "Brown or green lentils",
      "Onion",
      "Carrots",
      "Peas",
      "Tomato paste",
      "Vegetable broth",
      "Potatoes",
      "Olive oil",
      "Thyme",
      "Salt"
    ],
    macros: { calories: 400, protein: 15, carbs: 60, fat: 8 },
    instructions: [
      "Preheat oven to 375°F (190°C). Peel and chop potatoes, then boil them in a pot of water until soft (about 15 minutes). Drain and mash the potatoes with a splash of olive oil, salt, and pepper. Set aside.",
      "In a large skillet, heat 2 tablespoons of olive oil over medium heat. Add a diced onion and diced carrots, cooking for 5-7 minutes until they soften. Stir in 2 tablespoons of tomato paste and 1 teaspoon of dried thyme, cooking for 1 minute.",
      "Add 1 cup of lentils to the skillet along with 2 cups of vegetable broth. Bring to a simmer and cook for about 20 minutes, until the lentils are tender. If using canned lentils (drained), you can reduce the simmer time to 5-10 minutes.",
      "Stir in a cup of peas (frozen is fine) and cook for another 2 minutes. Add salt and pepper to taste. This is your lentil filling.",
      "Transfer the lentil and veggie filling to a baking dish. Spoon the mashed potatoes over the top of the filling, spreading it evenly. You can rough up the surface of the potatoes with a fork for a rustic look.",
      "Bake in the preheated oven for 15-20 minutes, until the top is slightly golden. Let it cool for a few minutes before serving this hearty vegan shepherd's pie."
    ]
  },
  {
    id: 84,
    name: "Roasted Cauliflower Tacos",
    category: "Vegan",
    cuisine: "Mexican",
    timeMinutes: 30,
    ingredients: [
      "Cauliflower",
      "Taco seasoning",
      "Olive oil",
      "Corn tortillas",
      "Red cabbage",
      "Avocado",
      "Cilantro",
      "Lime",
      "Salt"
    ],
    macros: { calories: 300, protein: 10, carbs: 40, fat: 12 },
    instructions: [
      "Preheat oven to 425°F (220°C). Cut a head of cauliflower into small florets. Toss them in a bowl with 2 tablespoons of olive oil, 2 tablespoons of taco seasoning (a mix of chili powder, cumin, garlic powder, etc.), and a pinch of salt.",
      "Spread the seasoned cauliflower on a baking sheet and roast for 20-25 minutes, until golden and tender, stirring once halfway through.",
      "While the cauliflower is roasting, prepare the taco toppings: thinly slice some red cabbage and toss it with a squeeze of lime and pinch of salt (quick slaw). Slice an avocado and chop some fresh cilantro.",
      "Warm the corn tortillas in a dry skillet or microwave so they're pliable.",
      "Assemble the tacos: fill each tortilla with some of the roasted cauliflower, top with a bit of the cabbage slaw, a slice or two of avocado, and a sprinkle of cilantro. Add an extra squeeze of lime on top if desired.",
      "Serve the tacos immediately while the cauliflower is warm."
    ]
  },
  {
    id: 85,
    name: "Vegan Pad Thai with Tofu",
    category: "Vegan",
    cuisine: "Thai",
    timeMinutes: 30,
    ingredients: [
      "Rice noodles",
      "Tofu",
      "Carrot",
      "Bean sprouts",
      "Peanuts",
      "Soy sauce",
      "Lime",
      "Garlic",
      "Brown sugar",
      "Green onions"
    ],
    macros: { calories: 450, protein: 15, carbs: 60, fat: 15 },
    instructions: [
      "Cook rice noodles according to package instructions (typically soak in hot water for about 5-10 minutes until softened) then drain and set aside.",
      "Press and cube the tofu. In a pan, heat a bit of oil over medium-high heat and fry the tofu until golden on all sides. Remove and set aside.",
      "In the same pan, add a little more oil and sauté minced garlic for 30 seconds. Add a julienned carrot and a handful of bean sprouts, cooking for 2 minutes.",
      "Push the veggies to the side. In the pan, pour in a simple Pad Thai sauce: mix 3 tablespoons soy sauce, 1 tablespoon brown sugar (or palm sugar), and juice of half a lime. (Traditional Pad Thai uses tamarind, but this is a simplified version.)",
      "Add the drained rice noodles to the pan and toss to coat them in the sauce. Return the fried tofu to the pan and mix everything together. Cook for another 1-2 minutes, until the noodles are hot and well coated.",
      "Serve the pad thai with chopped peanuts and sliced green onions sprinkled on top, plus extra lime wedges on the side for squeezing."
    ]
  },

  // Mediterranean Recipes
  {
    id: 86,
    name: "Greek Chicken Souvlaki with Tzatziki",
    category: "Mediterranean",
    cuisine: "Greek",
    timeMinutes: 45,
    ingredients: [
      "Chicken breast",
      "Olive oil",
      "Lemon",
      "Garlic",
      "Oregano",
      "Yogurt",
      "Cucumber",
      "Dill",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 400, protein: 30, carbs: 10, fat: 25 },
    instructions: [
      "Cut the chicken breast into bite-sized pieces for skewers. In a bowl, make a marinade with 2 tablespoons olive oil, juice of one lemon, 2 minced garlic cloves, 1 teaspoon dried oregano, salt, and pepper. Add the chicken pieces and toss to coat. Let marinate for at least 15 minutes (or up to overnight in the fridge).",
      "If using wooden skewers, soak them in water for a few minutes. Thread the marinated chicken onto skewers.",
      "Grill the chicken skewers on a preheated grill or grill pan over medium-high heat, about 4-5 minutes per side, until cooked through and slightly charred.",
      "Meanwhile, prepare the tzatziki sauce: grate 1/2 a cucumber and squeeze out excess water. In a bowl, mix the cucumber with 1 cup of Greek yogurt, a minced garlic clove, a squeeze of lemon juice, a drizzle of olive oil, and a pinch of salt. Add chopped fresh dill or mint if available. Stir well.",
      "Serve the hot grilled chicken souvlaki with the cool tzatziki sauce on the side. You can accompany it with pita bread and a Greek salad if desired."
    ]
  },
  {
    id: 87,
    name: "Mediterranean Grilled Salmon with Quinoa",
    category: "Mediterranean",
    cuisine: "Mediterranean",
    timeMinutes: 30,
    ingredients: [
      "Salmon fillets",
      "Quinoa",
      "Cherry tomatoes",
      "Cucumber",
      "Feta cheese",
      "Olive oil",
      "Lemon",
      "Oregano",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 500, protein: 35, carbs: 30, fat: 30 },
    instructions: [
      "Rinse and cook 1 cup of quinoa in 2 cups of water (bring to a boil, then simmer 15 minutes) until fluffy. Set aside and fluff with a fork.",
      "Season the salmon fillets with salt, pepper, dried oregano, and a drizzle of olive oil. Heat a grill pan or skillet over medium-high heat. Cook the salmon for about 4 minutes per side, or until it flakes easily with a fork. Squeeze a bit of lemon juice over the salmon after cooking.",
      "In a bowl, combine halved cherry tomatoes, diced cucumber, and crumbled feta cheese. Drizzle with olive oil and a little lemon juice, and toss gently to make a quick Mediterranean salsa.",
      "Serve the grilled salmon fillets over a bed of cooked quinoa. Top with the tomato-cucumber-feta mixture.",
      "Garnish with additional lemon wedges for squeezing. Enjoy the salmon immediately for best flavor."
    ]
  },
  {
    id: 88,
    name: "Quinoa Chickpea Tabbouleh Salad",
    category: "Mediterranean",
    cuisine: "Middle Eastern",
    timeMinutes: 25,
    ingredients: [
      "Quinoa",
      "Chickpeas",
      "Parsley",
      "Tomato",
      "Cucumber",
      "Lemon",
      "Olive oil",
      "Mint",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 300, protein: 10, carbs: 45, fat: 8 },
    instructions: [
      "Cook 3/4 cup of quinoa in 1.5 cups of water (bring to a boil, then simmer about 15 minutes) until tender, then fluff and let cool slightly.",
      "In a large bowl, combine the cooked quinoa with a can of chickpeas (drained and rinsed).",
      "Add lots of chopped fresh parsley (at least 1 cup, packed) and a handful of chopped fresh mint. Mix in diced tomato and cucumber.",
      "Drizzle with 3 tablespoons of olive oil and the juice of one lemon. Season with salt and pepper to taste.",
      "Toss the tabbouleh salad to combine all ingredients. This refreshing salad can be served chilled or at room temperature."
    ]
  },
  {
    id: 89,
    name: "One-Pan Mediterranean Chicken",
    category: "Mediterranean",
    cuisine: "Mediterranean",
    timeMinutes: 40,
    ingredients: [
      "Chicken thighs",
      "Cherry tomatoes",
      "Kalamata olives",
      "Red onion",
      "Garlic",
      "Olive oil",
      "Oregano",
      "Rosemary",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 350, protein: 30, carbs: 10, fat: 20 },
    instructions: [
      "Preheat oven to 400°F (200°C). In a large ovenproof skillet or baking dish, arrange chicken thighs (bone-in or boneless) and drizzle with olive oil.",
      "Add cherry tomatoes (a cup or two) and a handful of pitted Kalamata olives around the chicken. Scatter some sliced red onion and a few whole garlic cloves (peeled) in the pan.",
      "Season everything with salt, pepper, and a teaspoon of dried oregano. If you have rosemary, add a sprig or sprinkle dried rosemary as well.",
      "Roast in the preheated oven for about 30-35 minutes, until the chicken is cooked through (internal temp ~165°F and juices run clear) and the tomatoes have burst and released their juices.",
      "Spoon some of the flavorful pan juices over the chicken when serving. This one-pan Mediterranean chicken is great with a side of rice or bread to soak up the sauce."
    ]
  },
  {
    id: 90,
    name: "Mediterranean Veggie Kabobs with Couscous",
    category: "Mediterranean",
    cuisine: "Middle Eastern",
    timeMinutes: 30,
    ingredients: [
      "Zucchini",
      "Bell pepper",
      "Red onion",
      "Mushrooms",
      "Olive oil",
      "Garlic powder",
      "Cherry tomatoes",
      "Couscous",
      "Lemon",
      "Salt"
    ],
    macros: { calories: 300, protein: 8, carbs: 45, fat: 8 },
    instructions: [
      "Preheat a grill or grill pan to medium-high heat. Cut zucchini, bell pepper, red onion, and mushrooms into bite-sized pieces suitable for skewering. Thread the vegetables onto skewers, alternating types. Add a couple of cherry tomatoes onto each skewer as well.",
      "Brush the vegetable kabobs with olive oil and season with garlic powder, salt, and pepper (and any other herbs like oregano or thyme if desired).",
      "Grill the veggie kabobs for about 8-10 minutes, turning occasionally, until the vegetables are tender and have light char marks.",
      "Meanwhile, prepare the couscous: in a heatproof bowl, combine 1 cup of dry couscous with a pinch of salt and a drizzle of olive oil. Pour 1 cup of boiling water (or hot vegetable broth) over the couscous, cover the bowl, and let sit for 5 minutes. Fluff with a fork and stir in a squeeze of lemon juice.",
      "Serve the grilled vegetable skewers over a bed of couscous. You can drizzle a little extra olive oil or lemon juice on top for added flavor."
    ]
  },

  // Gluten-Free Recipes
  {
    id: 91,
    name: "Zucchini Lasagna (Gluten-Free)",
    category: "Gluten-Free",
    cuisine: "Italian",
    timeMinutes: 60,
    ingredients: [
      "Zucchini",
      "Ground beef",
      "Ricotta cheese",
      "Mozzarella cheese",
      "Parmesan cheese",
      "Tomato sauce",
      "Onion",
      "Garlic",
      "Italian seasoning",
      "Salt"
    ],
    macros: { calories: 380, protein: 25, carbs: 15, fat: 25 },
    instructions: [
      "Preheat oven to 375°F (190°C). Slice zucchini lengthwise into thin strips (these will be your 'noodles'). You can use a mandoline or a knife. Lightly salt the zucchini slices and set them aside for 10 minutes, then blot with a paper towel to remove excess moisture.",
      "In a skillet, heat a bit of oil over medium heat. Sauté a diced onion and minced garlic until softened. Add the ground beef and cook until browned, breaking it up (about 5-7 minutes). Drain excess fat.",
      "Stir in Italian seasoning and a jar (or about 2 cups) of tomato sauce. Simmer for 5 minutes. Season with salt and pepper to taste. This is your meat sauce.",
      "In a bowl, mix 1 cup of ricotta cheese with 1/4 cup grated Parmesan and a pinch of salt (you can also add an egg to help bind, optional).",
      "Assemble the lasagna in a baking dish: start with a thin layer of meat sauce, then a layer of zucchini slices (overlap slightly), spread a layer of the ricotta mixture, then sprinkle some shredded mozzarella. Repeat layers (sauce, zucchini, ricotta, mozzarella) until you fill the dish, ending with sauce and mozzarella on top.",
      "Bake the zucchini lasagna for about 30 minutes, until bubbly and the cheese on top is melted and lightly golden. Let it cool for 5-10 minutes before slicing and serving."
    ]
  },
  {
    id: 92,
    name: "Almond-Crusted Chicken Tenders",
    category: "Gluten-Free",
    cuisine: "American",
    timeMinutes: 30,
    ingredients: [
      "Chicken tenders",
      "Almond flour",
      "Eggs",
      "Paprika",
      "Garlic powder",
      "Olive oil",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 300, protein: 28, carbs: 5, fat: 18 },
    instructions: [
      "Preheat oven to 400°F (200°C). Line a baking sheet with parchment paper or lightly grease it.",
      "Set up a breading station: in one bowl, beat 2 eggs. In another bowl, mix 1 cup of almond flour with 1 teaspoon paprika, 1/2 teaspoon garlic powder, 1/2 teaspoon salt, and 1/4 teaspoon black pepper.",
      "Dip each chicken tender in the beaten eggs, then roll it in the almond flour mixture to coat well. Place the coated tenders on the prepared baking sheet.",
      "Lightly drizzle or spray the coated chicken tenders with olive oil (this helps them crisp up).",
      "Bake for about 15-20 minutes, flipping halfway through, until the chicken tenders are golden brown and cooked through (juices run clear).",
      "Serve these gluten-free almond-crusted chicken tenders with your favorite dipping sauce."
    ]
  },
  {
    id: 93,
    name: "Chicken Zoodle Soup",
    category: "Gluten-Free",
    cuisine: "American",
    timeMinutes: 30,
    ingredients: [
      "Chicken breast",
      "Zucchini",
      "Carrots",
      "Celery",
      "Onion",
      "Chicken broth",
      "Olive oil",
      "Bay leaf",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 200, protein: 20, carbs: 10, fat: 8 },
    instructions: [
      "Spiralize 2 zucchinis into 'zoodles' and set aside. (These will be the noodle substitute.)",
      "In a pot, heat 1 tablespoon of olive oil over medium heat. Add a diced onion, 2 sliced carrots, and 2 sliced celery stalks. Sauté for 5 minutes until the veggies soften slightly.",
      "Add 1 boneless, skinless chicken breast (cut into small pieces) to the pot. Cook for 4-5 minutes, stirring, until the chicken pieces are lightly browned on the outside.",
      "Pour in 4 cups of chicken broth. Add a bay leaf and bring the soup to a boil, then reduce to a simmer. Cook for about 10 minutes, or until the chicken is cooked through and the vegetables are tender.",
      "Remove the bay leaf. Stir in the zucchini noodles and let them simmer in the hot soup for 2-3 minutes, until just tender but not mushy.",
      "Season the soup with salt and pepper to taste. Serve hot. This comforting chicken zoodle soup has all the flavors of classic chicken noodle soup, without the gluten."
    ]
  },
  {
    id: 94,
    name: "BBQ Chicken Stuffed Sweet Potatoes",
    category: "Gluten-Free",
    cuisine: "American",
    timeMinutes: 45,
    ingredients: [
      "Sweet potatoes",
      "Chicken breast",
      "BBQ sauce (gluten-free)",
      "Red onion",
      "Cheddar cheese",
      "Olive oil",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 450, protein: 25, carbs: 50, fat: 15 },
    instructions: [
      "Preheat oven to 400°F (200°C). Scrub 2-4 sweet potatoes and prick them a few times with a fork. Place them on a baking sheet and bake for about 40 minutes, or until tender when pierced with a knife.",
      "While the sweet potatoes are baking, cook the chicken: season a chicken breast with salt and pepper. Heat a skillet with a little olive oil over medium heat and cook the chicken for ~6-7 minutes per side until cooked through. Shred the cooked chicken using two forks.",
      "In a bowl, toss the shredded chicken with about 1/2 cup of gluten-free BBQ sauce (ensure the sauce is gluten-free).",
      "When the sweet potatoes are done, let them cool slightly, then slice each one open lengthwise (not cutting all the way through). Gently fluff the inside of the potato with a fork.",
      "Stuff each sweet potato with the BBQ shredded chicken. Top with a sprinkle of shredded cheddar cheese and a few thin slices of red onion.",
      "Return the stuffed potatoes to the oven for 5 minutes, or until the cheese is melted. Serve warm (you can add a dollop of sour cream or chopped cilantro on top, if desired)."
    ]
  },
  {
    id: 95,
    name: "Gluten-Free Fish Tacos",
    category: "Gluten-Free",
    cuisine: "Mexican",
    timeMinutes: 25,
    ingredients: [
      "White fish (cod or tilapia)",
      "Corn tortillas",
      "Cabbage",
      "Lime",
      "Chili powder",
      "Cumin",
      "Garlic powder",
      "Olive oil",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 320, protein: 20, carbs: 30, fat: 15 },
    instructions: [
      "In a small bowl, mix 1 teaspoon chili powder, 1/2 teaspoon cumin, 1/2 teaspoon garlic powder, 1/2 teaspoon salt, and a pinch of black pepper. Rub this spice mixture over both sides of the fish fillets.",
      "Heat 1-2 tablespoons of olive oil in a skillet over medium-high heat. Add the seasoned fish and cook for about 3-4 minutes per side, or until the fish is cooked through and flakes easily. Remove from heat and flake the fish into large chunks.",
      "Warm corn tortillas in a pan or microwave to make them pliable.",
      "Assemble the tacos: place some flaked fish onto each corn tortilla. Top with a handful of shredded cabbage.",
      "Squeeze fresh lime juice over the filling. You can also add other toppings like fresh cilantro, diced tomatoes, or a spoon of salsa as desired, all of which are typically gluten-free.",
      "Serve the fish tacos immediately while the fish is warm. Enjoy with extra lime wedges on the side."
    ]
  },

  // Paleo Recipes
  {
    id: 96,
    name: "Hearty Beef Stew (Paleo)",
    category: "Paleo",
    cuisine: "American",
    timeMinutes: 120,
    ingredients: [
      "Stew beef chunks",
      "Sweet potatoes",
      "Carrots",
      "Celery",
      "Onion",
      "Beef broth",
      "Tomato paste",
      "Garlic",
      "Thyme",
      "Salt"
    ],
    macros: { calories: 400, protein: 30, carbs: 20, fat: 20 },
    instructions: [
      "Heat 2 tablespoons of oil in a large pot or Dutch oven over medium-high heat. Season the stew beef chunks with salt and pepper. Add them to the pot and brown on all sides (do this in batches if needed). Remove the beef and set aside.",
      "In the same pot, add a diced onion and sauté for 3-4 minutes. Add chopped carrots and celery, cooking for another 3 minutes. Add minced garlic (2 cloves) and cook 30 seconds more.",
      "Stir in 2 tablespoons of tomato paste and a teaspoon of dried thyme (or a few sprigs of fresh thyme). Cook for 1 minute with the vegetables.",
      "Return the browned beef to the pot. Pour in about 4 cups of beef broth, scraping up any browned bits from the bottom. Add two peeled, chopped sweet potatoes to the stew.",
      "Bring to a boil, then reduce heat to low, cover, and simmer for about 1.5 hours (90 minutes), or until the beef is very tender. Stir occasionally. If the stew gets too thick, add a bit more broth or water.",
      "Taste and adjust seasoning with salt and pepper. Serve the hearty beef stew hot. (It's Paleo-friendly with no flour or grains used for thickening.)"
    ]
  },
  {
    id: 97,
    name: "Sweet Potato & Beef Chili (Paleo)",
    category: "Paleo",
    cuisine: "American",
    timeMinutes: 60,
    ingredients: [
      "Ground beef",
      "Sweet potatoes",
      "Tomato sauce",
      "Onion",
      "Bell pepper",
      "Chili powder",
      "Cumin",
      "Garlic powder",
      "Olive oil",
      "Salt"
    ],
    macros: { calories: 450, protein: 25, carbs: 30, fat: 25 },
    instructions: [
      "In a large pot or Dutch oven, heat 1 tablespoon of olive oil over medium heat. Add a diced onion and chopped bell pepper, cooking for 5 minutes until softened.",
      "Add 2 cloves minced garlic (or 1/2 teaspoon garlic powder) and cook for 30 seconds. Then add the ground beef. Cook, breaking it up with a spoon, until the beef is browned, about 5-7 minutes. Drain any excess fat if necessary.",
      "Stir in 2 tablespoons of chili powder and 1 teaspoon of cumin. Cook with the beef for a minute.",
      "Add one large sweet potato, peeled and cut into small cubes. Pour in a can of tomato sauce (15 oz) and one cup of water or beef broth. Stir to combine.",
      "Bring the chili to a simmer, then reduce heat to low. Cover and let it simmer for about 25-30 minutes, until the sweet potato pieces are tender and the chili has thickened. Stir occasionally to prevent sticking.",
      "Season with salt and pepper to taste. Serve the paleo chili hot. (Note: This chili is bean-free, using sweet potatoes for heartiness.)"
    ]
  },
  {
    id: 98,
    name: "Sweet Potato Breakfast Hash (Paleo)",
    category: "Paleo",
    cuisine: "American",
    timeMinutes: 30,
    ingredients: [
      "Sweet potatoes",
      "Eggs",
      "Bell pepper",
      "Onion",
      "Olive oil",
      "Smoked paprika",
      "Garlic powder",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 300, protein: 15, carbs: 30, fat: 15 },
    instructions: [
      "Peel and dice 2 sweet potatoes into small cubes (about 1/2-inch pieces). Dice a bell pepper and half an onion.",
      "Heat 2 tablespoons of olive oil in a large skillet over medium heat. Add the sweet potato cubes and onion. Cook for about 10 minutes, stirring occasionally, until the sweet potatoes start to soften and brown. If they begin to stick, you can add a splash of water.",
      "Add the diced bell pepper to the skillet. Season the mixture with 1 teaspoon of smoked paprika, 1/2 teaspoon of garlic powder, salt, and pepper. Cook for another 5 minutes, until the bell pepper is tender and sweet potatoes are fully cooked (easily pierced with a fork).",
      "Using a spoon, make small wells in the hash and crack eggs into each well (use 2-4 eggs, depending on servings). Cover the skillet and cook for 3-5 minutes, or until the egg whites are set and yolks are cooked to your liking.",
      "Remove from heat. Serve the sweet potato hash with eggs immediately. This hearty breakfast is paleo-friendly and very satisfying."
    ]
  },
  {
    id: 99,
    name: "Burger Bowl with Sweet Potato Fries (Paleo)",
    category: "Paleo",
    cuisine: "American",
    timeMinutes: 35,
    ingredients: [
      "Ground beef",
      "Lettuce",
      "Tomato",
      "Avocado",
      "Sweet potatoes",
      "Olive oil",
      "Garlic powder",
      "Onion powder",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 500, protein: 25, carbs: 30, fat: 30 },
    instructions: [
      "Preheat oven to 425°F (220°C). Cut sweet potatoes into thin fry shapes. Toss them with olive oil, garlic powder, onion powder, salt, and pepper. Spread them on a baking sheet in a single layer and bake for 20-25 minutes, flipping halfway, until golden and crispy on edges.",
      "Meanwhile, form the ground beef into patties or simply cook it crumbled. Season with salt and pepper (and a pinch of garlic/onion powder if desired). In a skillet over medium-high heat, cook the beef patties for about 4-5 minutes per side (or cook the crumbled beef until browned).",
      "Assemble the burger bowl: start with a bed of lettuce in each bowl. Add cherry tomatoes or diced tomato and sliced avocado.",
      "Place the cooked burger patty (or a portion of cooked ground beef) on top of the salad. You can add any other burger fixings you like (such as grilled onions, pickles, etc.) as long as they are paleo-friendly.",
      "Serve with a side of the baked sweet potato fries. You can drizzle the bowl with a simple dressing like olive oil and vinegar, or enjoy as is with the creaminess of the avocado. No bun needed for this satisfying burger meal!"
    ]
  },
  {
    id: 100,
    name: "Grilled Steak with Chimichurri",
    category: "Paleo",
    cuisine: "Argentinian",
    timeMinutes: 25,
    ingredients: [
      "Steak (sirloin or flank)",
      "Parsley",
      "Garlic",
      "Olive oil",
      "Red wine vinegar",
      "Oregano",
      "Red chili flakes",
      "Salt",
      "Black pepper"
    ],
    macros: { calories: 400, protein: 30, carbs: 5, fat: 30 },
    instructions: [
      "Season the steak on both sides with salt and pepper. Preheat a grill or grill pan to medium-high heat. Grill the steak for about 4-5 minutes per side (for medium-rare, depending on thickness) or until it reaches your desired doneness. Let the steak rest for 5 minutes after grilling.",
      "While the steak cooks, prepare the chimichurri sauce. Finely chop a large handful of fresh parsley and place in a bowl. Add 2-3 cloves of minced garlic.",
      "Stir in 1/4 cup of olive oil, 2 tablespoons of red wine vinegar, 1/2 teaspoon of dried oregano (or fresh if available), a pinch of red chili flakes (optional for heat), and a pinch of salt and pepper.",
      "Mix the chimichurri well and let it sit for a few minutes to allow the flavors to meld.",
      "Slice the rested steak against the grain into strips. Serve the steak with a generous spoonful of chimichurri sauce on top. This simple dish is packed with flavor and is completely paleo-friendly."
    ]
  },
  {
    id: 56,
    name: "Tofu Scramble",
    category: "Vegan",
    cuisine: "American",
    timeMinutes: 15,
    ingredients: [
      "150 g firm tofu, crumbled",
      "1/4 cup chopped vegetables",
      "1 tbsp nutritional yeast",
      "1 tsp turmeric",
      "1 tbsp olive oil",
      "Salt and pepper"
    ],
    macros: { calories: 320, protein: 20, carbs: 12, fat: 22 },
  },
  {
    id: 57,
    name: "Sweet Potato and Black Bean Bowl",
    category: "Vegan",
    cuisine: "Fusion",
    timeMinutes: 30,
    ingredients: [
      "1 medium sweet potato, roasted",
      "1/2 cup black beans",
      "1/4 avocado, sliced",
      "1/4 cup corn",
      "1 tbsp olive oil",
      "Lime wedge"
    ],
    macros: { calories: 560, protein: 16, carbs: 85, fat: 18 },
  },
  {
    id: 58,
    name: "Spinach and Feta Stuffed Pita",
    category: "Vegetarian",
    cuisine: "Mediterranean",
    timeMinutes: 20,
    ingredients: [
      "1 large pita bread",
      "1 cup fresh spinach",
      "1/4 cup feta cheese",
      "1/4 cup cherry tomatoes",
      "1 tbsp olive oil",
      "Lemon juice"
    ],
    macros: { calories: 480, protein: 18, carbs: 52, fat: 20 },
  },
  {
    id: 59,
    name: "Vegetable Curry with Rice",
    category: "Vegan",
    cuisine: "Indian",
    timeMinutes: 30,
    ingredients: [
      "1 cup mixed vegetables",
      "1/2 cup coconut milk",
      "1 tbsp curry powder",
      "1/4 onion, chopped",
      "1 cup cooked rice",
      "1 tbsp vegetable oil"
    ],
    macros: { calories: 580, protein: 12, carbs: 85, fat: 22 },
  },
  {
    id: 60,
    name: "Avocado Toast with Eggs",
    category: "Vegetarian",
    cuisine: "American",
    timeMinutes: 10,
    ingredients: [
      "2 slices whole grain bread",
      "1/2 avocado, mashed",
      "2 eggs, poached",
      "Salt and pepper",
      "Red pepper flakes",
      "Lemon juice"
    ],
    macros: { calories: 420, protein: 20, carbs: 35, fat: 22 },
  },

  // ---------- SOUPS & ONE-POT ----------
  {
    id: 61,
    name: "Chicken Noodle Soup",
    category: "Chicken",
    cuisine: "American",
    timeMinutes: 30,
    ingredients: [
      "100 g shredded chicken",
      "1 cup chicken broth",
      "1/2 cup egg noodles",
      "1 small carrot, sliced",
      "1/4 onion, chopped",
      "Salt and pepper"
    ],
    macros: { calories: 360, protein: 24, carbs: 40, fat: 10 },
  },
  {
    id: 62,
    name: "Tomato Basil Soup with Grilled Cheese",
    category: "Vegetarian",
    cuisine: "American",
    timeMinutes: 25,
    ingredients: [
      "1 cup tomato soup (canned or homemade)",
      "2 slices bread",
      "1 slice cheddar cheese",
      "1 tsp butter",
      "Fresh basil leaves"
    ],
    macros: { calories: 520, protein: 18, carbs: 50, fat: 24 },
  },
  {
    id: 63,
    name: "Hearty Vegetable Soup",
    category: "Vegan",
    cuisine: "European",
    timeMinutes: 30,
    ingredients: [
      "1 cup vegetable broth",
      "1/2 cup mixed vegetables",
      "1 small potato, diced",
      "1/4 onion, chopped",
      "1 tbsp olive oil",
      "Salt, pepper, herbs"
    ],
    macros: { calories: 320, protein: 8, carbs: 48, fat: 10 },
  },
  {
    id: 64,
    name: "Minestrone Soup",
    category: "Vegetarian",
    cuisine: "Italian",
    timeMinutes: 35,
    ingredients: [
      "1 cup vegetable broth",
      "1/2 cup mixed vegetables",
      "1/4 cup cooked beans",
      "1/4 cup small pasta",
      "1/4 cup tomato sauce",
      "Italian herbs"
    ],
    macros: { calories: 380, protein: 14, carbs: 60, fat: 6 },
  },
  {
    id: 65,
    name: "Thai Green Curry with Vegetables & Rice",
    category: "Vegetarian",
    cuisine: "Thai",
    timeMinutes: 30,
    ingredients: [
      "1/2 cup coconut milk",
      "1 cup mixed vegetables",
      "1 tbsp green curry paste",
      "1 tsp vegetable oil",
      "1 cup cooked rice"
    ],
    macros: { calories: 620, protein: 10, carbs: 80, fat: 26 },
  },
  {
    id: 66,
    name: "Shakshuka (Eggs in Tomato Sauce)",
    category: "Vegetarian",
    cuisine: "Middle Eastern",
    timeMinutes: 25,
    ingredients: [
      "2 eggs",
      "1/2 cup tomato sauce",
      "1/4 onion, chopped",
      "1/4 bell pepper, sliced",
      "1 tbsp olive oil",
      "Paprika, cumin, salt"
    ],
    macros: { calories: 380, protein: 18, carbs: 18, fat: 26 },
  },
  {
    id: 67,
    name: "Beef and Vegetable Soup",
    category: "Beef",
    cuisine: "American",
    timeMinutes: 40,
    ingredients: [
      "150 g beef, diced",
      "1 cup beef broth",
      "1/2 cup mixed vegetables",
      "1 small potato, diced",
      "1/4 onion, chopped",
      "Salt and pepper"
    ],
    macros: { calories: 480, protein: 28, carbs: 42, fat: 20 },
  },
  {
    id: 68,
    name: "Lentil Soup",
    category: "Vegan",
    cuisine: "Mediterranean",
    timeMinutes: 35,
    ingredients: [
      "1/2 cup dried lentils",
      "1 cup vegetable broth",
      "1/2 cup chopped vegetables",
      "1/4 onion, chopped",
      "1 tbsp olive oil",
      "Salt, pepper, herbs"
    ],
    macros: { calories: 420, protein: 20, carbs: 65, fat: 8 },
  },
  {
    id: 69,
    name: "Chicken and Rice Soup",
    category: "Chicken",
    cuisine: "American",
    timeMinutes: 30,
    ingredients: [
      "100 g chicken, shredded",
      "1 cup chicken broth",
      "1/2 cup cooked rice",
      "1 small carrot, sliced",
      "1/4 onion, chopped",
      "Salt and pepper"
    ],
    macros: { calories: 380, protein: 26, carbs: 45, fat: 10 },
  },
  {
    id: 70,
    name: "Mushroom Soup",
    category: "Vegetarian",
    cuisine: "European",
    timeMinutes: 25,
    ingredients: [
      "1 cup mushrooms, sliced",
      "1 cup vegetable broth",
      "1/4 cup cream",
      "1/4 onion, chopped",
      "1 tbsp butter",
      "Salt and pepper"
    ],
    macros: { calories: 320, protein: 8, carbs: 20, fat: 24 },
  },
  {
    id: 71,
    name: "Chili (Vegetarian)",
    category: "Vegan",
    cuisine: "Mexican",
    timeMinutes: 35,
    ingredients: [
      "1/2 cup kidney beans",
      "1/2 cup black beans",
      "1/2 cup chopped tomatoes",
      "1/4 onion, chopped",
      "1 tsp chili powder",
      "1 tsp cumin"
    ],
    macros: { calories: 480, protein: 20, carbs: 75, fat: 8 },
  },
  {
    id: 72,
    name: "Beef Chili",
    category: "Beef",
    cuisine: "Mexican",
    timeMinutes: 40,
    ingredients: [
      "150 g ground beef",
      "1/2 cup kidney beans",
      "1/2 cup chopped tomatoes",
      "1/4 onion, chopped",
      "1 tsp chili powder",
      "1 tsp cumin"
    ],
    macros: { calories: 560, protein: 32, carbs: 50, fat: 24 },
  },
  {
    id: 73,
    name: "Chicken and Vegetable Stew",
    category: "Chicken",
    cuisine: "European",
    timeMinutes: 45,
    ingredients: [
      "200 g chicken, diced",
      "1 cup mixed vegetables",
      "1 small potato, diced",
      "1 cup chicken broth",
      "1 tbsp flour",
      "Salt and pepper"
    ],
    macros: { calories: 520, protein: 36, carbs: 48, fat: 18 },
  },
  {
    id: 74,
    name: "Tomato and Lentil Soup",
    category: "Vegan",
    cuisine: "Mediterranean",
    timeMinutes: 30,
    ingredients: [
      "1/2 cup dried lentils",
      "1 cup tomato puree",
      "1 cup vegetable broth",
      "1/4 onion, chopped",
      "1 tbsp olive oil",
      "Salt, pepper, herbs"
    ],
    macros: { calories: 440, protein: 22, carbs: 70, fat: 8 },
  },
  {
    id: 75,
    name: "Wonton Soup",
    category: "Pork",
    cuisine: "Asian",
    timeMinutes: 30,
    ingredients: [
      "6 pork wontons",
      "1 cup chicken broth",
      "1/4 cup chopped vegetables",
      "1 tbsp soy sauce",
      "Green onions",
      "Sesame oil"
    ],
    macros: { calories: 380, protein: 20, carbs: 35, fat: 16 },
  },
  {
    id: 76,
    name: "Clam Chowder",
    category: "Seafood",
    cuisine: "American",
    timeMinutes: 35,
    ingredients: [
      "1/2 cup clams",
      "1 cup vegetable broth",
      "1/4 cup cream",
      "1 small potato, diced",
      "1/4 onion, chopped",
      "1 tbsp butter"
    ],
    macros: { calories: 420, protein: 22, carbs: 38, fat: 20 },
  },
  {
    id: 77,
    name: "Pho (Vietnamese Noodle Soup)",
    category: "Beef",
    cuisine: "Asian",
    timeMinutes: 40,
    ingredients: [
      "150 g beef, sliced",
      "1 cup beef broth",
      "80 g rice noodles",
      "1/4 cup bean sprouts",
      "Fresh herbs",
      "Lime wedge"
    ],
    macros: { calories: 520, protein: 30, carbs: 65, fat: 14 },
  },
  {
    id: 78,
    name: "Miso Soup with Tofu",
    category: "Vegan",
    cuisine: "Asian",
    timeMinutes: 15,
    ingredients: [
      "1 cup vegetable broth",
      "1 tbsp miso paste",
      "100 g firm tofu, cubes",
      "1/4 cup seaweed",
      "Green onions",
      "Sesame seeds"
    ],
    macros: { calories: 180, protein: 12, carbs: 15, fat: 8 },
  },
  {
    id: 79,
    name: "Gumbo",
    category: "Seafood",
    cuisine: "American",
    timeMinutes: 45,
    ingredients: [
      "100 g shrimp",
      "100 g chicken, diced",
      "1 cup chicken broth",
      "1/2 cup okra",
      "1/4 onion, chopped",
      "1 tbsp flour"
    ],
    macros: { calories: 480, protein: 32, carbs: 42, fat: 18 },
  },
  {
    id: 80,
    name: "French Onion Soup",
    category: "Vegetarian",
    cuisine: "French",
    timeMinutes: 40,
    ingredients: [
      "1 large onion, sliced",
      "1 cup beef broth",
      "1 slice bread",
      "1/4 cup shredded cheese",
      "1 tbsp butter",
      "Salt and pepper"
    ],
    macros: { calories: 420, protein: 18, carbs: 45, fat: 18 },
  },

  // ---------- ADDITIONAL RECIPES TO REACH 100 ----------
  {
    id: 81,
    name: "Chicken Tikka Masala",
    category: "Chicken",
    cuisine: "Indian",
    timeMinutes: 40,
    ingredients: [
      "200 g chicken breast, cubes",
      "1/2 cup tomato puree",
      "1/4 cup cream",
      "1 tbsp tikka masala paste",
      "1/2 onion, chopped",
      "1 cup cooked basmati rice"
    ],
    macros: { calories: 640, protein: 34, carbs: 68, fat: 24 },
  },
  {
    id: 82,
    name: "Beef Bulgogi Bowl",
    category: "Beef",
    cuisine: "Korean",
    timeMinutes: 30,
    ingredients: [
      "150 g beef, sliced",
      "2 tbsp bulgogi sauce",
      "1 cup cooked rice",
      "1/2 cup kimchi",
      "1/4 cup vegetables",
      "1 tsp sesame oil"
    ],
    macros: { calories: 600, protein: 30, carbs: 70, fat: 20 },
  },
  {
    id: 83,
    name: "Pork Adobo",
    category: "Pork",
    cuisine: "Filipino",
    timeMinutes: 45,
    ingredients: [
      "200 g pork, cubed",
      "1/4 cup soy sauce",
      "1/4 cup vinegar",
      "2 cloves garlic",
      "1 bay leaf",
      "1 cup cooked rice"
    ],
    macros: { calories: 620, protein: 32, carbs: 65, fat: 22 },
  },
  {
    id: 84,
    name: "Grilled Swordfish",
    category: "Fish",
    cuisine: "Mediterranean",
    timeMinutes: 20,
    ingredients: [
      "200 g swordfish steak",
      "1 cup roasted vegetables",
      "1 tbsp olive oil",
      "Lemon wedge",
      "Salt, pepper, herbs"
    ],
    macros: { calories: 500, protein: 40, carbs: 15, fat: 30 },
  },
  {
    id: 85,
    name: "Shrimp Pad Thai",
    category: "Seafood",
    cuisine: "Thai",
    timeMinutes: 25,
    ingredients: [
      "150 g shrimp",
      "80 g rice noodles",
      "2 tbsp tamarind sauce",
      "1 tbsp soy sauce",
      "1 egg",
      "1 tbsp vegetable oil"
    ],
    macros: { calories: 580, protein: 32, carbs: 75, fat: 16 },
  },
  {
    id: 86,
    name: "Veggie Burger",
    category: "Vegetarian",
    cuisine: "American",
    timeMinutes: 30,
    ingredients: [
      "1 veggie patty",
      "1 burger bun",
      "Lettuce, tomato, onion",
      "1 tbsp ketchup",
      "1 slice cheese",
      "Pickles"
    ],
    macros: { calories: 480, protein: 20, carbs: 55, fat: 18 },
  },
  {
    id: 87,
    name: "Chana Masala",
    category: "Vegan",
    cuisine: "Indian",
    timeMinutes: 30,
    ingredients: [
      "1/2 can chickpeas",
      "1/2 cup tomato puree",
      "1 tbsp garam masala",
      "1/4 onion, chopped",
      "1 cup cooked rice",
      "1 tbsp vegetable oil"
    ],
    macros: { calories: 560, protein: 20, carbs: 85, fat: 14 },
  },
  {
    id: 88,
    name: "Chicken Souvlaki",
    category: "Chicken",
    cuisine: "Greek",
    timeMinutes: 30,
    ingredients: [
      "200 g chicken, cubed",
      "2 pita breads",
      "1/4 cup tzatziki",
      "1/4 cup chopped vegetables",
      "1 tbsp olive oil",
      "Lemon wedge"
    ],
    macros: { calories: 600, protein: 36, carbs: 55, fat: 24 },
  },
  {
    id: 89,
    name: "Beef Gyro",
    category: "Beef",
    cuisine: "Greek",
    timeMinutes: 25,
    ingredients: [
      "150 g beef, sliced",
      "2 pita breads",
      "1/4 cup tzatziki",
      "1/4 cup chopped vegetables",
      "1 tbsp olive oil",
      "Lemon wedge"
    ],
    macros: { calories: 620, protein: 32, carbs: 58, fat: 26 },
  },
  {
    id: 90,
    name: "Pork Ramen",
    category: "Pork",
    cuisine: "Japanese",
    timeMinutes: 30,
    ingredients: [
      "150 g pork, sliced",
      "80 g ramen noodles",
      "1 cup pork broth",
      "1/2 soft-boiled egg",
      "Green onions",
      "Nori"
    ],
    macros: { calories: 580, protein: 30, carbs: 65, fat: 20 },
  },
  {
    id: 91,
    name: "Baked Cod with Herbs",
    category: "Fish",
    cuisine: "Mediterranean",
    timeMinutes: 25,
    ingredients: [
      "200 g cod fillet",
      "1 cup roasted vegetables",
      "1 tbsp olive oil",
      "Fresh herbs",
      "Lemon wedge",
      "Salt and pepper"
    ],
    macros: { calories: 400, protein: 34, carbs: 18, fat: 20 },
  },
  {
    id: 92,
    name: "Lobster Roll",
    category: "Seafood",
    cuisine: "American",
    timeMinutes: 20,
    ingredients: [
      "150 g lobster meat",
      "1 hot dog bun",
      "1 tbsp mayonnaise",
      "Lemon juice",
      "Fresh herbs",
      "Salt and pepper"
    ],
    macros: { calories: 480, protein: 28, carbs: 35, fat: 24 },
  },
  {
    id: 93,
    name: "Eggplant Lasagna",
    category: "Vegetarian",
    cuisine: "Italian",
    timeMinutes: 50,
    ingredients: [
      "1 small eggplant, sliced",
      "1/2 cup tomato sauce",
      "1/2 cup ricotta cheese",
      "1/4 cup shredded mozzarella",
      "2 tbsp grated parmesan",
      "1 tbsp olive oil"
    ],
    macros: { calories: 620, protein: 24, carbs: 50, fat: 32 },
  },
  {
    id: 94,
    name: "Tempeh Stir-Fry",
    category: "Vegan",
    cuisine: "Asian",
    timeMinutes: 20,
    ingredients: [
      "150 g tempeh, cubed",
      "1 cup mixed vegetables",
      "2 tbsp soy sauce",
      "1 tbsp vegetable oil",
      "1 clove garlic",
      "1 tsp ginger"
    ],
    macros: { calories: 500, protein: 26, carbs: 32, fat: 28 },
  },
  {
    id: 95,
    name: "Chicken Shawarma",
    category: "Chicken",
    cuisine: "Middle Eastern",
    timeMinutes: 35,
    ingredients: [
      "200 g chicken, sliced",
      "2 pita breads",
      "1/4 cup tahini sauce",
      "1/4 cup chopped vegetables",
      "1 tbsp olive oil",
      "Shawarma spices"
    ],
    macros: { calories: 640, protein: 38, carbs: 58, fat: 26 },
  },
  {
    id: 96,
    name: "Beef Rendang",
    category: "Beef",
    cuisine: "Indonesian",
    timeMinutes: 60,
    ingredients: [
      "200 g beef, cubed",
      "1/2 cup coconut milk",
      "1 tbsp rendang paste",
      "1/2 onion, chopped",
      "1 cup cooked rice",
      "1 tbsp vegetable oil"
    ],
    macros: { calories: 680, protein: 34, carbs: 68, fat: 28 },
  },
  {
    id: 97,
    name: "Pork Banh Mi",
    category: "Pork",
    cuisine: "Vietnamese",
    timeMinutes: 25,
    ingredients: [
      "150 g pork, sliced",
      "1 baguette",
      "1/4 cup pickled vegetables",
      "Fresh cilantro",
      "1 tbsp mayonnaise",
      "Chili sauce"
    ],
    macros: { calories: 580, protein: 28, carbs: 65, fat: 20 },
  },
  {
    id: 98,
    name: "Grilled Mahi Mahi",
    category: "Fish",
    cuisine: "Mediterranean",
    timeMinutes: 20,
    ingredients: [
      "200 g mahi mahi fillet",
      "1 cup roasted vegetables",
      "1 tbsp olive oil",
      "Lemon wedge",
      "Salt, pepper, herbs"
    ],
    macros: { calories: 460, protein: 38, carbs: 15, fat: 26 },
  },
  {
    id: 99,
    name: "Seafood Paella",
    category: "Seafood",
    cuisine: "Spanish",
    timeMinutes: 45,
    ingredients: [
      "100 g shrimp",
      "100 g mussels",
      "1/2 cup arborio rice",
      "1 cup seafood broth",
      "1/4 cup vegetables",
      "1 tbsp olive oil"
    ],
    macros: { calories: 600, protein: 32, carbs: 70, fat: 18 },
  },
  {
    id: 100,
    name: "Vegetable Biryani",
    category: "Vegetarian",
    cuisine: "Indian",
    timeMinutes: 40,
    ingredients: [
      "1 cup basmati rice",
      "1 cup mixed vegetables",
      "1 tbsp biryani masala",
      "1/4 onion, chopped",
      "1/4 cup yogurt",
      "1 tbsp vegetable oil"
    ],
    macros: { calories: 640, protein: 16, carbs: 95, fat: 18 },
  },
];

// --- Helper functions for new macros-based Recipe type ---
export const getRecipes = (): Recipe[] => recipes;

export const getRecipeById = (id: number): Recipe | null =>
  recipes.find((r) => r.id === id) ?? null;

export const getCategories = (): string[] =>
  Array.from(new Set(recipes.map((r) => r.category))).sort();

export const getCuisines = (): string[] =>
  Array.from(new Set(recipes.map((r) => r.cuisine))).sort();

// --- Compatibility helpers for existing search & category screens ---
// These map the static recipes into the original app-wide Recipe shape.
import type { Recipe as LegacyRecipe } from "@/types/recipe";

const toLegacyRecipe = (recipe: Recipe): LegacyRecipe => ({
  id: String(recipe.id),
  title: recipe.name,
  imageUrl: undefined,
  category: recipe.category,
  description: `${recipe.cuisine} · ${recipe.category}`,
  cookTime: `${recipe.timeMinutes} min`,
  prepTime: 0,
  totalTime: recipe.timeMinutes,
  servings: 1,
  difficulty: "Easy",
  cost: "$",
  filters: [], // No filters for now; can be extended later
  ingredients: recipe.ingredients,
  instructions: recipe.instructions ?? [],
});

// Return all recipes in the legacy format (used by search)
export const getAllRecipes = (): LegacyRecipe[] =>
  recipes.map(toLegacyRecipe);

// Return recipes filtered by category in the legacy format (used by category/home screens)
export const getRecipesByCategory = (category: string): LegacyRecipe[] =>
  getAllRecipes().filter((r) => r.category === category);
