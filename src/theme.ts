import { createTheme } from "@mui/material/styles";

const bgInk = "#06040c";
const bgPaper = "#12101c";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8b5cf6" },
    secondary: { main: "#f472b6" },
    background: {
      default: bgInk,
      paper: bgPaper,
    },
    divider: "rgba(255, 255, 255, 0.08)",
    text: {
      primary: "rgba(255, 255, 255, 0.92)",
      secondary: "rgba(255, 255, 255, 0.65)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: bgInk,
          backgroundImage: `
            radial-gradient(ellipse 130% 90% at 50% -25%, rgba(139, 92, 246, 0.28), transparent 55%),
            radial-gradient(ellipse 70% 50% at 100% 20%, rgba(244, 114, 182, 0.12), transparent 50%),
            radial-gradient(ellipse 55% 45% at 0% 85%, rgba(99, 102, 241, 0.14), transparent 50%),
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.04) 1px, transparent 0)
          `,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 18px 18px",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(160deg, rgba(255, 255, 255, 0.045) 0%, transparent 42%)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
          backdropFilter: "blur(10px)",
        },
        colorDefault: {
          backgroundColor: "rgba(18, 16, 28, 0.85)",
        },
      },
    },
  },
});
