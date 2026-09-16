/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/khiron/",
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["khiron-icon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Khiron · Movilidad Personal",
        short_name: "Khiron",
        description: "Rutinas personales de movilidad y fisioterapia.",
        lang: "es",
        start_url: "/khiron/#/morning",
        scope: "/khiron/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#f4f7f6",
        theme_color: "#147d76",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
        shortcuts: [
          { name: "Rutina de mañana", short_name: "Mañana", url: "/khiron/#/morning" },
          { name: "Rutina de trabajo", short_name: "Trabajo", url: "/khiron/#/work" },
          { name: "Rutina de noche", short_name: "Noche", url: "/khiron/#/night" },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,svg,png,ico,wav,webmanifest}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www\.googleapis\.com\/drive\//,
            handler: "NetworkOnly",
            method: "GET",
          },
        ],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: false,
  },
});
