import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite'; // これが必要

export default defineConfig({
  site: 'https://bdatalab-app.pages.dev', 
  output: 'server',
  adapter: cloudflare(), // シンプルな設定に戻します
  vite: {
    plugins: [tailwindcss()], // ここで Tailwind を有効にします
  },
});