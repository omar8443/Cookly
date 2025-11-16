import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";

export interface UserStreakData {
  currentStreak: number;
  longestStreak: number;
  lastCookDate?: Timestamp;
  totalCooks: number;
}

const COOK_EVENTS_COLLECTION = "cookEvents";
const USER_STREAKS_COLLECTION = "userStreaks";

function getStartOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return getStartOfDay(a).getTime() === getStartOfDay(b).getTime();
}

function isYesterday(today: Date, other: Date): boolean {
  const startToday = getStartOfDay(today).getTime();
  const startOther = getStartOfDay(other).getTime();
  const diffDays = (startToday - startOther) / (1000 * 60 * 60 * 24);
  return diffDays === 1;
}

export async function recordCookEvent(
  userId: string,
  recipeId: string,
  rating: number
): Promise<UserStreakData> {
  if (!userId) throw new Error("User ID is required to record a cook event.");
  if (!recipeId) throw new Error("Recipe ID is required to record a cook event.");

  // Log the individual cook event (for analytics / history)
  await addDoc(collection(db, COOK_EVENTS_COLLECTION), {
    userId,
    recipeId,
    rating,
    createdAt: serverTimestamp(),
  });

  const streakRef = doc(db, USER_STREAKS_COLLECTION, userId);
  const snapshot = await getDoc(streakRef);
  const today = new Date();

  let currentStreak = 1;
  let longestStreak = 1;
  let totalCooks = 1;
  let lastCookDate = Timestamp.fromDate(today);

  if (snapshot.exists()) {
    const data = snapshot.data() as UserStreakData;
    totalCooks = (data.totalCooks || 0) + 1;

    if (data.lastCookDate) {
      const lastDate = data.lastCookDate.toDate();

      if (isSameDay(today, lastDate)) {
        // Same day: do not change streak, just increment total cooks
        currentStreak = data.currentStreak || 1;
        longestStreak = data.longestStreak || currentStreak;
        lastCookDate = data.lastCookDate;
      } else if (isYesterday(today, lastDate)) {
        // Consecutive day: increment streak
        currentStreak = (data.currentStreak || 0) + 1;
        longestStreak = Math.max(data.longestStreak || 0, currentStreak);
        lastCookDate = Timestamp.fromDate(today);
      } else {
        // Gap: reset streak
        currentStreak = 1;
        longestStreak = Math.max(data.longestStreak || 0, currentStreak);
        lastCookDate = Timestamp.fromDate(today);
      }
    }
  }

  const newData: UserStreakData = {
    currentStreak,
    longestStreak,
    lastCookDate,
    totalCooks,
  };

  await setDoc(streakRef, newData, { merge: true });

  return newData;
}

export async function getUserStreak(userId: string): Promise<UserStreakData | null> {
  if (!userId) return null;

  const streakRef = doc(db, USER_STREAKS_COLLECTION, userId);
  const snapshot = await getDoc(streakRef);

  if (!snapshot.exists()) return null;

  return snapshot.data() as UserStreakData;
}


