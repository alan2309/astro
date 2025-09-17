// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
  plugins: [tailwindcss()],
  server: {
      proxy: {
        "/api": {
          target: "http://139.59.10.56:5984",
          changeOrigin: true,                        // 👈 makes host header match
          rewrite: (path) => path.replace(/^\/api/, "/fossee"), // 👈 maps /api → /fossee
        },
      },
    },
},

  integrations: [react()],
});