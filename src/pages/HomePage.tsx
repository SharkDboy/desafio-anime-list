import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Lista de animes
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Esqueleto do desafio — conecte a API e liste os cards aqui.
        </Typography>
      </Box>

      <Paper
        component="section"
        variant="outlined"
        aria-label="Placeholder da grade de animes"
        sx={{
          p: 6,
          textAlign: "center",
          borderStyle: "dashed",
          bgcolor: "background.paper",
        }}
      >
        <Typography color="text.secondary">
          Grade de animes (busca, filtros, paginação) virá aqui.
        </Typography>
      </Paper>
    </Box>
  );
}
