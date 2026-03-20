import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// Vercelの設定を削除（またはコメントアウト）
// import vercel from '@astrojs/vercel'; 

export default defineConfig({
  vite: {
    plugins: [tailwind()],
  },
  // adapterの設定を消すことで、Cloudflareが読み込める「静的サイト」形式で出力されます
});