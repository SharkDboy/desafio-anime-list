import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import { AnimeListsProvider } from "./context/AnimeListsProvider";
import { theme } from "./theme";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimeListsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AnimeListsProvider>
    </ThemeProvider>
  </StrictMode>
);
