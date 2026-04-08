import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getTopAnime } from "@/api/animeApi";
import type { AnimeListItem } from "@/types/anime";

const CAROUSEL_LIMIT = 12;

export function PopularCarousel() {
  const [items, setItems] = useState<AnimeListItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    getTopAnime({ page: 1, limit: CAROUSEL_LIMIT, filter: "bypopularity" })
      .then((res) => {
        if (!cancelled) setItems(res.data);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5 }}>
        Populares agora
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          overflowX: "auto",
          pb: 1,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((anime) => {
          const img =
            anime.images.jpg.large_image_url ||
            anime.images.jpg.small_image_url ||
            anime.images.jpg.image_url;
          return (
            <Paper
              key={anime.mal_id}
              component={RouterLink}
              to={`/anime/${anime.mal_id}`}
              variant="outlined"
              sx={{
                flex: "0 0 140px",
                scrollSnapAlign: "start",
                textDecoration: "none",
                color: "inherit",
                overflow: "hidden",
                transition: "transform 0.15s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Box
                component="img"
                src={img}
                alt=""
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  display: "block",
                  bgcolor: "grey.900",
                }}
              />
              <Box sx={{ p: 1 }}>
                <Typography variant="caption" noWrap display="block" title={anime.title}>
                  {anime.title}
                </Typography>
                {anime.score != null && (
                  <Typography variant="caption" color="text.secondary">
                    ★ {anime.score}
                  </Typography>
                )}
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}
