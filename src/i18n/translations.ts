import type { Locale } from "./constants";

const ptBR = {
  nav: {
    ariaNav: "Navegação principal",
    brandSubtitle: "Ranking e busca • dados Jikan API v4",
    home: "Início",
    favOne: "{n} favorito",
    favOther: "{n} favoritos",
    language: "Idioma",
    langPt: "Português (BR)",
    langEs: "Español (Latam)",
  },
  home: {
    title: "Lista de animes",
    subtitleResults: "Resultados para “{q}”",
    subtitlePopular:
      "Populares no MyAnimeList (via Jikan). Use a busca para filtrar.",
    searchLabel: "Buscar anime",
    searchPlaceholder: "Ex.: Naruto, One Piece…",
    searchAria: "Buscar",
    errLoad: "Erro ao carregar animes.",
    loading: "Carregando",
    noResults: "Nenhum resultado. Tente outro termo.",
  },
  detail: {
    back: "← Voltar",
    invalidId: "ID de anime inválido.",
    errLoad: "Erro ao carregar anime.",
    loading: "Carregando detalhes",
    inFavorites: "Nos favoritos",
    favorite: "Favoritar",
    score: "Nota {score}",
    episodes: "{n} episódios",
    noSynopsis: "Sinopse não disponível.",
    synopsisTranslating: "Traduzindo sinopse…",
    synopsisMtNote:
      "Tradução automática (MyMemory), a partir do inglês da Jikan/MyAnimeList. Pode conter imprecisões.",
    synopsisTranslateFailed:
      "Não foi possível traduzir a sinopse. Exibindo o texto original.",
  },
  card: {
    removeFav: "Remover dos favoritos",
    addFav: "Adicionar aos favoritos",
    noScore: "Sem nota",
    eps: "eps",
  },
} as const;

const es = {
  nav: {
    ariaNav: "Navegación principal",
    brandSubtitle: "Ranking y búsqueda • datos Jikan API v4",
    home: "Inicio",
    favOne: "{n} favorito",
    favOther: "{n} favoritos",
    language: "Idioma",
    langPt: "Portugués (BR)",
    langEs: "Español (Latam)",
  },
  home: {
    title: "Lista de anime",
    subtitleResults: "Resultados para «{q}»",
    subtitlePopular:
      "Popular en MyAnimeList (vía Jikan). Usa la búsqueda para filtrar.",
    searchLabel: "Buscar anime",
    searchPlaceholder: "Ej.: Naruto, One Piece…",
    searchAria: "Buscar",
    errLoad: "Error al cargar los anime.",
    loading: "Cargando",
    noResults: "Sin resultados. Prueba con otro término.",
  },
  detail: {
    back: "← Volver",
    invalidId: "ID de anime no válido.",
    errLoad: "Error al cargar el anime.",
    loading: "Cargando detalles",
    inFavorites: "En favoritos",
    favorite: "Favorito",
    score: "Puntuación {score}",
    episodes: "{n} episodios",
    noSynopsis: "Sinopsis no disponible.",
    synopsisTranslating: "Traduciendo sinopsis…",
    synopsisMtNote:
      "Traducción automática (MyMemory) desde el inglés de Jikan/MyAnimeList. Puede contener errores.",
    synopsisTranslateFailed:
      "No se pudo traducir la sinopsis. Mostrando el texto original.",
  },
  card: {
    removeFav: "Quitar de favoritos",
    addFav: "Añadir a favoritos",
    noScore: "Sin puntuación",
    eps: "eps",
  },
} as const;

/** Mesma forma de chaves que `ptBR`; textos diferem por idioma. */
type MessageBundle = typeof ptBR;

export const translations: Record<Locale, MessageBundle> = {
  "pt-BR": ptBR,
  es: es as unknown as MessageBundle,
};

function getLeaf(
  obj: Record<string, unknown>,
  path: string
): string | undefined {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : undefined;
}

export function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>
): string {
  let s =
    getLeaf(translations[locale] as unknown as Record<string, unknown>, key) ??
    getLeaf(translations["pt-BR"] as unknown as Record<string, unknown>, key) ??
    key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.split(`{${k}}`).join(String(v));
    }
  }
  return s;
}
