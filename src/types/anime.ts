/**
 * Tipos alinhados à Jikan API v4 (MyAnimeList não oficial).
 * @see https://docs.api.jikan.moe/
 */

/** Metadados de paginação em listagens (`items` conforme resposta v4). */
export type JikanPaginationItems = {
  count: number;
  total: number;
  per_page: number;
};

export type JikanPagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: JikanPaginationItems;
};

export type AnimeImage = {
  image_url: string;
  small_image_url?: string;
  large_image_url?: string;
};

/** Item em resultados de busca / listagens. */
export type AnimeListItem = {
  mal_id: number;
  title: string;
  images: { jpg: AnimeImage; webp?: AnimeImage };
  url?: string;
  episodes?: number | null;
  score?: number | null;
  synopsis?: string | null;
  year?: number | null;
  type?: string | null;
};

export type AnimeSearchResponse = {
  pagination: JikanPagination;
  data: AnimeListItem[];
};

/** Parâmetros de query para `GET /anime` (subset dos suportados pela Jikan). */
export type AnimeSearchParams = {
  q?: string;
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  order_by?: string;
  sort?: "asc" | "desc";
  genres?: string;
  min_score?: number;
  max_score?: number;
  sfw?: boolean;
};

/** Recurso nomeado (gênero, estúdio, etc.) na resposta da API. */
export type JikanNamedResource = {
  mal_id: number;
  type?: string;
  name: string;
  url?: string;
};

/** Objeto retornado em `GET /anime/{id}/full` (campos frequentes; outros podem existir). */
export type AnimeFull = AnimeListItem & {
  url?: string;
  titles?: string[];
  title_english?: string | null;
  title_japanese?: string | null;
  synopsis?: string | null;
  background?: string | null;
  duration?: string | null;
  rating?: string | null;
  status?: string | null;
  season?: string | null;
  aired?: { from?: string | null; to?: string | null };
  broadcast?: { day?: string | null; time?: string | null; timezone?: string | null };
  genres?: JikanNamedResource[];
  themes?: JikanNamedResource[];
  demographics?: JikanNamedResource[];
  studios?: JikanNamedResource[];
  producers?: JikanNamedResource[];
  licensors?: JikanNamedResource[];
};

/** Corpo de `GET /anime/{id}/full`. */
export type AnimeFullResponse = {
  data: AnimeFull;
};
