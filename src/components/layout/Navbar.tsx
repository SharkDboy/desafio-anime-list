import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useMatch } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { useAnimeLists } from "@/hooks/useAnimeLists";

export function Navbar() {
  const homeActive = useMatch({ path: "/", end: true });
  const favActive = useMatch({ path: "/favorites", end: true });
  const watchedActive = useMatch({ path: "/watched", end: true });
  const { favoriteIds, watchedIds } = useAnimeLists();

  return (
    <AppBar position="sticky" color="default" elevation={2}>
      <Toolbar
        sx={{
          maxWidth: 1152,
          width: "100%",
          mx: "auto",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box
          component="nav"
          aria-label="Principal"
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            minWidth: 0,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ minWidth: 0 }}
          >
            <MovieFilterOutlinedIcon
              color="primary"
              fontSize="small"
              aria-hidden
            />
            <Stack spacing={0} sx={{ minWidth: 0 }}>
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Anime List
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Jikan API · MyAnimeList (não oficial)
              </Typography>
            </Stack>
          </Stack>

          <SearchBar />

          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            variant={homeActive ? "contained" : "text"}
            aria-current={homeActive ? "page" : undefined}
          >
            Início
          </Button>
          <Button
            component={RouterLink}
            to="/favorites"
            color="inherit"
            variant={favActive ? "contained" : "text"}
            aria-current={favActive ? "page" : undefined}
          >
            Favoritos
          </Button>
          <Button
            component={RouterLink}
            to="/watched"
            color="inherit"
            variant={watchedActive ? "contained" : "text"}
            aria-current={watchedActive ? "page" : undefined}
          >
            Assistidos
          </Button>
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
          {favoriteIds.length > 0 && (
            <Chip
              size="small"
              label={`Favoritos: ${favoriteIds.length}`}
              color="primary"
              variant="outlined"
            />
          )}
          {watchedIds.length > 0 && (
            <Chip
              size="small"
              label={`Assistidos: ${watchedIds.length}`}
              color="success"
              variant="outlined"
            />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
