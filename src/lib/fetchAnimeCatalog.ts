import { getTopAnime, searchAnime } from "@/api/animeApi";
import type { AnimeSearchResponse } from "@/types/anime";

export const CATALOG_PAGE_SIZE = 24;

export type CatalogQuery = {
  q: string;
  page: number;
  type: string;
  status: string;
  order_by: string;
  sort: "asc" | "desc";
  year: string;
};

export async function fetchAnimeCatalog(
  query: CatalogQuery
): Promise<AnimeSearchResponse> {
  const { q, page, type, status, order_by, sort, year } = query;
  const start_date = year ? `${year}-01-01` : undefined;

  if (q) {
    return searchAnime({
      q,
      page,
      limit: CATALOG_PAGE_SIZE,
      type: type || undefined,
      status: status || undefined,
      order_by: order_by || undefined,
      sort: order_by ? sort : undefined,
      start_date,
    });
  }

  if (type || status || year || order_by) {
    return searchAnime({
      page,
      limit: CATALOG_PAGE_SIZE,
      type: type || undefined,
      status: status || undefined,
      order_by: order_by || "popularity",
      sort,
      start_date,
    });
  }

  return getTopAnime({
    page,
    limit: CATALOG_PAGE_SIZE,
    filter: "bypopularity",
  });
}
