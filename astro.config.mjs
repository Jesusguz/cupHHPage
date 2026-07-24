import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite'; // Cambiamos esto

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
  }),
  integrations: [react()], // Quitamos 'tailwind()' de aquí
  vite: {
    plugins: [tailwindcss()], // Agregamos el plugin de Vite
  }
});
