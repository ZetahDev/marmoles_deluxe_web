// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), auth()],
  site: 'https://marmolesdeluxe.com',
  vite: {
    build: {
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]'
        }
      }
    }
  }
});