import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readLocalJson, writeLocalJson } from "@/lib/storage";

const STORAGE_KEY = "favorite-mal-ids";

export type FavoritesContextValue = {
  ids: readonly number[];
  toggle: (malId: number) => void;
  isFavorite: (malId: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>(
    () => readLocalJson<number[]>(STORAGE_KEY) ?? []
  );

  const toggle = useCallback((malId: number) => {
    setIds((prev) => {
      const next = prev.includes(malId)
        ? prev.filter((id) => id !== malId)
        : [...prev, malId];
      writeLocalJson(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (malId: number) => ids.includes(malId),
    [ids]
  );

  const value = useMemo(
    () => ({ ids, toggle, isFavorite }),
    [ids, toggle, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  }
  return ctx;
}
