/** Tipos mínimos para Jikan v4 — expanda conforme o desafio. */
export type JikanPagination = {
  last_visible_page: number;
  has_next_page: boolean;
};

export type AnimeImage = {
  image_url: string;
  small_image_url?: string;
  large_image_url?: string;
};

export type AnimeListItem = {
  mal_id: number;
  title: string;
  images: { jpg: AnimeImage; webp?: AnimeImage };
  episodes?: number | null;
  score?: number | null;
  synopsis?: string | null;
};

export type AnimeSearchResponse = {
  pagination: JikanPagination;
  data: AnimeListItem[];
};
