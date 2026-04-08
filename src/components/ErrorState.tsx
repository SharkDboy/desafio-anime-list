import Alert from "@mui/material/Alert";

type Props = {
  message: string;
};

export function ErrorState({ message }: Props) {
  return (
    <Alert severity="error" sx={{ width: "100%" }}>
      {message}
    </Alert>
  );
}
