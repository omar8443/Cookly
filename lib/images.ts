
// For client-side (Expo) usage we MUST use an EXPO_PUBLIC_ variable so it gets bundled.
// The Node script uses process.env.PEXELS_API_KEY separately via dotenv.
const PEXELS_API_KEY = process.env.EXPO_PUBLIC_PEXELS_API_KEY;

if (!PEXELS_API_KEY && __DEV__) {
  // eslint-disable-next-line no-console
  console.warn(
    "[images] PEXELS_API_KEY is not set. getRecipeImage will throw in production if called without a key."
  );
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

/**
 * Fetch a single, deterministic image URL for a given recipe name.
 * Uses Pexels search with per_page=1 so the same query yields
 * a stable first result over time.
 */
export async function getRecipeImage(recipeName: string): Promise<string> {
  if (!PEXELS_API_KEY) {
    throw new Error("PEXELS_API_KEY is not configured in the environment.");
  }

  const query = encodeURIComponent(recipeName);
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;

  const response = await fetch(url, {
    headers: {
      Authorization: PEXELS_API_KEY as string,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Pexels request failed with status ${response.status} for recipe "${recipeName}".`
    );
  }

  const data = (await response.json()) as PexelsSearchResponse;
  const photo = data.photos?.[0];

  if (!photo || !photo.src) {
    throw new Error(`No Pexels image found for recipe "${recipeName}".`);
  }

  return photo.src.large || photo.src.medium;
}


