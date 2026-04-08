import { Link as RouterLink } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAnimeLists } from "@/hooks/useAnimeLists";
import type { AnimeListItem } from "@/types/anime";

type Props = {
  anime: AnimeListItem;
};

export function AnimeCard({ anime }: Props) {
  const { isFavorite, isWatched, toggleFavorite, toggleWatched } =
    useAnimeLists();
  const fav = isFavorite(anime.mal_id);
  const watched = isWatched(anime.mal_id);
  const img =
    anime.images.jpg.large_image_url ||
    anime.images.jpg.small_image_url ||
    anime.images.jpg.image_url;

  const metaParts: string[] = [];
  if (anime.score != null) metaParts.push(`★ ${anime.score}`);
  if (anime.year != null) metaParts.push(String(anime.year));
  if (anime.episodes != null) metaParts.push(`${anime.episodes} eps`);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <IconButton
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(anime.mal_id);
          }}
          sx={{
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "action.hover" },
          }}
          size="small"
        >
          {fav ? (
            <FavoriteIcon color="error" fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
        <IconButton
          aria-label={
            watched ? "Remover dos assistidos" : "Marcar como assistido"
          }
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWatched(anime.mal_id);
          }}
          sx={{
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "action.hover" },
          }}
          size="small"
        >
          {watched ? (
            <CheckCircleIcon color="success" fontSize="small" />
          ) : (
            <CheckCircleOutlineIcon fontSize="small" />
          )}
        </IconButton>
      </Box>
      <CardActionArea
        component={RouterLink}
        to={`/anime/${anime.mal_id}`}
        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <CardMedia
          component="img"
          height="240"
          image={img}
          alt=""
          sx={{ objectFit: "cover", bgcolor: "grey.900" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" noWrap title={anime.title}>
            {anime.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {metaParts.length > 0 ? metaParts.join(" · ") : "—"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
