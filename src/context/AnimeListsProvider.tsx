import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AnimeListsContext } from "@/context/animeListsContext";
import { readLocalJson, writeLocalJson } from "@/lib/storage";

const FAVORITES_KEY = "favorite-mal-ids";
const WATCHED_KEY = "watched-mal-ids";

export function AnimeListsProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(
    () => readLocalJson<number[]>(FAVORITES_KEY) ?? []
  );
  const [watchedIds, setWatchedIds] = useState<number[]>(
    () => readLocalJson<number[]>(WATCHED_KEY) ?? []
  );

  const toggleFavorite = useCallback((malId: number) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(malId)
        ? prev.filter((id) => id !== malId)
        : [...prev, malId];
      writeLocalJson(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const toggleWatched = useCallback((malId: number) => {
    setWatchedIds((prev) => {
      const next = prev.includes(malId)
        ? prev.filter((id) => id !== malId)
        : [...prev, malId];
      writeLocalJson(WATCHED_KEY, next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (malId: number) => favoriteIds.includes(malId),
    [favoriteIds]
  );

  const isWatched = useCallback(
    (malId: number) => watchedIds.includes(malId),
    [watchedIds]
  );

  const value = useMemo(
    () => ({
      favoriteIds,
      watchedIds,
      toggleFavorite,
      toggleWatched,
      isFavorite,
      isWatched,
    }),
    [
      favoriteIds,
      watchedIds,
      toggleFavorite,
      toggleWatched,
      isFavorite,
      isWatched,
    ]
  );

  return (
    <AnimeListsContext.Provider value={value}>
      {children}
    </AnimeListsContext.Provider>
  );
}
