import { Link as RouterLink, useMatch } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useFavorites } from "@/context/FavoritesContext";

export function Header() {
  const homeActive = useMatch({ path: "/", end: true });
  const { ids } = useFavorites();

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ maxWidth: 1152, width: "100%", mx: "auto" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 0,
            mr: 1,
            color: "inherit",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Anime List
        </Typography>
        {ids.length > 0 && (
          <Chip
            size="small"
            label={`${ids.length} favorito${ids.length > 1 ? "s" : ""}`}
            color="primary"
            variant="outlined"
            sx={{ mr: 1 }}
          />
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button
          component={RouterLink}
          to="/"
          color="inherit"
          variant={homeActive ? "contained" : "text"}
        >
          Início
        </Button>
      </Toolbar>
    </AppBar>
  );
}
