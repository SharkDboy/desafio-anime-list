import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/mymemory": {
        target: "https://api.mymemory.translated.net",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/mymemory/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
