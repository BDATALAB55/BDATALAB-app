globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, g as renderHead, h as renderSlot, r as renderTemplate } from './astro/server_CKE3Pew-.mjs';
/* empty css                             */

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="ja"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>NBA Card App</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/masaki/BDATALAB-app/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
