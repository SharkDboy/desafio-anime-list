/**
 * Contrato HTTP (caminhos) da Jikan v4 usados pela camada de serviço.
 * Um único lugar para o app “lembrar” quais recursos existem na API.
 *
 * @see https://docs.api.jikan.moe/
 */
export const JIKAN_ANIME_PATHS = {
  topAnime: "/top/anime",
  animeSearch: "/anime",
  animeFull: (malId: number) => `/anime/${malId}/full`,
} as const;
