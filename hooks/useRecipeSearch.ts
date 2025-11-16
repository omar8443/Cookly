import { useState, useEffect, useMemo, useRef } from "react";
import { Recipe, SearchFilters, SearchState } from "@/types/recipe";

// Simple debounce function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;
  
  const debounced = ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T & { cancel: () => void };
  
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  return debounced;
}

interface UseRecipeSearchOptions {
  recipes: Recipe[];
  query: string;
  filters: SearchFilters;
  debounceMs?: number;
}

interface UseRecipeSearchResult {
  results: Recipe[];
  state: SearchState;
  isLoading: boolean;
  error: Error | null;
}

export function useRecipeSearch({
  recipes,
  query,
  filters,
  debounceMs = 400,
}: UseRecipeSearchOptions): UseRecipeSearchResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] = useState<SearchState>("idle");
  const [results, setResults] = useState<Recipe[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filter function
  const filterRecipes = (searchQuery: string, searchFilters: SearchFilters): Recipe[] => {
    let filtered = recipes;

    // Filter by active filter types
    const activeFilters = Object.entries(searchFilters)
      .filter(([, isActive]) => isActive)
      .map(([filter]) => filter);

    if (activeFilters.length > 0) {
      filtered = filtered.filter((recipe) =>
        activeFilters.some((filter) => recipe.filters.includes(filter as any))
      );
    }

    // Filter by query
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (trimmedQuery.length > 0) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(trimmedQuery) ||
          recipe.category.toLowerCase().includes(trimmedQuery) ||
          recipe.description?.toLowerCase().includes(trimmedQuery) ||
          recipe.filters.some((f) => f.toLowerCase().includes(trimmedQuery))
      );
    }

    return filtered;
  };

  // Memoized debounced search function
  const performSearch = useMemo(
    () =>
      debounce((searchQuery: string, searchFilters: SearchFilters) => {
        setIsLoading(true);
        setError(null);

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Simulate network delay for better UX
        timeoutRef.current = setTimeout(() => {
          try {
            const filtered = filterRecipes(searchQuery, searchFilters);
            setResults(filtered);

            const hasQuery = searchQuery.trim().length > 0;
            const hasActiveFilters = Object.values(searchFilters).some((v) => v);

            if (!hasQuery && !hasActiveFilters) {
              setState("idle");
            } else if (filtered.length === 0) {
              setState("empty");
            } else {
              setState("results");
            }

            setIsLoading(false);
          } catch (err) {
            setIsLoading(false);
            setError(err instanceof Error ? err : new Error("Search failed"));
            setState("error");
          }
        }, 200);
      }, debounceMs),
    [recipes, debounceMs]
  );

  // Perform search when query or filters change
  useEffect(() => {
    const hasQuery = query.trim().length > 0;
    const hasActiveFilters = Object.values(filters).some((v) => v);

    if (hasQuery || hasActiveFilters) {
      setState("searching");
      performSearch(query, filters);
    } else {
      setState("idle");
      setIsLoading(false);
      setResults([]);
      setError(null);
    }

    // Cleanup
    return () => {
      performSearch.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, filters, performSearch]);

  return {
    results,
    state,
    isLoading,
    error,
  };
}

