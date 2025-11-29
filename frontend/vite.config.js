import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración limpia: React + Vite + Tailwind vía PostCSS
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
  },
});
