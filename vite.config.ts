import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-select')) {
              return 'react-select';
            }
            if (id.includes('@dnd-kit/core')) {
              return 'dnd-kit-core';
            }
            return 'vendor';
          }
          if (id.includes('/src/components/')) {
            return 'components';
          }
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'KrumDit',
        short_name: 'KrumDit',
        icons: [
          {
            src: 'icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/android-chrome-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
        ],
        theme_color: '#ffffff',
        background_color: '#181818',
        display: 'standalone',
      },
    }),
    visualizer({ open: true }),
  ],
});
