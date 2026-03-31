import { Link as RouterLink, useMatch } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export function Header() {
  const homeActive = useMatch({ path: "/", end: true });

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ maxWidth: 1152, width: "100%", mx: "auto" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 0,
            mr: 4,
            color: "inherit",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Anime List
        </Typography>
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
