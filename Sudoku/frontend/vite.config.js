import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/Peticiones": {
        target: "http://localhost/Proyecto-Final-LPyL/Sudoku/backend/public",
        changeOrigin: true,
      },
    },
  },
});
