import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/src/components/")) {
            return "components";
          }
          // Puedes agregar más reglas aquí si lo necesitas
        },
      },
    },
    chunkSizeWarningLimit: 500, // ajusta este valor según tus necesidades
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "KrumDit",
        short_name: "KrumDit",
        icons: [
          {
            src: "icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/android-chrome-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#181818",
        display: "standalone",
      },
    }),
  ],
});
