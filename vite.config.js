import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";
import basicSsl from "@vitejs/plugin-basic-ssl";
import "dotenv/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  base: process.env.VITE_BASENAME,
  preview: {
    host: "frontend.local",
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_SERVER_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  server: {
    host: "frontend.local",
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_SERVER_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
