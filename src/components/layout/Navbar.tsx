import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useMatch } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";

/**
 * Barra superior principal: marca, navegação e resumo de favoritos.
 * Dia 2 — interface inicial com MUI (AppBar + navegação explícita).
 */
export function Navbar() {
  const homeActive = useMatch({ path: "/", end: true });
  const { ids } = useFavorites();

  return (
    <AppBar position="sticky" color="default" elevation={2}>
      <Toolbar sx={{ maxWidth: 1152, width: "100%", mx: "auto", gap: 2 }}>
        <Box
          component="nav"
          aria-label="Navegação principal"
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
                Ranking e busca • dados Jikan API v4
              </Typography>
            </Stack>
          </Stack>

          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            variant={homeActive ? "contained" : "text"}
            aria-current={homeActive ? "page" : undefined}
          >
            Início
          </Button>
        </Box>

        {ids.length > 0 && (
          <Chip
            size="small"
            label={`${ids.length} favorito${ids.length > 1 ? "s" : ""}`}
            color="primary"
            variant="outlined"
            sx={{ flexShrink: 0 }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
