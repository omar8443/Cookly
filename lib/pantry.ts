import { db } from "@/lib/firebase";
import { Pantry, PantryItem } from "@/types/pantry";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const USER_PANTRY_FIELD = "pantry";

export async function getUserPantry(uid: string): Promise<Pantry> {
  if (!uid) return [];

  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) return [];

  const data = snap.data() as { pantry?: Pantry };
  return Array.isArray(data.pantry) ? data.pantry : [];
}

export async function addToPantry(
  uid: string,
  item: PantryItem
): Promise<void> {
  if (!uid) return;

  const userRef = doc(db, "users", uid);
  await setDoc(
    userRef,
    {
      [USER_PANTRY_FIELD]: arrayUnion({
        ...item,
        addedAt: item.addedAt ?? new Date().toISOString(),
      }),
    },
    { merge: true }
  );
}

export async function removeFromPantry(
  uid: string,
  ingredientKey: string
): Promise<void> {
  if (!uid) return;

  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) return;

  const data = snap.data() as { pantry?: Pantry };
  const pantry = Array.isArray(data.pantry) ? data.pantry : [];

  const toRemove = pantry.filter((item) => item.ingredientKey === ingredientKey);
  if (toRemove.length === 0) return;

  const updates = toRemove.map((item) =>
    setDoc(
      userRef,
      {
        [USER_PANTRY_FIELD]: arrayRemove(item),
      },
      { merge: true }
    )
  );

  await Promise.all(updates);
}

export function isIngredientInPantry(
  pantry: Pantry,
  ingredientKey: string
): boolean {
  if (!ingredientKey) return false;
  return pantry.some((item) => item.ingredientKey === ingredientKey);
}


