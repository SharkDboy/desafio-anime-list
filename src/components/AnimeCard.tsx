import { Link as RouterLink } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useFavorites } from "@/context/FavoritesContext";
import type { AnimeListItem } from "@/types/anime";

type Props = {
  anime: AnimeListItem;
};

export function AnimeCard({ anime }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(anime.mal_id);
  const img =
    anime.images.jpg.large_image_url ||
    anime.images.jpg.small_image_url ||
    anime.images.jpg.image_url;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <IconButton
        aria-label={
          fav ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(anime.mal_id);
        }}
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          zIndex: 1,
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
            {anime.score != null ? `★ ${anime.score}` : "Sem nota"}
            {anime.episodes != null ? ` · ${anime.episodes} eps` : ""}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
