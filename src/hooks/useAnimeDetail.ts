import { useQuery } from "@tanstack/react-query";
import { getAnimeById } from "@/api/animeApi";

export function useAnimeDetail(malId: number | null) {
  return useQuery({
    queryKey: ["anime", malId],
    queryFn: () => getAnimeById(malId!),
    enabled: malId != null && Number.isFinite(malId) && malId > 0,
  });
}
