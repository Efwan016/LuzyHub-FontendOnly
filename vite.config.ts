import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  appType: "spa",
  base: "/",
  server: {
    proxy: {
      // API lama
      "/api": {
        target: "https://foodcash.com.br/sistema/apiv4",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    },
  },

  build: {
    rollupOptions: {
      input: "/index.html",
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});