import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: vercel(),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  site: "https://marmolesdeluxe.com",
  vite: {
    build: {
      assetsDir: "assets",
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name].[hash][extname]",
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("react-dom")) {
                return "vendor-react";
              }
              if (id.includes("@radix-ui")) {
                return "vendor-ui";
              }
              return "vendor";
            }
          },
        },
      },
    },
  },
});
