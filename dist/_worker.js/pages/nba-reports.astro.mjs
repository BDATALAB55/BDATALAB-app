globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, d as defineScriptVars, a as renderComponent, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_CKE3Pew-.mjs';
import { $ as $$Layout } from '../chunks/Layout_6T3sI24S.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const prerender = false;
const $$NbaReports = createComponent(async ($$result, $$props, $$slots) => {
  const GITHUB_REPO = "BDATALAB55/BDL-game-player-cards";
  const RECURSIVE_API = `https://api.github.com/repos/${GITHUB_REPO}/git/trees/main?recursive=1&t=${Date.now()}`;
  const IMAGE_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/output/reports/NBA`;
  const token = process.env.GITHUB_TOKEN;
  let reportGroups = [];
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
      const allFiles = data.tree.filter(
        (item) => item.path.includes("output/reports/NBA/") && item.path.toLowerCase().endsWith(".png")
      );
      const groups = {};
      allFiles.forEach((file) => {
        const pathParts = file.path.split("/");
        const nbaIndex = pathParts.indexOf("NBA");
        if (nbaIndex === -1 || pathParts.length <= nbaIndex + 2) return;
        const folderName = pathParts[nbaIndex + 1];
        const fileName = pathParts[nbaIndex + 2];
        if (!/^\d+$/.test(folderName)) return;
        const nameParts = fileName.replace(".png", "").split("_");
        const fullDate = nameParts[2] || "";
        const gameId = nameParts[3] || "";
        const teamA = nameParts[nameParts.length - 2] || "AWAY";
        const teamB = nameParts[nameParts.length - 1] || "HOME";
        if (!groups[folderName]) {
          groups[folderName] = {
            id: folderName,
            date: `20${folderName.substring(0, 2)}.${folderName.substring(2, 4)}.${folderName.substring(4, 6)}`,
            reports: []
          };
        }
        const cardFolderName = `NBA_Cards_${gameId}_${fullDate}`;
        groups[folderName].reports.push({
          path: `${IMAGE_BASE_URL}/${folderName}/${fileName}?t=${Date.now()}`,
          away: teamA,
          home: teamB,
          link: `/nba-cards?folder=${folderName}/${cardFolderName}`
        });
      });
      reportGroups = Object.values(groups).sort((a, b) => b.id.localeCompare(a.id));
    }
  } catch (e) {
    console.error("Fetch Error:", e);
  }
  const allData = reportGroups;
  const availableDates = reportGroups.map((g) => g.id);
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", '\n  let currentY = 2026;\n  let currentM = 0; \n\n  if (availableDates.length > 0) {\n    const latest = availableDates[0];\n    currentY = 2000 + parseInt(latest.substring(0,2));\n    currentM = parseInt(latest.substring(2,4)) - 1;\n  }\n\n  window.updateReports = function(dateId) {\n    const sliderEl = document.getElementById(\'report-slider\');\n    const dateTitleEl = document.getElementById(\'display-date\');\n    const labelEl = document.getElementById(\'display-label\');\n    const countEl = document.getElementById(\'display-count\');\n    const data = allData.find(g => g.id === dateId);\n    \n    if (!data || !sliderEl) return;\n\n    dateTitleEl.innerText = data.date;\n    countEl.innerText = data.reports.length;\n\n    const isLatest = (allData.length > 0 && dateId === availableDates[0]);\n    labelEl.innerText = isLatest ? "Latest Update" : "Archive Data";\n    labelEl.className = `text-[10px] font-black uppercase tracking-[0.3em] ${isLatest ? \'text-blue-500\' : \'text-gray-500\'}`;\n\n    sliderEl.innerHTML = data.reports.map(report => `\n      <div class="flex-none w-[85vw] max-w-[400px] snap-center">\n        <div class="rounded-2xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">\n          <img src="${report.path}" class="w-full h-auto block" />\n        </div>\n        <div class="mt-6 text-center">\n          <a href="${report.link}" class="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/40 border-2 border-transparent bg-clip-padding relative active:scale-95 transition-all group overflow-hidden">\n            <div class="absolute inset-0 p-[2px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 -z-10"></div>\n            <span class="text-[14px] font-black tracking-[0.2em] uppercase text-white">\n              ${report.away} <span class="text-[10px] font-medium lowercase tracking-normal mx-1 text-white/50 italic px-1">vs</span> ${report.home}\n            </span>\n          </a>\n        </div>\n      </div>\n    `).join(\'\');\n    sliderEl.scrollTo({ left: 0, behavior: \'smooth\' });\n  };\n\n  window.changeMonth = function(delta) {\n    currentM += delta;\n    if (currentM < 0) { currentM = 11; currentY--; }\n    else if (currentM > 11) { currentM = 0; currentY++; }\n    renderCalendar(currentY, currentM);\n  };\n\n  function renderCalendar(y, m) {\n    const calendarEl = document.getElementById(\'calendar\');\n    if (!calendarEl) return;\n    const firstDay = new Date(y, m, 1).getDay();\n    const daysInMonth = new Date(y, m + 1, 0).getDate();\n    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];\n    \n    let html = `<div class="flex justify-between items-center mb-6 px-2 text-white"><button onclick="changeMonth(-1)">←</button><div class="font-black text-sm tracking-widest">${monthNames[m]} ${y}</div><button onclick="changeMonth(1)">→</button></div><div class="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-gray-600 mb-4 uppercase"><div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div></div><div class="grid grid-cols-7 gap-y-3">`;\n    for (let i = 0; i < firstDay; i++) html += `<div></div>`;\n    for (let d = 1; d <= daysInMonth; d++) {\n      const dateStr = `${String(y).substring(2)}${String(m + 1).padStart(2, \'0\')}${String(d).padStart(2, \'0\')}`;\n      const hasReport = availableDates.includes(dateStr);\n      html += `<div class="aspect-square flex items-center justify-center rounded-full text-[12px] transition-all ${hasReport ? "bg-blue-600 text-white font-black cursor-pointer shadow-lg" : "text-gray-700"}" ${hasReport ? `onclick="updateReports(\'${dateStr}\')"` : \'\'}>${d}</div>`;\n    }\n    calendarEl.innerHTML = html + `</div>`;\n  }\n  renderCalendar(currentY, currentM);\n})();</script> '], ["", " <script>(function(){", '\n  let currentY = 2026;\n  let currentM = 0; \n\n  if (availableDates.length > 0) {\n    const latest = availableDates[0];\n    currentY = 2000 + parseInt(latest.substring(0,2));\n    currentM = parseInt(latest.substring(2,4)) - 1;\n  }\n\n  window.updateReports = function(dateId) {\n    const sliderEl = document.getElementById(\'report-slider\');\n    const dateTitleEl = document.getElementById(\'display-date\');\n    const labelEl = document.getElementById(\'display-label\');\n    const countEl = document.getElementById(\'display-count\');\n    const data = allData.find(g => g.id === dateId);\n    \n    if (!data || !sliderEl) return;\n\n    dateTitleEl.innerText = data.date;\n    countEl.innerText = data.reports.length;\n\n    const isLatest = (allData.length > 0 && dateId === availableDates[0]);\n    labelEl.innerText = isLatest ? "Latest Update" : "Archive Data";\n    labelEl.className = \\`text-[10px] font-black uppercase tracking-[0.3em] \\${isLatest ? \'text-blue-500\' : \'text-gray-500\'}\\`;\n\n    sliderEl.innerHTML = data.reports.map(report => \\`\n      <div class="flex-none w-[85vw] max-w-[400px] snap-center">\n        <div class="rounded-2xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl">\n          <img src="\\${report.path}" class="w-full h-auto block" />\n        </div>\n        <div class="mt-6 text-center">\n          <a href="\\${report.link}" class="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/40 border-2 border-transparent bg-clip-padding relative active:scale-95 transition-all group overflow-hidden">\n            <div class="absolute inset-0 p-[2px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 -z-10"></div>\n            <span class="text-[14px] font-black tracking-[0.2em] uppercase text-white">\n              \\${report.away} <span class="text-[10px] font-medium lowercase tracking-normal mx-1 text-white/50 italic px-1">vs</span> \\${report.home}\n            </span>\n          </a>\n        </div>\n      </div>\n    \\`).join(\'\');\n    sliderEl.scrollTo({ left: 0, behavior: \'smooth\' });\n  };\n\n  window.changeMonth = function(delta) {\n    currentM += delta;\n    if (currentM < 0) { currentM = 11; currentY--; }\n    else if (currentM > 11) { currentM = 0; currentY++; }\n    renderCalendar(currentY, currentM);\n  };\n\n  function renderCalendar(y, m) {\n    const calendarEl = document.getElementById(\'calendar\');\n    if (!calendarEl) return;\n    const firstDay = new Date(y, m, 1).getDay();\n    const daysInMonth = new Date(y, m + 1, 0).getDate();\n    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];\n    \n    let html = \\`<div class="flex justify-between items-center mb-6 px-2 text-white"><button onclick="changeMonth(-1)">←</button><div class="font-black text-sm tracking-widest">\\${monthNames[m]} \\${y}</div><button onclick="changeMonth(1)">→</button></div><div class="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-gray-600 mb-4 uppercase"><div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div></div><div class="grid grid-cols-7 gap-y-3">\\`;\n    for (let i = 0; i < firstDay; i++) html += \\`<div></div>\\`;\n    for (let d = 1; d <= daysInMonth; d++) {\n      const dateStr = \\`\\${String(y).substring(2)}\\${String(m + 1).padStart(2, \'0\')}\\${String(d).padStart(2, \'0\')}\\`;\n      const hasReport = availableDates.includes(dateStr);\n      html += \\`<div class="aspect-square flex items-center justify-center rounded-full text-[12px] transition-all \\${hasReport ? "bg-blue-600 text-white font-black cursor-pointer shadow-lg" : "text-gray-700"}" \\${hasReport ? \\`onclick="updateReports(\'\\${dateStr}\')"\\` : \'\'}>\\${d}</div>\\`;\n    }\n    calendarEl.innerHTML = html + \\`</div>\\`;\n  }\n  renderCalendar(currentY, currentM);\n})();</script> '])), renderComponent($$result, "Layout", $$Layout, { "title": "GAME REPORT" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-[#373A36] min-h-screen text-white font-avenir overflow-x-hidden"> <header class="pt-12 pb-6 px-8 text-center border-b border-white/5"> <a href="/nba-home" class="hover:opacity-70 transition-opacity"> <h1 class="text-2xl font-black uppercase leading-none tracking-[0.25em]">GAME REPORT</h1> </a> </header> <section class="py-10"> <div class="px-8 mb-4 min-h-[80px] flex justify-between items-end"> <div class="flex flex-col gap-1"> <span id="display-label" class="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">Latest Update</span> <span id="display-date" class="text-white text-[32px] font-bold uppercase leading-none tracking-[0.05em] text-shadow-xl"> ${reportGroups.length > 0 ? reportGroups[0].date : "NO DATA"} </span> </div> <div class="flex flex-col items-end leading-none"> <span id="display-count" class="text-7xl font-black italic opacity-20 block tracking-[-0.1em]"> ${reportGroups.length > 0 ? reportGroups[0].reports.length : 0} </span> <span class="text-[12px] font-bold opacity-40 uppercase tracking-[0.3em]">Games</span> </div> </div> <div id="report-slider" class="flex overflow-x-auto snap-x snap-mandatory gap-4 px-8 no-scrollbar min-h-[300px]"> ${reportGroups.length > 0 ? reportGroups[0].reports.map((report) => renderTemplate`<div class="flex-none w-[85vw] max-w-[400px] snap-center"> <div class="rounded-2xl overflow-hidden border border-white/10 bg-gray-900 shadow-2xl"> <img${addAttribute(report.path, "src")} alt="Report" class="w-full h-auto block" loading="lazy"> </div> <div class="mt-6 text-center"> <a${addAttribute(report.link, "href")} class="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/40 border-2 border-transparent bg-clip-padding relative active:scale-95 transition-all group overflow-hidden"> <div class="absolute inset-0 p-[2px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 -z-10"></div> <span class="text-[14px] font-black tracking-[0.2em] uppercase text-white"> ${report.away} <span class="text-[10px] font-medium lowercase tracking-normal mx-1 text-white/50 italic px-1">vs</span> ${report.home} </span> </a> </div> </div>`) : renderTemplate`<div class="w-full flex items-center justify-center py-20 text-gray-500 font-black text-[10px] tracking-[0.3em]">
NO DATA FOUND AT /output/reports/NBA
</div>`} </div> </section> <section class="px-8 pb-40"> <div class="max-w-md mx-auto"> <div id="calendar" class="bg-gray-900/40 p-6 rounded-3xl border border-white/5 shadow-inner"></div> </div> </section> <div class="fixed bottom-8 right-8 z-40 pointer-events-none"> <a href="/nba-home" class="pointer-events-auto bg-gray-800 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl active:scale-95 transition-transform border border-white/10">
Back to NBA Home
</a> </div> </div> ` }), defineScriptVars({ allData, availableDates }));
}, "/Users/masaki/BDATALAB-app/src/pages/nba-reports.astro", void 0);
const $$file = "/Users/masaki/BDATALAB-app/src/pages/nba-reports.astro";
const $$url = "/nba-reports";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$NbaReports,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
