import type {
  AnimeFullResponse,
  AnimeSearchParams,
  AnimeSearchResponse,
} from "@/types/anime";
import { api } from "./client";

/**
 * Busca/listagem de animes (`GET /anime`).
 * @see https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch
 */
export async function searchAnime(
  params?: AnimeSearchParams
): Promise<AnimeSearchResponse> {
  const { data } = await api.get<AnimeSearchResponse>("/anime", {
    params: params ?? {},
  });
  return data;
}

/**
 * Detalhe completo de um anime por ID MAL (`GET /anime/{id}/full`).
 * @see https://docs.api.jikan.moe/#tag/anime/operation/getAnimeFullById
 */
export async function getAnimeById(id: number): Promise<AnimeFullResponse> {
  const { data } = await api.get<AnimeFullResponse>(`/anime/${id}/full`);
  return data;
}
