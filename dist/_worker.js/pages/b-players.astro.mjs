globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, d as defineScriptVars, a as renderComponent, b as createAstro, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_CKE3Pew-.mjs';
import { $ as $$Layout } from '../chunks/Layout_6T3sI24S.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$BPlayers = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BPlayers;
  const { searchParams } = Astro2.url;
  const playerName = searchParams.get("name") || "";
  const GITHUB_REPO = "BDATALAB55/BDL-game-player-cards";
  const token = process.env.GITHUB_TOKEN;
  const RECURSIVE_API = `https://api.github.com/repos/${GITHUB_REPO}/git/trees/main?recursive=1&t=${Date.now()}`;
  let playerCards = [];
  let totalGames = 0;
  let availableDatesMap = {};
  if (playerName) {
    try {
      const res = await fetch(RECURSIVE_API, {
        headers: {
          ...token ? { "Authorization": `token ${token}` } : {},
          "Accept": "application/vnd.github.v3+json"
        },
        cache: "no-store"
      });
      const data = await res.json();
      if (data.tree) {
        const searchKey = playerName.toUpperCase().replace(/\s+/g, "_");
        const matchedFiles = data.tree.filter((item) => {
          const path = item.path.toUpperCase();
          return (path.includes("OUTPUT/BPLAYERS/") || path.includes("OUTPUT/PLAYERS/")) && path.endsWith(".PNG") && path.includes(searchKey);
        });
        playerCards = matchedFiles.map((file) => {
          const fileName = file.path.split("/").pop() || "";
          const dateMatch = fileName.match(/(\d{8})\.png$/i);
          const fullDate = dateMatch ? dateMatch[1] : "";
          const shortDate = fullDate ? fullDate.substring(2) : "";
          if (shortDate) availableDatesMap[shortDate] = true;
          return {
            fullDate,
            displayDate: shortDate,
            imagePath: `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${file.path}?t=${Date.now()}`
          };
        }).sort((a, b) => b.fullDate.localeCompare(a.fullDate));
      }
      totalGames = playerCards.length;
    } catch (e) {
      console.error("Fetch error:", e);
    }
  }
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", '\n  let currentY = 2026;\n  let currentM = 1; // 2月\n\n  // 初期の表示年月をデータの最新日に合わせる\n  const dateKeys = Object.keys(availableDatesMap).sort((a,b) => b.localeCompare(a));\n  if (dateKeys.length > 0) {\n    currentY = 2000 + parseInt(dateKeys[0].substring(0,2));\n    currentM = parseInt(dateKeys[0].substring(2,4)) - 1;\n  }\n\n  function renderCalendar(y, m) {\n    const calendarEl = document.getElementById(\'calendar\');\n    if (!calendarEl) return;\n\n    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];\n    const firstDay = new Date(y, m, 1).getDay();\n    const daysInMonth = new Date(y, m + 1, 0).getDate();\n\n    // ヘッダー\n    let html = `\n      <div class="flex justify-between items-center mb-6 px-2 text-white font-black text-xs tracking-widest">\n        <button type="button" class="p-2 hover:text-blue-400 transition-colors" id="prevM">←</button>\n        <span>${monthNames[m]} ${y}</span>\n        <button type="button" class="p-2 hover:text-blue-400 transition-colors" id="nextM">→</button>\n      </div>\n      <div class="grid grid-cols-7 gap-1 text-[9px] text-center text-white/40 mb-4 font-bold uppercase">\n        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>\n      </div>\n      <div class="grid grid-cols-7 gap-y-3">`;\n\n    for (let i = 0; i < firstDay; i++) html += `<div></div>`;\n\n    for (let d = 1; d <= daysInMonth; d++) {\n      const yearSuffix = String(y).slice(-2);\n      const dateKey = `${yearSuffix}${String(m + 1).padStart(2, \'0\')}${String(d).padStart(2, \'0\')}`;\n      \n      // availableDatesMap[dateKey] が存在するかチェック\n      const hasData = !!availableDatesMap[dateKey]; \n      \n      const activeStyle = hasData ? "bg-[#2D3A56] text-white font-black cursor-pointer shadow-lg scale-110" : "text-white/10 pointer-events-none";\n\n      html += `\n        <div class="flex justify-center items-center">\n          <div class="w-11 h-11 shrink-0 aspect-square flex items-center justify-center rounded-full text-[11px] transition-all ${activeStyle}" \n               ${hasData ? `data-date="${dateKey}"` : \'\'}>\n            ${d}\n          </div>\n        </div>`;\n    }\n    \n    calendarEl.innerHTML = html + `</div>`;\n\n    // 月移動イベント\n    document.getElementById(\'prevM\').onclick = () => { \n      currentM--; if(currentM < 0){ currentM = 11; currentY--; } \n      renderCalendar(currentY, currentM); \n    };\n    document.getElementById(\'nextM\').onclick = () => { \n      currentM++; if(currentM > 11){ currentM = 0; currentY++; } \n      renderCalendar(currentY, currentM); \n    };\n\n    // 日付クリックイベント（スクロールロジックをここに記載）\n    calendarEl.querySelectorAll(\'[data-date]\').forEach(el => {\n      el.onclick = () => {\n        const targetDate = el.getAttribute(\'data-date\');\n        const targetEl = document.getElementById(`card-${targetDate}`);\n        if (targetEl) {\n          targetEl.scrollIntoView({ behavior: \'smooth\', block: \'center\', inline: \'center\' });\n        }\n      };\n    });\n  }\n\n  // 初回実行\n  renderCalendar(currentY, currentM);\n})();</script> '], ["", " <script>(function(){", '\n  let currentY = 2026;\n  let currentM = 1; // 2月\n\n  // 初期の表示年月をデータの最新日に合わせる\n  const dateKeys = Object.keys(availableDatesMap).sort((a,b) => b.localeCompare(a));\n  if (dateKeys.length > 0) {\n    currentY = 2000 + parseInt(dateKeys[0].substring(0,2));\n    currentM = parseInt(dateKeys[0].substring(2,4)) - 1;\n  }\n\n  function renderCalendar(y, m) {\n    const calendarEl = document.getElementById(\'calendar\');\n    if (!calendarEl) return;\n\n    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];\n    const firstDay = new Date(y, m, 1).getDay();\n    const daysInMonth = new Date(y, m + 1, 0).getDate();\n\n    // ヘッダー\n    let html = \\`\n      <div class="flex justify-between items-center mb-6 px-2 text-white font-black text-xs tracking-widest">\n        <button type="button" class="p-2 hover:text-blue-400 transition-colors" id="prevM">←</button>\n        <span>\\${monthNames[m]} \\${y}</span>\n        <button type="button" class="p-2 hover:text-blue-400 transition-colors" id="nextM">→</button>\n      </div>\n      <div class="grid grid-cols-7 gap-1 text-[9px] text-center text-white/40 mb-4 font-bold uppercase">\n        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>\n      </div>\n      <div class="grid grid-cols-7 gap-y-3">\\`;\n\n    for (let i = 0; i < firstDay; i++) html += \\`<div></div>\\`;\n\n    for (let d = 1; d <= daysInMonth; d++) {\n      const yearSuffix = String(y).slice(-2);\n      const dateKey = \\`\\${yearSuffix}\\${String(m + 1).padStart(2, \'0\')}\\${String(d).padStart(2, \'0\')}\\`;\n      \n      // availableDatesMap[dateKey] が存在するかチェック\n      const hasData = !!availableDatesMap[dateKey]; \n      \n      const activeStyle = hasData ? "bg-[#2D3A56] text-white font-black cursor-pointer shadow-lg scale-110" : "text-white/10 pointer-events-none";\n\n      html += \\`\n        <div class="flex justify-center items-center">\n          <div class="w-11 h-11 shrink-0 aspect-square flex items-center justify-center rounded-full text-[11px] transition-all \\${activeStyle}" \n               \\${hasData ? \\`data-date="\\${dateKey}"\\` : \'\'}>\n            \\${d}\n          </div>\n        </div>\\`;\n    }\n    \n    calendarEl.innerHTML = html + \\`</div>\\`;\n\n    // 月移動イベント\n    document.getElementById(\'prevM\').onclick = () => { \n      currentM--; if(currentM < 0){ currentM = 11; currentY--; } \n      renderCalendar(currentY, currentM); \n    };\n    document.getElementById(\'nextM\').onclick = () => { \n      currentM++; if(currentM > 11){ currentM = 0; currentY++; } \n      renderCalendar(currentY, currentM); \n    };\n\n    // 日付クリックイベント（スクロールロジックをここに記載）\n    calendarEl.querySelectorAll(\'[data-date]\').forEach(el => {\n      el.onclick = () => {\n        const targetDate = el.getAttribute(\'data-date\');\n        const targetEl = document.getElementById(\\`card-\\${targetDate}\\`);\n        if (targetEl) {\n          targetEl.scrollIntoView({ behavior: \'smooth\', block: \'center\', inline: \'center\' });\n        }\n      };\n    });\n  }\n\n  // 初回実行\n  renderCalendar(currentY, currentM);\n})();</script> '])), renderComponent($$result, "Layout", $$Layout, { "title": `${playerName} - BDATALAB` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-[#373A36] text-white font-avenir relative pb-0 overflow-x-hidden"> <header class="max-w-7xl mx-auto px-8 pt-16 pb-8 flex justify-between items-end border-b border-white/10"> <div> <h1 class="text-5xl md:text-7xl font-bold uppercase tracking-normal leading-none font-avenir">${playerName}</h1> </div> </header> <main class="max-w-7xl mx-auto px-8 mt-12"> <div class="flex justify-between items-end mb-10"> <div> <h2 class="text-4xl font-bold uppercase tracking-tight leading-none mb-4">BOX SCORE</h2> </div> <div class="text-right leading-none"> <span class="text-7xl md:text-7xl font-bold italic opacity-20 block tracking-[-0.1em]">${totalGames}</span> <span class="text-[12px] font-bold opacity-40 uppercase tracking-[0.3em]">GAMES</span> </div> </div> ${playerCards.length > 0 ? renderTemplate`<div class="flex overflow-x-auto gap-8 no-scrollbar pb-10 snap-x"> ${playerCards.map((card) => renderTemplate`<div${addAttribute(`card-${card.displayDate}`, "id")} class="flex-none w-[320px] snap-start"> <div class="mb-4 flex items-center gap-2 px-1"> <div class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div> <span class="text-[20px] font-black text-white/80 tracking-widest"> ${card.fullDate.substring(0, 4)}.${card.fullDate.substring(4, 6)}.${card.fullDate.substring(6, 8)} </span> </div> <div class="rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl transition-transform hover:scale-[1.02]"> <img${addAttribute(card.imagePath, "src")}${addAttribute(playerName, "alt")} class="w-full h-auto block" loading="lazy"> </div> </div>`)} </div>` : renderTemplate`<div class="py-20 rounded-3xl border-2 border-dashed border-white/5 flex items-center justify-center bg-black/10"> <p class="text-white/20 font-black uppercase tracking-[0.3em] text-xs italic">No player data found</p> </div>`} <div class="mt-32 flex flex-col items-center"> <p class="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase mb-10 italic">Game Calendar</p> <div id="calendar" class="bg-black/30 backdrop-blur-md p-10 rounded-[40px] border border-white/5 w-full max-w-sm shadow-inner"></div> </div> </main> <footer class="w-full pt-16 pb-32 flex flex-col items-center justify-center gap-6 bg-black/10 shrink-0 border-t border-white/5 mt-20"> <div class="text-center"> <h2 class="text-xl md:text-3xl font-black tracking-widest uppercase leading-none" style="color: #2E3C57; -webkit-text-stroke: 1px rgba(255,255,255,0.7); paint-order: stroke fill;">
BDATALAB
</h2> </div> <div class="flex items-center gap-6"> <a href="https://x.com/BDataLab5x5" target="_blank" rel="noopener noreferrer" class="group"> <div class="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all border border-white/5"> <svg class="w-3.5 h-3.5 fill-white/60 group-hover:fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg> </div> </a> <div class="h-4 w-[1px] bg-white/10"></div> <a href="https://note.com/bdatalab5x5" target="_blank" rel="noopener noreferrer" class="group"> <div class="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#23bb9d]/80 transition-all border border-white/5"> <span class="text-[16px] font-black text-white/60 group-hover:text-white">n</span> </div> </a> </div> </footer> <div class="fixed bottom-8 left-8 z-50"> <button onclick="history.back()" class="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl active:scale-95 border border-white/10 flex items-center gap-3 group transition-all"> <span class="opacity-40 group-hover:opacity-100 transition-colors">←</span> BACK
</button> </div> <div class="fixed bottom-8 right-8 z-50"> <a href="/b1-home" class="bg-gray-800/80 backdrop-blur-md text-white px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl active:scale-95 border border-white/10 block transition-all">
B1 HOME
</a> </div> </div> ` }), defineScriptVars({ availableDatesMap }));
}, "/Users/masaki/BDATALAB-app/src/pages/b-players.astro", void 0);
const $$file = "/Users/masaki/BDATALAB-app/src/pages/b-players.astro";
const $$url = "/b-players";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$BPlayers,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
