import { Link as RouterLink } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAnimeLists } from "@/hooks/useAnimeLists";
import type { AnimeListItem } from "@/types/anime";

type Props = {
  anime: AnimeListItem;
};

export function AnimeListRow({ anime }: Props) {
  const { isFavorite, isWatched, toggleFavorite, toggleWatched } =
    useAnimeLists();
  const fav = isFavorite(anime.mal_id);
  const watched = isWatched(anime.mal_id);
  const img =
    anime.images.jpg.small_image_url ||
    anime.images.jpg.image_url ||
    anime.images.jpg.large_image_url;

  const meta: string[] = [];
  if (anime.score != null) meta.push(`★ ${anime.score}`);
  if (anime.year != null) meta.push(String(anime.year));
  if (anime.episodes != null) meta.push(`${anime.episodes} eps`);

  return (
    <Paper variant="outlined" sx={{ display: "flex", alignItems: "center", gap: 2, p: 1.5 }}>
      <Box
        component={RouterLink}
        to={`/anime/${anime.mal_id}`}
        sx={{
          display: "flex",
          flex: 1,
          minWidth: 0,
          gap: 2,
          textDecoration: "none",
          color: "inherit",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={img}
          alt=""
          sx={{
            width: 80,
            height: 112,
            objectFit: "cover",
            borderRadius: 1,
            flexShrink: 0,
            bgcolor: "grey.900",
          }}
        />
        <Stack minWidth={0} spacing={0.5}>
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {anime.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {meta.length > 0 ? meta.join(" · ") : "—"}
          </Typography>
        </Stack>
      </Box>
      <Stack direction="row" spacing={0.5} alignItems="center" flexShrink={0}>
        <IconButton
          size="small"
          aria-label={fav ? "Remover dos favoritos" : "Favoritar"}
          onClick={() => toggleFavorite(anime.mal_id)}
        >
          {fav ? (
            <FavoriteIcon color="error" fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
        <IconButton
          size="small"
          aria-label={watched ? "Remover dos assistidos" : "Assistido"}
          onClick={() => toggleWatched(anime.mal_id)}
        >
          {watched ? (
            <CheckCircleIcon color="success" fontSize="small" />
          ) : (
            <CheckCircleOutlineIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>
    </Paper>
  );
}
