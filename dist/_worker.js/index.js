globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Ckm4tkIW.mjs';
import { manifest } from './manifest_DrFCLtfZ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/b-players.astro.mjs');
const _page2 = () => import('./pages/b1-cards.astro.mjs');
const _page3 = () => import('./pages/b1-home.astro.mjs');
const _page4 = () => import('./pages/b1-reports.astro.mjs');
const _page5 = () => import('./pages/b1-team.astro.mjs');
const _page6 = () => import('./pages/b2-cards.astro.mjs');
const _page7 = () => import('./pages/b2-home.astro.mjs');
const _page8 = () => import('./pages/b2-reports.astro.mjs');
const _page9 = () => import('./pages/b2-team.astro.mjs');
const _page10 = () => import('./pages/nba-cards.astro.mjs');
const _page11 = () => import('./pages/nba-home.astro.mjs');
const _page12 = () => import('./pages/nba-players.astro.mjs');
const _page13 = () => import('./pages/nba-reports.astro.mjs');
const _page14 = () => import('./pages/nba-team.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/b-players.astro", _page1],
    ["src/pages/b1-cards.astro", _page2],
    ["src/pages/b1-home.astro", _page3],
    ["src/pages/b1-reports.astro", _page4],
    ["src/pages/b1-team.astro", _page5],
    ["src/pages/b2-cards.astro", _page6],
    ["src/pages/b2-home.astro", _page7],
    ["src/pages/b2-reports.astro", _page8],
    ["src/pages/b2-team.astro", _page9],
    ["src/pages/nba-cards.astro", _page10],
    ["src/pages/nba-home.astro", _page11],
    ["src/pages/nba-players.astro", _page12],
    ["src/pages/nba-reports.astro", _page13],
    ["src/pages/nba-team.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
