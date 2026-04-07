import type {
  AnimeFullResponse,
  AnimeSearchParams,
  AnimeSearchResponse,
  TopAnimeParams,
} from "@/types/anime";
import { JIKAN_ANIME_PATHS } from "./jikanAnimeEndpoints";
import { jikanClient } from "./jikanClient";

/**
 * Camada de serviço: traduz endpoints Jikan em funções tipadas.
 * O TypeScript garante que o que consumimos bate com `@/types/anime`.
 *
 * Os paths HTTP ficam em `./jikanAnimeEndpoints` (contrato REST explícito; ver README).
 */

/**
 * Ranking / top animes (`GET /top/anime`).
 * @see https://docs.api.jikan.moe/#tag/top/operation/getTopAnime
 */
export async function getTopAnime(
  params?: TopAnimeParams
): Promise<AnimeSearchResponse> {
  const { data } = await jikanClient.get<AnimeSearchResponse>(
    JIKAN_ANIME_PATHS.topAnime,
    { params: params ?? {} }
  );
  return data;
}

/**
 * Busca/listagem de animes (`GET /anime`).
 * @see https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch
 */
export async function searchAnime(
  params?: AnimeSearchParams
): Promise<AnimeSearchResponse> {
  const { data } = await jikanClient.get<AnimeSearchResponse>(
    JIKAN_ANIME_PATHS.animeSearch,
    { params: params ?? {} }
  );
  return data;
}

/**
 * Detalhe completo de um anime por ID MAL (`GET /anime/{id}/full`).
 * @see https://docs.api.jikan.moe/#tag/anime/operation/getAnimeFullById
 */
export async function getAnimeById(id: number): Promise<AnimeFullResponse> {
  const { data } = await jikanClient.get<AnimeFullResponse>(
    JIKAN_ANIME_PATHS.animeFull(id)
  );
  return data;
}
