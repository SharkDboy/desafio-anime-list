import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AnimeCard } from "@/components/AnimeCard";
import { AnimeListRow } from "@/components/AnimeListRow";
import { ErrorState } from "@/components/ErrorState";
import { HomeFiltersBar } from "@/components/HomeFiltersBar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PopularCarousel } from "@/components/PopularCarousel";
import {
  type CatalogQuery,
  fetchAnimeCatalog,
} from "@/lib/fetchAnimeCatalog";
import { readLocalJson, writeLocalJson } from "@/lib/storage";
import type { AnimeSearchResponse } from "@/types/anime";

const VIEW_KEY = "home-view-mode";

type ViewMode = "grid" | "list";

function parsePage(raw: string | null): number {
  const n = parseInt(raw ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function searchParamsToCatalogQuery(searchParams: URLSearchParams): CatalogQuery {
  const sortRaw = searchParams.get("sort");
  const sort: "asc" | "desc" =
    sortRaw === "asc" || sortRaw === "desc" ? sortRaw : "desc";

  return {
    q: (searchParams.get("q") ?? "").trim(),
    page: parsePage(searchParams.get("page")),
    type: searchParams.get("type") ?? "",
    status: searchParams.get("status") ?? "",
    order_by: searchParams.get("order_by") ?? "",
    sort,
    year: searchParams.get("year") ?? "",
  };
}

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<AnimeSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const v = readLocalJson<string>(VIEW_KEY);
    return v === "list" ? "list" : "grid";
  });

  const query = useMemo(
    () => searchParamsToCatalogQuery(searchParams),
    [searchParams]
  );

  const showCarousel = query.q.length === 0;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        const result = await fetchAnimeCatalog(query);
        if (!cancelled) setData(result);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e : new Error(String(e)));
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [query]);

  const setParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      next.set("page", "1");
      return next;
    });
  };

  const handlePageChange = (_: unknown, p: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(p));
      return next;
    });
  };

  const handleViewMode = (next: ViewMode) => {
    setViewMode(next);
    writeLocalJson(VIEW_KEY, next);
  };

  const title = query.q ? "Resultados da busca" : "Listagem principal";
  const subtitle = query.q
    ? `Termo: "${query.q}"`
    : "Explore com filtros e ordenação ou veja o ranking por popularidade.";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {showCarousel && <PopularCarousel />}

      <Box>
        <Typography variant="h4" component="h1" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      </Box>

      <HomeFiltersBar
        query={query}
        viewMode={viewMode}
        onParamChange={setParam}
        onViewModeChange={handleViewMode}
      />

      {error && (
        <ErrorState
          message={error instanceof Error ? error.message : "Erro ao carregar"}
        />
      )}

      {loading && <LoadingSpinner />}

      {!loading && data && (
        <>
          {data.data.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" py={4}>
              Nenhum resultado encontrado.
            </Typography>
          ) : viewMode === "grid" ? (
            <Grid container spacing={2}>
              {data.data.map((anime) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
                  <AnimeCard anime={anime} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Stack spacing={1.5}>
              {data.data.map((anime) => (
                <AnimeListRow key={anime.mal_id} anime={anime} />
              ))}
            </Stack>
          )}

          {data.pagination.last_visible_page > 1 && (
            <Stack alignItems="center" sx={{ pt: 2 }}>
              <Pagination
                color="primary"
                page={data.pagination.current_page}
                count={data.pagination.last_visible_page}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
              />
            </Stack>
          )}
        </>
      )}
    </Box>
  );
}
