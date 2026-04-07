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
import { AnimeCard } from "@/components/AnimeCard";
import { useAnimeCatalog } from "@/hooks/useAnimeCatalog";

export function HomePage() {
  const [input, setInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [appliedSearch]);

  const { data, isPending, isError, error } = useAnimeCatalog(page, appliedSearch);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Lista de animes
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {appliedSearch
            ? `Resultados para “${appliedSearch}”`
            : "Populares no MyAnimeList (via Jikan). Use a busca para filtrar."}
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
          label="Buscar anime"
          placeholder="Ex.: Naruto, One Piece…"
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

      {isError && (
        <Alert severity="error">
          {error instanceof Error ? error.message : "Erro ao carregar animes."}
        </Alert>
      )}

      {isPending && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress aria-label="Carregando" />
        </Box>
      )}

      {!isPending && data && (
        <>
          {data.data.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" py={4}>
              Nenhum resultado. Tente outro termo.
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
