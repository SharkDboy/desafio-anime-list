import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getTopAnime, searchAnime } from "@/api/animeApi";
import { AnimeCard } from "@/components/AnimeCard";
import type { AnimeSearchResponse } from "@/types/anime";

const PAGE_SIZE = 24;

export function HomePage() {
  const [input, setInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<AnimeSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setPage(1);
  }, [appliedSearch]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const q = appliedSearch.trim();
    const run = async () => {
      try {
        const result = q
          ? await searchAnime({ q, page, limit: PAGE_SIZE })
          : await getTopAnime({
              page,
              limit: PAGE_SIZE,
              filter: "bypopularity",
            });
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
  }, [page, appliedSearch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h4" component="h1" fontWeight={700}>
          {appliedSearch ? "Resultados da busca" : "Animes populares"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {appliedSearch
            ? `Busca: "${appliedSearch}"`
            : "Ranking por popularidade na Jikan API"}
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          setAppliedSearch(input.trim());
        }}
      >
        <TextField
          fullWidth
          label="Buscar por título"
          placeholder="Digite e pressione Enter ou o ícone"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end" aria-label="Buscar">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {error && (
        <Alert severity="error">
          {error instanceof Error ? error.message : "Erro ao carregar"}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress aria-label="Carregando" />
        </Box>
      )}

      {!loading && data && (
        <>
          {data.data.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" py={4}>
              Nenhum resultado encontrado.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {data.data.map((anime) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
                  <AnimeCard anime={anime} />
                </Grid>
              ))}
            </Grid>
          )}

          {data.pagination.last_visible_page > 1 && (
            <Stack alignItems="center" sx={{ pt: 2 }}>
              <Pagination
                color="primary"
                page={data.pagination.current_page}
                count={data.pagination.last_visible_page}
                onChange={(_, p) => setPage(p)}
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
