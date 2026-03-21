import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // あなたの実際のURLに合わせてください
  site: 'https://bdatalab-app.pages.dev', 
  output: 'server',
  adapter: cloudflare({
    mode: 'directory', // または 'advanced'。通常は指定なしでも動きますが、明示すると安定します
  }),
});