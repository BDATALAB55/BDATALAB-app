import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bdatalab-app.pages.dev', 
  output: 'server',
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
    // SSR時のエラーを防ぐための追加設定
    ssr: {
      external: ['node:path', 'node:fs']
    }
  },
});