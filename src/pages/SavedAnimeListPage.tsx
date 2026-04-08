import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { getAnimeById } from "@/api/animeApi";
import { AnimeCard } from "@/components/AnimeCard";
import { useAnimeLists } from "@/hooks/useAnimeLists";
import type { AnimeListItem } from "@/types/anime";

type ListKind = "favorites" | "watched";

export function SavedAnimeListPage({ kind }: { kind: ListKind }) {
  const { favoriteIds, watchedIds } = useAnimeLists();
  const ids = kind === "favorites" ? favoriteIds : watchedIds;
  const title =
    kind === "favorites" ? "Favoritos" : "Assistidos";
  const emptyMsg =
    kind === "favorites"
      ? "Nenhum favorito ainda. Explore a home e clique no coração."
      : "Nenhum anime marcado como assistido.";

  const [items, setItems] = useState<AnimeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (ids.length === 0) {
      setItems([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    const run = async () => {
      try {
        const results = await Promise.all(
          ids.map((id) => getAnimeById(id).then((r) => r.data as AnimeListItem))
        );
        if (!cancelled) setItems(results);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e : new Error(String(e)));
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [ids]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" component="h1" fontWeight={700}>
        {title}
      </Typography>

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

      {!loading && ids.length === 0 && (
        <Typography color="text.secondary">{emptyMsg}</Typography>
      )}

      {!loading && ids.length > 0 && items.length === 0 && !error && (
        <Typography color="text.secondary">{emptyMsg}</Typography>
      )}

      {!loading && items.length > 0 && (
        <Grid container spacing={2}>
          {items.map((anime) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
              <AnimeCard anime={anime} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
