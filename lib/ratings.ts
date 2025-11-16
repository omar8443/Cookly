import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export interface RecipeRatingSummary {
  recipeId: string;
  averageRating: number;
  ratingCount: number;
  userRating?: number;
}

const RATINGS_COLLECTION = "recipeRatings";

function buildRatingDocId(userId: string, recipeId: string) {
  return `${userId}_${recipeId}`;
}

export async function setUserRecipeRating(
  userId: string,
  recipeId: string,
  rating: number
): Promise<void> {
  if (!userId) throw new Error("User ID is required to set a rating.");
  if (!recipeId) throw new Error("Recipe ID is required to set a rating.");
  if (rating < 1 || rating > 5) throw new Error("Rating must be between 1 and 5.");

  const docId = buildRatingDocId(userId, recipeId);
  const ratingRef = doc(db, RATINGS_COLLECTION, docId);

  await setDoc(ratingRef, {
    userId,
    recipeId,
    rating,
    updatedAt: new Date(),
  });
}

export async function getRecipeRatingSummary(
  recipeId: string,
  userId?: string
): Promise<RecipeRatingSummary> {
  if (!recipeId) {
    throw new Error("Recipe ID is required to get rating summary.");
  }

  const ratingsQuery = query(
    collection(db, RATINGS_COLLECTION),
    where("recipeId", "==", recipeId)
  );

  const snapshot = await getDocs(ratingsQuery);

  let total = 0;
  let count = 0;
  let userRating: number | undefined;

  snapshot.forEach((docSnap) => {
    const data = docSnap.data() as { rating: number; userId: string };
    if (typeof data.rating === "number") {
      total += data.rating;
      count += 1;
    }
    if (userId && data.userId === userId) {
      userRating = data.rating;
    }
  });

  const averageRating = count > 0 ? total / count : 0;

  return {
    recipeId,
    averageRating,
    ratingCount: count,
    userRating,
  };
}

export async function getUserRatingForRecipe(
  userId: string,
  recipeId: string
): Promise<number | null> {
  if (!userId || !recipeId) return null;

  const docId = buildRatingDocId(userId, recipeId);
  const ratingRef = doc(db, RATINGS_COLLECTION, docId);
  const ratingSnap = await getDoc(ratingRef);

  if (!ratingSnap.exists()) return null;

  const data = ratingSnap.data() as { rating?: number };
  return typeof data.rating === "number" ? data.rating : null;
}


