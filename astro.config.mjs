import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  // 出力モードを「静的サイト」に指定（これでアダプター不要になります）
  output: 'static', 
  
  vite: {
    plugins: [tailwind()],
  },
});