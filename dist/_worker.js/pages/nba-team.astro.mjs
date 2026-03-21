globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, d as defineScriptVars, a as renderComponent, b as createAstro, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_CKE3Pew-.mjs';
import { $ as $$Layout } from '../chunks/Layout_6T3sI24S.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$NbaTeam = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NbaTeam;
  const { searchParams } = Astro2.url;
  const teamId = searchParams.get("team") || "LAL";
  const GITHUB_REPO = "BDATALAB55/BDL-game-player-cards";
  const RECURSIVE_API = `https://api.github.com/repos/${GITHUB_REPO}/git/trees/main?recursive=1&t=${Date.now()}`;
  const IMAGE_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/output/reports/NBA`;
  const token = process.env.GITHUB_TOKEN;
  const teamInfo = {
    ATL: { city: "Atlanta", name: "Hawks", color: "#E03A3E" },
    BOS: { city: "Boston", name: "Celtics", color: "#007A33" },
    BKN: { city: "Brooklyn", name: "Nets", color: "#000000" },
    CHA: { city: "Charlotte", name: "Hornets", color: "#00788C" },
    CHI: { city: "Chicago", name: "Bulls", color: "#CE1141" },
    CLE: { city: "Cleveland", name: "Cavaliers", color: "#6F263D" },
    DAL: { city: "Dallas", name: "Mavericks", color: "#0053BC" },
    DEN: { city: "Denver", name: "Nuggets", color: "#0E2240" },
    DET: { city: "Detroit", name: "Pistons", color: "#1D428A" },
    GSW: { city: "Golden State", name: "Warriors", color: "#006BB6" },
    HOU: { city: "Houston", name: "Rockets", color: "#CE1141" },
    IND: { city: "Indiana", name: "Pacers", color: "#002D62" },
    LAC: { city: "LA", name: "Clippers", color: "#12173F" },
    LAL: { city: "Los Angeles", name: "Lakers", color: "#552583" },
    MEM: { city: "Memphis", name: "Grizzlies", color: "#5D76A9" },
    MIA: { city: "Miami", name: "Heat", color: "#98002E" },
    MIL: { city: "Milwaukee", name: "Bucks", color: "#00471B" },
    MIN: { city: "Minnesota", name: "Timberwolves", color: "#0C2340" },
    NOP: { city: "New Orleans", name: "Pelicans", color: "#0C2340" },
    NYK: { city: "New York", name: "Knicks", color: "#F58426" },
    OKC: { city: "Oklahoma City", name: "Thunder", color: "#007AC1" },
    ORL: { city: "Orlando", name: "Magic", color: "#0077C0" },
    PHI: { city: "Philadelphia", name: "76ers", color: "#006BB6" },
    PHX: { city: "Phoenix", name: "Suns", color: "#1D1160" },
    POR: { city: "Portland", name: "Trail Blazers", color: "#E03A3E" },
    SAC: { city: "Sacramento", name: "Kings", color: "#5A2D81" },
    SAS: { city: "San Antonio", name: "Spurs", color: "#000000" },
    TOR: { city: "Toronto", name: "Raptors", color: "#CE1141" },
    UTA: { city: "Utah", name: "Jazz", color: "#002B5C" },
    WAS: { city: "Washington", name: "Wizards", color: "#002B5C" }
  };
  const currentTeam = teamInfo[teamId] || { city: "NBA", name: "TEAM", color: "#FFFFFF" };
  let allTeamReports = [];
  let availableDatesMap = {};
  try {
    const res = await fetch(RECURSIVE_API, {
      headers: {
        ...token ? { "Authorization": `token ${token}` } : {},
        "Accept": "application/vnd.github.v3+json",
        "Cache-Control": "no-cache"
      }
    });
    const data = await res.json();
    if (data.tree) {
      const reportFiles = data.tree.filter(
        (item) => item.path.startsWith("output/reports/NBA/") && item.path.endsWith(".png")
      );
      reportFiles.forEach((file) => {
        const parts = file.path.split("/");
        const fileName = parts[parts.length - 1];
        const folderName = parts[parts.length - 2];
        const nameParts = fileName.replace(".png", "").split("_");
        const fullDate = nameParts[2];
        const gameId = nameParts[3];
        const teamA = nameParts[nameParts.length - 2];
        const teamB = nameParts[nameParts.length - 1];
        if (teamA === teamId || teamB === teamId) {
          const targetCardFolder = `NBA_Cards_${gameId}_${fullDate}`;
          const reportObj = {
            id: folderName,
            date: `20${folderName.substring(0, 2)}.${folderName.substring(2, 4)}.${folderName.substring(4, 6)}`,
            path: `${IMAGE_BASE_URL}/${folderName}/${fileName}?t=${Date.now()}`,
            fileName,
            away: teamA,
            home: teamB,
            link: `/nba-cards?folder=${folderName}/${targetCardFolder}`
          };
          allTeamReports.push(reportObj);
          if (!availableDatesMap[folderName]) availableDatesMap[folderName] = reportObj.link;
        }
      });
      allTeamReports.sort((a, b) => b.id.localeCompare(a.id));
    }
  } catch (e) {
    console.error("Fetch failed:", e);
  }
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", '\n  let currentY = 2026;\n  let currentM = 0;\n  const dates = Object.keys(availableDatesMap).sort((a,b) => b.localeCompare(a));\n  if (dates.length > 0) {\n    currentY = 2000 + parseInt(dates[0].substring(0,2));\n    currentM = parseInt(dates[0].substring(2,4)) - 1;\n  }\n  window.changeMonth = function(delta) {\n    currentM += delta;\n    if (currentM < 0) { currentM = 11; currentY--; }\n    else if (currentM > 11) { currentM = 0; currentY++; }\n    renderCalendar(currentY, currentM);\n  };\n  function renderCalendar(y, m) {\n    const calendarEl = document.getElementById(\'calendar\');\n    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];\n    const firstDay = new Date(y, m, 1).getDay();\n    const daysInMonth = new Date(y, m + 1, 0).getDate();\n    let html = `\n      <div class="flex justify-between items-center mb-10 px-2">\n        <button onclick="changeMonth(-1)" class="text-white/30 hover:text-white transition-colors text-lg">←</button>\n        <div class="font-black text-[13px] tracking-[0.3em] uppercase">${monthNames[m]} ${y}</div>\n        <button onclick="changeMonth(1)" class="text-white/30 hover:text-white transition-colors text-lg">→</button>\n      </div>\n      <div class="grid grid-cols-7 gap-1 text-center text-[9px] font-black text-white/10 mb-6 tracking-widest">\n        <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>\n      </div>\n      <div class="grid grid-cols-7 gap-y-4 gap-x-2">`;\n    for (let i = 0; i < firstDay; i++) html += `<div></div>`;\n    for (let d = 1; d <= daysInMonth; d++) {\n      const dateStr = `${String(y).substring(2)}${String(m + 1).padStart(2, \'0\')}${String(d).padStart(2, \'0\')}`;\n      const link = availableDatesMap[dateStr];\n      html += `\n        <div class="flex items-center justify-center">\n          ${link ? \n            `<a href="${link}" class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white text-[12px] font-black shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all border border-white/20">${d}</a>` : \n            `<span class="text-white/10 text-[12px] font-bold">${d}</span>`\n          }\n        </div>`;\n    }\n    calendarEl.innerHTML = html + `</div>`;\n  }\n  renderCalendar(currentY, currentM);\n})();</script> '], ["", " <script>(function(){", '\n  let currentY = 2026;\n  let currentM = 0;\n  const dates = Object.keys(availableDatesMap).sort((a,b) => b.localeCompare(a));\n  if (dates.length > 0) {\n    currentY = 2000 + parseInt(dates[0].substring(0,2));\n    currentM = parseInt(dates[0].substring(2,4)) - 1;\n  }\n  window.changeMonth = function(delta) {\n    currentM += delta;\n    if (currentM < 0) { currentM = 11; currentY--; }\n    else if (currentM > 11) { currentM = 0; currentY++; }\n    renderCalendar(currentY, currentM);\n  };\n  function renderCalendar(y, m) {\n    const calendarEl = document.getElementById(\'calendar\');\n    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];\n    const firstDay = new Date(y, m, 1).getDay();\n    const daysInMonth = new Date(y, m + 1, 0).getDate();\n    let html = \\`\n      <div class="flex justify-between items-center mb-10 px-2">\n        <button onclick="changeMonth(-1)" class="text-white/30 hover:text-white transition-colors text-lg">←</button>\n        <div class="font-black text-[13px] tracking-[0.3em] uppercase">\\${monthNames[m]} \\${y}</div>\n        <button onclick="changeMonth(1)" class="text-white/30 hover:text-white transition-colors text-lg">→</button>\n      </div>\n      <div class="grid grid-cols-7 gap-1 text-center text-[9px] font-black text-white/10 mb-6 tracking-widest">\n        <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>\n      </div>\n      <div class="grid grid-cols-7 gap-y-4 gap-x-2">\\`;\n    for (let i = 0; i < firstDay; i++) html += \\`<div></div>\\`;\n    for (let d = 1; d <= daysInMonth; d++) {\n      const dateStr = \\`\\${String(y).substring(2)}\\${String(m + 1).padStart(2, \'0\')}\\${String(d).padStart(2, \'0\')}\\`;\n      const link = availableDatesMap[dateStr];\n      html += \\`\n        <div class="flex items-center justify-center">\n          \\${link ? \n            \\`<a href="\\${link}" class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white text-[12px] font-black shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all border border-white/20">\\${d}</a>\\` : \n            \\`<span class="text-white/10 text-[12px] font-bold">\\${d}</span>\\`\n          }\n        </div>\\`;\n    }\n    calendarEl.innerHTML = html + \\`</div>\\`;\n  }\n  renderCalendar(currentY, currentM);\n})();</script> '])), renderComponent($$result, "Layout", $$Layout, { "title": `${teamId} | B-Data Lab`, "data-astro-cid-s5d57qem": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-[#373A36] min-h-screen text-white font-avenir pb-80 overflow-x-hidden relative" data-astro-cid-s5d57qem> <header class="pt-12 pb-6 px-6 max-w-6xl mx-auto w-full relative" data-astro-cid-s5d57qem> <div class="flex items-end justify-between w-full relative mb-1" data-astro-cid-s5d57qem> <div class="flex-shrink-0" data-astro-cid-s5d57qem> <div class="flex flex-col md:flex-row md:items-end md:gap-4 leading-none md:leading-[0.8] font-black uppercase" data-astro-cid-s5d57qem> <span class="text-2xl tracking-tight md:text-3xl md:font-bold md:opacity-60 md:tracking-[0.2em]" data-astro-cid-s5d57qem> ${currentTeam.city} </span> <span class="text-5xl tracking-tight md:text-7xl md:tracking-[0.1em]" data-astro-cid-s5d57qem> ${currentTeam.name} </span> </div> </div> <div class="hidden md:flex flex-col items-end text-right space-y-3 mb-1" data-astro-cid-s5d57qem> <h2 class="text-3xl font-black tracking-widest uppercase leading-none" data-astro-cid-s5d57qem>BDATALAB</h2> <div class="flex items-center gap-5" data-astro-cid-s5d57qem> <a href="https://x.com/BDataLab5x5" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-1.5" data-astro-cid-s5d57qem> <div class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors" data-astro-cid-s5d57qem> <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24" data-astro-cid-s5d57qem><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-astro-cid-s5d57qem></path></svg> </div> <span class="text-[10px] font-black tracking-widest uppercase text-white/40 group-hover:text-white transition-colors" data-astro-cid-s5d57qem>X</span> </a> <div class="h-3 w-[1px] bg-white/20" data-astro-cid-s5d57qem></div> <a href="https://note.com/bdatalab5x5" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-1.5" data-astro-cid-s5d57qem> <div class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#23bb9d] transition-colors" data-astro-cid-s5d57qem> <span class="text-[12px] font-black text-white" data-astro-cid-s5d57qem>n</span> </div> <span class="text-[10px] font-black tracking-widest lowercase text-white/40 group-hover:text-white transition-colors" data-astro-cid-s5d57qem>note</span> </a> </div> </div> </div> <div class="absolute bottom-1 left-6 right-6 h-[3px] md:h-[5px]"${addAttribute(`background-color: ${currentTeam.color}; box-shadow: 0 4px 15px ${currentTeam.color}66;`, "style")} data-astro-cid-s5d57qem></div> </header> <div class="max-w-6xl mx-auto px-6" data-astro-cid-s5d57qem> <section class="mt-16" data-astro-cid-s5d57qem> <div class="flex justify-between items-end mb-10" data-astro-cid-s5d57qem> <div data-astro-cid-s5d57qem> <h2 class="text-3xl font-black uppercase tracking-tight italic" data-astro-cid-s5d57qem>Game Reports</h2> <p class="text-white/40 text-[10px] font-bold tracking-widest uppercase mt-1" data-astro-cid-s5d57qem>Click card to download</p> </div> <div class="text-right leading-none" data-astro-cid-s5d57qem> <span class="text-7xl font-black italic opacity-20 block tracking-[-0.1em]" data-astro-cid-s5d57qem>${allTeamReports.length}</span> <span class="text-[12px] font-bold opacity-40 uppercase tracking-[0.3em]" data-astro-cid-s5d57qem>Games</span> </div> </div> ${allTeamReports.length > 0 ? renderTemplate`<div class="flex overflow-x-auto gap-8 no-scrollbar snap-x pb-12" data-astro-cid-s5d57qem> ${allTeamReports.map((r) => renderTemplate`<div class="flex-none w-[320px] snap-center" data-astro-cid-s5d57qem> <div class="mb-4 flex items-center gap-2 px-2" data-astro-cid-s5d57qem> <div class="w-2 h-2 rounded-full bg-blue-500" data-astro-cid-s5d57qem></div> <span class="text-[14px] font-black tracking-wider text-white/80" data-astro-cid-s5d57qem>${r.date}</span> </div> <a${addAttribute(r.path, "href")}${addAttribute(r.fileName, "download")} class="block cursor-pointer active:scale-95 transition-transform" data-astro-cid-s5d57qem> <div class="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 aspect-[3/4.2] relative group" data-astro-cid-s5d57qem> <img${addAttribute(r.path, "src")} alt="Report" class="w-full h-full object-cover" data-astro-cid-s5d57qem> <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" data-astro-cid-s5d57qem> <span class="bg-black/60 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20" data-astro-cid-s5d57qem>Download PNG</span> </div> </div> </a> <div class="mt-6 flex justify-center" data-astro-cid-s5d57qem> <a${addAttribute(r.link, "href")} class="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/40 border-2 border-transparent bg-clip-padding relative hover:scale-110 transition-transform group" data-astro-cid-s5d57qem> <div class="absolute inset-0 p-[2px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 -z-10" data-astro-cid-s5d57qem></div> <span class="text-[12px] font-black tracking-[0.2em] uppercase text-white" data-astro-cid-s5d57qem> ${r.away} <span class="text-[9px] font-medium lowercase mx-1 text-white/50 italic px-1" data-astro-cid-s5d57qem>vs</span> ${r.home} </span> </a> </div> </div>`)} </div>` : renderTemplate`<div class="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl" data-astro-cid-s5d57qem> <p class="text-white/20 font-black uppercase tracking-widest italic" data-astro-cid-s5d57qem>No game reports found</p> </div>`} </section> <section class="mt-24" data-astro-cid-s5d57qem> <div class="max-w-md mx-auto" data-astro-cid-s5d57qem> <h3 class="text-center text-[10px] font-black tracking-[0.4em] uppercase mb-8 text-white/30 italic" data-astro-cid-s5d57qem>Game Calendar</h3> <div id="calendar" class="bg-black/30 p-8 rounded-[40px] border border-white/5 shadow-inner" data-astro-cid-s5d57qem></div> </div> </section> </div> <div class="md:hidden flex flex-col items-center justify-center w-full py-20 gap-4" data-astro-cid-s5d57qem> <h2 class="text-4xl font-black tracking-[0.2em] uppercase leading-none opacity-80" data-astro-cid-s5d57qem>BDATALAB</h2> <div class="flex items-center gap-8" data-astro-cid-s5d57qem> <a href="https://x.com/BDataLab5x5" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center gap-2" data-astro-cid-s5d57qem> <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20 transition-colors border border-white/5" data-astro-cid-s5d57qem> <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24" data-astro-cid-s5d57qem><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-astro-cid-s5d57qem></path></svg> </div> <span class="text-[11px] font-black tracking-widest uppercase text-white/40" data-astro-cid-s5d57qem>X</span> </a> <div class="h-6 w-[1px] bg-white/10" data-astro-cid-s5d57qem></div> <a href="https://note.com/bdatalab5x5" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center gap-2" data-astro-cid-s5d57qem> <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-[#23bb9d] transition-colors border border-white/5" data-astro-cid-s5d57qem> <span class="text-[16px] font-black text-white" data-astro-cid-s5d57qem>n</span> </div> <span class="text-[11px] font-black tracking-widest uppercase text-white/40" data-astro-cid-s5d57qem>note</span> </a> </div> </div> <div class="fixed bottom-8 left-8 z-40" data-astro-cid-s5d57qem> <button onclick="history.back()" class="bg-white/10 backdrop-blur-md text-white px-6 py-4 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl active:scale-95 border border-white/10" data-astro-cid-s5d57qem>← Back</button> </div> <div class="fixed bottom-8 right-8 z-40" data-astro-cid-s5d57qem> <a href="/nba-home" class="bg-gray-800 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl active:scale-95 border border-white/10" data-astro-cid-s5d57qem>NBA Home</a> </div> </main> ` }), defineScriptVars({ availableDatesMap }));
}, "/Users/masaki/BDATALAB-app/src/pages/nba-team.astro", void 0);
const $$file = "/Users/masaki/BDATALAB-app/src/pages/nba-team.astro";
const $$url = "/nba-team";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$NbaTeam,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
