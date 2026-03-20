import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  // この一行を必ず追加してください。これでアダプター不要のエラーが消えます。
  output: 'static',
  
  vite: {
    plugins: [tailwind()],
  },
});