import { useContext } from "react";
import { AnimeListsContext } from "@/context/animeListsContext";

export function useAnimeLists() {
  const ctx = useContext(AnimeListsContext);
  if (!ctx) {
    throw new Error("useAnimeLists deve ser usado dentro de AnimeListsProvider");
  }
  return ctx;
}
