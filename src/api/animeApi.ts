import type {
  AnimeFullResponse,
  AnimeSearchParams,
  AnimeSearchResponse,
  TopAnimeParams,
} from "@/types/anime";
import { JIKAN_ANIME_PATHS } from "./jikanAnimeEndpoints";
import { jikanClient } from "./jikanClient";

export async function getTopAnime(
  params?: TopAnimeParams
): Promise<AnimeSearchResponse> {
  const { data } = await jikanClient.get<AnimeSearchResponse>(
    JIKAN_ANIME_PATHS.topAnime,
    { params: params ?? {} }
  );
  return data;
}

export async function searchAnime(
  params?: AnimeSearchParams
): Promise<AnimeSearchResponse> {
  const { data } = await jikanClient.get<AnimeSearchResponse>(
    JIKAN_ANIME_PATHS.animeSearch,
    { params: params ?? {} }
  );
  return data;
}

export async function getAnimeById(id: number): Promise<AnimeFullResponse> {
  const { data } = await jikanClient.get<AnimeFullResponse>(
    JIKAN_ANIME_PATHS.animeFull(id)
  );
  return data;
}
