import type {
  AnimeFullResponse,
  AnimeSearchParams,
  AnimeSearchResponse,
  TopAnimeParams,
} from "@/types/anime";
import { jikanClient } from "./jikanClient";

/**
 * Ranking / top animes (`GET /top/anime`).
 * @see https://docs.api.jikan.moe/#tag/top/operation/getTopAnime
 */
export async function getTopAnime(
  params?: TopAnimeParams
): Promise<AnimeSearchResponse> {
  const { data } = await jikanClient.get<AnimeSearchResponse>("/top/anime", {
    params: params ?? {},
  });
  return data;
}

/**
 * Busca/listagem de animes (`GET /anime`).
 * @see https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch
 */
export async function searchAnime(
  params?: AnimeSearchParams
): Promise<AnimeSearchResponse> {
  const { data } = await jikanClient.get<AnimeSearchResponse>("/anime", {
    params: params ?? {},
  });
  return data;
}

/**
 * Detalhe completo de um anime por ID MAL (`GET /anime/{id}/full`).
 * @see https://docs.api.jikan.moe/#tag/anime/operation/getAnimeFullById
 */
export async function getAnimeById(id: number): Promise<AnimeFullResponse> {
  const { data } = await jikanClient.get<AnimeFullResponse>(
    `/anime/${id}/full`
  );
  return data;
}
