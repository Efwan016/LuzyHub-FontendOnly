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
      "/api/api.php": {
        target: "https://foodcash.com.br/sistema/apiv4/api.php",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/api\.php/, ''),
      },
      "/api/sports": {
        target: "https://api.sportsrc.org/v2/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sports/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('X-API-KEY', '84f79cf576a79338d491889b45198610');
          });
        },
      },
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