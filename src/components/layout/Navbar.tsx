import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useMatch } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";
import { useLocale } from "@/context/LocaleContext";
import type { Locale } from "@/i18n/constants";

export function Navbar() {
  const homeActive = useMatch({ path: "/", end: true });
  const { ids } = useFavorites();
  const { locale, setLocale, t } = useLocale();

  const favLabel =
    ids.length === 1
      ? t("nav.favOne", { n: ids.length })
      : t("nav.favOther", { n: ids.length });

  return (
    <AppBar position="sticky" color="default" elevation={2}>
      <Toolbar sx={{ maxWidth: 1152, width: "100%", mx: "auto", gap: 2 }}>
        <Box
          component="nav"
          aria-label={t("nav.ariaNav")}
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
                {t("nav.brandSubtitle")}
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
            {t("nav.home")}
          </Button>
        </Box>

        <FormControl
          size="small"
          sx={{ minWidth: { xs: 120, sm: 160 }, flexShrink: 0 }}
        >
          <InputLabel id="locale-select-label">{t("nav.language")}</InputLabel>
          <Select<Locale>
            labelId="locale-select-label"
            value={locale}
            label={t("nav.language")}
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <MenuItem value="pt-BR">{t("nav.langPt")}</MenuItem>
            <MenuItem value="es">{t("nav.langEs")}</MenuItem>
          </Select>
        </FormControl>

        {ids.length > 0 && (
          <Chip
            size="small"
            label={favLabel}
            color="primary"
            variant="outlined"
            sx={{ flexShrink: 0 }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
