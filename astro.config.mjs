import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server', // ESTO ES VITAL: Le dice a Astro que no es estática, sino dinámica.
  adapter: cloudflare({
    mode: 'directory', // Asegura que Cloudflare Pages entienda la estructura.
  }),
  integrations: [react(), tailwind()],
});
