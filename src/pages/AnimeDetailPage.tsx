import { Link as RouterLink, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Link component={RouterLink} to="/" underline="hover" variant="body2">
        ← Voltar
      </Link>

      <Box>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Detalhe do anime
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, fontFamily: "monospace" }}
        >
          ID na rota: {id ?? "—"}
        </Typography>
      </Box>

      <Paper
        component="section"
        variant="outlined"
        sx={{
          p: 6,
          textAlign: "center",
          borderStyle: "dashed",
          bgcolor: "background.paper",
        }}
      >
        <Typography color="text.secondary">
          Conteúdo do anime (sinopse, episódios, etc.) virá aqui.
        </Typography>
      </Paper>
    </Box>
  );
}
