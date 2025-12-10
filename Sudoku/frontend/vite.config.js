import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/API": {
        target: "http://localhost/Final-LPyP/Sudoku/backend/public",
        changeOrigin: true,
      },
    },
  },
});
