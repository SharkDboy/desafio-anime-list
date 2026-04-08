export const JIKAN_ANIME_PATHS = {
  topAnime: "/top/anime",
  animeSearch: "/anime",
  animeFull: (malId: number) => `/anime/${malId}/full`,
} as const;
