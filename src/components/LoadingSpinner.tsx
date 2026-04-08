import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  label?: string;
};

export function LoadingSpinner({ label = "Carregando" }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
      <CircularProgress aria-label={label} />
    </Box>
  );
}
