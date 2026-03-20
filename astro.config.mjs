import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  output: 'static', // これが最重要です
  vite: {
    plugins: [tailwind()],
  },
});