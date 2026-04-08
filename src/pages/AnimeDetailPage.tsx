import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getAnimeById } from "@/api/animeApi";
import { useAnimeLists } from "@/hooks/useAnimeLists";
import type { AnimeFull } from "@/types/anime";
import { stripHtml } from "@/utils/stripHtml";

export function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const malId = id ? Number.parseInt(id, 10) : Number.NaN;
  const validId = Number.isFinite(malId) && malId > 0;

  const { isFavorite, isWatched, toggleFavorite, toggleWatched } =
    useAnimeLists();

  const [anime, setAnime] = useState<AnimeFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!validId) {
      setAnime(null);
      setLoading(false);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    const run = async () => {
      try {
        const res = await getAnimeById(malId);
        if (!cancelled) setAnime(res.data);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e : new Error(String(e)));
          setAnime(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [malId, validId]);

  if (!validId) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" variant="body2">
          Voltar
        </Link>
        <Alert severity="warning">ID do anime inválido.</Alert>
      </Box>
    );
  }

  const img =
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.jpg?.image_url ||
    "";

  const synopsisText = anime?.synopsis
    ? stripHtml(anime.synopsis)
    : null;

  const embedUrl = anime?.trailer?.embed_url;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Link component={RouterLink} to="/" underline="hover" variant="body2">
        Voltar
      </Link>

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

      {anime && (
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, overflow: "hidden" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src={img}
                alt=""
                sx={{
                  width: "100%",
                  maxHeight: 480,
                  objectFit: "cover",
                  borderRadius: 1,
                  bgcolor: "grey.900",
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <Typography variant="h4" component="h1" fontWeight={700}>
                    {anime.title}
                  </Typography>
                  <Button
                    variant="outlined"
                    color={isFavorite(anime.mal_id) ? "error" : "inherit"}
                    startIcon={
                      isFavorite(anime.mal_id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )
                    }
                    onClick={() => toggleFavorite(anime.mal_id)}
                  >
                    {isFavorite(anime.mal_id) ? "Nos favoritos" : "Favoritar"}
                  </Button>
                  <Button
                    variant="outlined"
                    color={isWatched(anime.mal_id) ? "success" : "inherit"}
                    startIcon={
                      isWatched(anime.mal_id) ? (
                        <CheckCircleIcon />
                      ) : (
                        <CheckCircleOutlineIcon />
                      )
                    }
                    onClick={() => toggleWatched(anime.mal_id)}
                  >
                    {isWatched(anime.mal_id) ? "Assistido" : "Marcar assistido"}
                  </Button>
                </Box>

                {(anime.title_english || anime.title_japanese) && (
                  <Typography variant="body2" color="text.secondary">
                    {anime.title_english && <span>{anime.title_english}</span>}
                    {anime.title_english && anime.title_japanese && " · "}
                    {anime.title_japanese && (
                      <span>{anime.title_japanese}</span>
                    )}
                  </Typography>
                )}

                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {anime.score != null && (
                    <Chip
                      label={`Nota: ${anime.score}`}
                      size="small"
                    />
                  )}
                  {anime.episodes != null && (
                    <Chip
                      label={`Episódios: ${anime.episodes}`}
                      size="small"
                    />
                  )}
                  {anime.status && (
                    <Chip label={anime.status} size="small" variant="outlined" />
                  )}
                  {anime.rating && (
                    <Chip label={anime.rating} size="small" variant="outlined" />
                  )}
                  {anime.aired?.from && (
                    <Chip
                      label={`Estreia: ${anime.aired.from}`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Stack>

                {anime.genres && anime.genres.length > 0 && (
                  <Stack direction="row" flexWrap="wrap" gap={0.5}>
                    {anime.genres.map((g) => (
                      <Chip key={g.mal_id} label={g.name} size="small" />
                    ))}
                  </Stack>
                )}

                {embedUrl && (
                  <Box
                    component="iframe"
                    src={embedUrl}
                    title="Trailer"
                    sx={{
                      width: "100%",
                      maxWidth: 560,
                      aspectRatio: "16 / 9",
                      border: 0,
                      borderRadius: 1,
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                <Divider />

                {synopsisText ? (
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {synopsisText}
                  </Typography>
                ) : (
                  <Typography color="text.secondary">
                    Sem sinopse disponível.
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}
