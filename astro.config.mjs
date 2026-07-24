import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'smart', // Cambiamos de 'directory' a 'smart'
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  }
});
