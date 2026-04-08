import { createContext } from "react";

export type AnimeListsContextValue = {
  favoriteIds: readonly number[];
  watchedIds: readonly number[];
  toggleFavorite: (malId: number) => void;
  toggleWatched: (malId: number) => void;
  isFavorite: (malId: number) => boolean;
  isWatched: (malId: number) => boolean;
};

export const AnimeListsContext =
  createContext<AnimeListsContextValue | null>(null);
