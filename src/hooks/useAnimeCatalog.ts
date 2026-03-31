import { useQuery } from "@tanstack/react-query";
import { getTopAnime, searchAnime } from "@/api/animeApi";

const DEFAULT_LIMIT = 24;

export function useAnimeCatalog(page: number, search: string) {
  const q = search.trim();

  return useQuery({
    queryKey: ["animeCatalog", page, DEFAULT_LIMIT, q],
    queryFn: () =>
      q
        ? searchAnime({ q, page, limit: DEFAULT_LIMIT })
        : getTopAnime({
            page,
            limit: DEFAULT_LIMIT,
            filter: "bypopularity",
          }),
  });
}
