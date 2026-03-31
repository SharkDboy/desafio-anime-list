import { Link as RouterLink, useParams } from "react-router-dom";
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
import { useFavorites } from "@/context/FavoritesContext";
import { useAnimeDetail } from "@/hooks/useAnimeDetail";
import { stripHtml } from "@/utils/stripHtml";

export function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const malId = id ? Number.parseInt(id, 10) : Number.NaN;
  const validId = Number.isFinite(malId) && malId > 0;

  const { data, isPending, isError, error } = useAnimeDetail(
    validId ? malId : null
  );
  const { isFavorite, toggle } = useFavorites();

  if (!validId) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" variant="body2">
          ← Voltar
        </Link>
        <Alert severity="warning">ID de anime inválido.</Alert>
      </Box>
    );
  }

  const anime = data?.data;
  const synopsis = anime?.synopsis ? stripHtml(anime.synopsis) : null;
  const img =
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.jpg?.image_url ||
    "";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Link component={RouterLink} to="/" underline="hover" variant="body2">
        ← Voltar
      </Link>

      {isError && (
        <Alert severity="error">
          {error instanceof Error ? error.message : "Erro ao carregar anime."}
        </Alert>
      )}

      {isPending && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress aria-label="Carregando detalhes" />
        </Box>
      )}

      {anime && (
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, overflow: "hidden" }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
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
            <Grid size={{ xs: 12, md: 8 }}>
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
                    onClick={() => toggle(anime.mal_id)}
                  >
                    {isFavorite(anime.mal_id) ? "Nos favoritos" : "Favoritar"}
                  </Button>
                </Box>

                {(anime.title_english || anime.title_japanese) && (
                  <Typography variant="body2" color="text.secondary">
                    {anime.title_english && (
                      <span>{anime.title_english}</span>
                    )}
                    {anime.title_english && anime.title_japanese && " · "}
                    {anime.title_japanese && (
                      <span>{anime.title_japanese}</span>
                    )}
                  </Typography>
                )}

                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {anime.score != null && (
                    <Chip label={`Nota ${anime.score}`} size="small" />
                  )}
                  {anime.episodes != null && (
                    <Chip label={`${anime.episodes} episódios`} size="small" />
                  )}
                  {anime.status && (
                    <Chip label={anime.status} size="small" variant="outlined" />
                  )}
                  {anime.rating && (
                    <Chip label={anime.rating} size="small" variant="outlined" />
                  )}
                </Stack>

                {anime.genres && anime.genres.length > 0 && (
                  <Stack direction="row" flexWrap="wrap" gap={0.5}>
                    {anime.genres.map((g) => (
                      <Chip key={g.mal_id} label={g.name} size="small" />
                    ))}
                  </Stack>
                )}

                <Divider />

                {synopsis ? (
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {synopsis}
                  </Typography>
                ) : (
                  <Typography color="text.secondary">
                    Sinopse não disponível.
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
