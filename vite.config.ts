import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      /*
       * autoUpdate: when a new SW version is detected on app open,
       * it activates immediately and silently reloads the page.
       * Users always get the latest version without reinstalling.
       */
      registerType: "autoUpdate",

      /*
       * Use the existing public/manifest.json — no need to duplicate it.
       */
      manifest: false,

      workbox: {
        /*
         * The Three.js + R3F bundle exceeds Workbox's 2 MB default limit.
         * Raise it to 4 MB to allow precaching the full bundle.
         */
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,

        /*
         * Precache: JS bundles, CSS, HTML, icons, fonts, and earth textures.
         * Hashed filenames get immutable caching; index.html is always
         * revalidated on next open (network-first via SW).
         */
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,woff2}",
          "textures/*.{jpg,png}",
        ],

        /*
         * SPA fallback — all navigation requests serve index.html so
         * deep-links (e.g. ?dest=tokyo) still work when offline.
         */
        navigateFallback: "index.html",

        runtimeCaching: [
          {
            /*
             * Earth textures: large, rarely change.
             * CacheFirst: serve from cache, update silently in background.
             */
            urlPattern: ({ url }) => url.pathname.startsWith("/textures/"),
            handler: "CacheFirst",
            options: {
              cacheName: "earth-textures",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            /* Google Fonts stylesheets */
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            /* Google Fonts web font files */
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
});
