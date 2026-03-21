globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, a as renderComponent, f as renderScript, r as renderTemplate, m as maybeRenderHead, e as addAttribute, F as Fragment } from '../chunks/astro/server_CKE3Pew-.mjs';
import { $ as $$Layout } from '../chunks/Layout_6T3sI24S.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$B2Home = createComponent(async ($$result, $$props, $$slots) => {
  const GITHUB_REPO = "BDATALAB55/BDL-game-player-cards";
  const RECURSIVE_API = `https://api.github.com/repos/${GITHUB_REPO}/git/trees/main?recursive=1&t=${Date.now()}`;
  const IMAGE_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/output/reports/B2`;
  const cityNameMap = {
    "AOMORI": "AOMORI",
    "WAT'S": "AOMORI",
    "IWATE": "IWATE",
    "BIGBULLS": "IWATE",
    "YAMAGATA": "YAMAGATA",
    "WYVERNS": "YAMAGATA",
    "FUKUSHIMA": "FUKUSHIMA",
    "FIREBONDS": "FUKUSHIMA",
    "YOKOHAMAEX": "YOKOHAMA EX",
    "EXCELLENCE": "YOKOHAMA EX",
    "FUKUI": "FUKUI",
    "BLOWWINDS": "FUKUI",
    "SHINSHU": "SHINSHU",
    "BRAVEWARRIORS": "SHINSHU",
    "SHIZUOKA": "SHIZUOKA",
    "VELTEX": "SHIZUOKA",
    "KOBE": "KOBE",
    "STORKZ": "KOBE",
    "NARA": "NARA",
    "BAMBITIOUS": "NARA",
    "EHIME": "EHIME",
    "ORANGEVIKINGS": "EHIME",
    "FUKUOKA": "FUKUOKA",
    "RIZING": "FUKUOKA",
    "KUMAMOTO": "KUMAMOTO",
    "VOLTERS": "KUMAMOTO",
    "KAGOSHIMA": "KAGOSHIMA",
    "REBNISE": "KAGOSHIMA"
  };
  const token = process.env.GITHUB_TOKEN;
  let reportGroups = [];
  try {
    const res = await fetch(RECURSIVE_API, {
      headers: token ? {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json"
      } : { "Accept": "application/vnd.github.v3+json" }
    });
    const data = await res.json();
    if (data.tree) {
      const allFiles = data.tree.filter(
        (item) => item.path.includes("output/reports/B2/") && item.path.toLowerCase().endsWith(".png")
      );
      const groups = {};
      allFiles.forEach((file) => {
        const pathParts = file.path.split("/");
        const bIndex = pathParts.indexOf("B2");
        if (bIndex === -1 || pathParts.length <= bIndex + 2) return;
        const folderName = pathParts[bIndex + 1];
        const fileName = pathParts[bIndex + 2];
        if (!/^\d+$/.test(folderName)) return;
        const nameParts = fileName.replace(".png", "").split("_");
        const fullDate = nameParts[0] || "";
        const gameId = nameParts[1] || "";
        const rawAway = nameParts[2] || "AWAY";
        const rawHome = nameParts[3] || "HOME";
        const displayAway = cityNameMap[rawAway.toUpperCase().replace(/[\s\-_]/g, "")] || rawAway;
        const displayHome = cityNameMap[rawHome.toUpperCase().replace(/[\s\-_]/g, "")] || rawHome;
        if (!groups[folderName]) {
          groups[folderName] = {
            id: folderName,
            date: `20${folderName.substring(0, 2)}.${folderName.substring(2, 4)}.${folderName.substring(4, 6)}`,
            reports: []
          };
        }
        const cardFolderName = `game_${gameId}_${rawAway}_${rawHome}_${fullDate}`;
        groups[folderName].reports.push({
          path: `${IMAGE_BASE_URL}/${folderName}/${fileName}?t=${Date.now()}`,
          away: displayAway,
          home: displayHome,
          link: `/b2-cards?folder=${folderName}/${cardFolderName}`
        });
      });
      reportGroups = Object.values(groups).sort((a, b) => b.id.localeCompare(a.id));
    }
  } catch (e) {
    console.error("Fetch Error:", e);
  }
  const teams = [
    { id: "AOMORI", color: "bg-[#004194]" },
    { id: "IWATE", color: "bg-[#e22b30]" },
    { id: "YAMAGATA", color: "bg-[#53247a]" },
    { id: "FUKUSHIMA", color: "bg-[#b44da1]" },
    { id: "YOKOHAMA EX", color: "bg-[#2a6c3d]" },
    { id: "FUKUI", color: "bg-[#0d1a39]" },
    { id: "SHINSHU", color: "bg-[#fff001] text-black" },
    { id: "SHIZUOKA", color: "bg-[#21326a]" },
    { id: "KOBE", color: "bg-[#163f2e]" },
    { id: "NARA", color: "bg-[#8c2222]" },
    { id: "EHIME", color: "bg-[#f79422] text-black" },
    { id: "FUKUOKA", color: "bg-[#004098]" },
    { id: "KUMAMOTO", color: "bg-[#e62e2d]" },
    { id: "KAGOSHIMA", color: "bg-black border border-white/20" }
  ];
  const today = reportGroups.length > 0 ? reportGroups[0].date : "2026.01.25";
  const todayGameCount = reportGroups.length > 0 ? reportGroups[0].reports.length : 0;
  const teamChunks = [];
  for (let i = 0; i < teams.length; i += 9) {
    teamChunks.push(teams.slice(i, i + 9));
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "B2 HOME | B-Data Lab", "data-astro-cid-kqbad2j3": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-[#373A36] min-h-screen text-white font-avenir pb-32 overflow-x-hidden relative" data-astro-cid-kqbad2j3> <header class="sticky top-0 z-50 bg-[#373A36]/90 backdrop-blur-md border-b border-white/10" data-astro-cid-kqbad2j3> <div class="pt-12 pb-6 px-6 max-w-6xl mx-auto w-full" data-astro-cid-kqbad2j3> <div class="flex items-end justify-between w-full" data-astro-cid-kqbad2j3> <div class="flex-shrink-0" data-astro-cid-kqbad2j3> <a href="/b2-home" class="hover:opacity-80 transition-opacity" data-astro-cid-kqbad2j3> <h1 class="text-5xl md:text-7xl font-black tracking-normal uppercase leading-none" data-astro-cid-kqbad2j3>B2</h1> </a> </div> <div class="flex flex-col items-end text-right space-y-3" data-astro-cid-kqbad2j3> <h2 class="text-xl md:text-3xl font-black tracking-widest uppercase leading-none" data-astro-cid-kqbad2j3>BDATALAB</h2> <div class="flex items-center gap-3 md:gap-5" data-astro-cid-kqbad2j3> <a href="https://x.com/BDataLab5x5" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-1.5 transition-all" data-astro-cid-kqbad2j3> <div class="w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors" data-astro-cid-kqbad2j3> <svg class="w-3.5 h-3.5 md:w-4 md:h-4 fill-white" viewBox="0 0 24 24" data-astro-cid-kqbad2j3><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-astro-cid-kqbad2j3></path></svg> </div> <span class="hidden sm:inline text-[10px] font-black tracking-widest uppercase text-white/40 group-hover:text-white transition-colors" data-astro-cid-kqbad2j3>X</span> </a> <div class="h-3 w-[1px] bg-white/20" data-astro-cid-kqbad2j3></div> <a href="https://note.com/bdatalab5x5" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-1.5 transition-all" data-astro-cid-kqbad2j3> <div class="w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#23bb9d] transition-colors" data-astro-cid-kqbad2j3> <span class="text-[12px] font-black text-white" data-astro-cid-kqbad2j3>n</span> </div> <span class="text-[10px] font-black tracking-widest lowercase text-white/40 group-hover:text-white transition-colors" data-astro-cid-kqbad2j3>note</span> </a> </div> </div> </div> </div> </header> <div class="max-w-6xl mx-auto px-6" data-astro-cid-kqbad2j3> <section class="mt-12" data-astro-cid-kqbad2j3> <div class="flex justify-between items-end mb-8" data-astro-cid-kqbad2j3> <div data-astro-cid-kqbad2j3> <h2 class="text-4xl font-black uppercase tracking-tighter mb-4" data-astro-cid-kqbad2j3>GAME REPORT</h2> <div class="flex flex-col gap-1" data-astro-cid-kqbad2j3> <span class="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]" data-astro-cid-kqbad2j3>Latest Update</span> <span class="text-white text-[32px] font-bold uppercase leading-none tracking-[0.05em]" data-astro-cid-kqbad2j3>${today}</span> </div> </div> <div class="text-right leading-none" data-astro-cid-kqbad2j3> <span class="text-7xl font-black italic opacity-20 block" data-astro-cid-kqbad2j3>${todayGameCount}</span> <span class="text-[12px] font-bold opacity-40 uppercase tracking-[0.3em]" data-astro-cid-kqbad2j3>Games</span> </div> </div> <div class="flex overflow-x-auto gap-8 no-scrollbar snap-x pb-4" data-astro-cid-kqbad2j3> ${reportGroups.length > 0 ? reportGroups[0].reports.map((r) => renderTemplate`<div class="flex-none w-[300px] snap-center" data-astro-cid-kqbad2j3> <div class="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 aspect-[3/4.2]" data-astro-cid-kqbad2j3> <img${addAttribute(r.path, "src")} alt="Report" class="w-full h-full object-cover" data-astro-cid-kqbad2j3> </div> <div class="mt-6 flex justify-center" data-astro-cid-kqbad2j3> <a${addAttribute(r.link, "href")} class="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/40 border-2 border-transparent bg-clip-padding relative active:scale-95 hover:scale-110 transition-transform group overflow-hidden" data-astro-cid-kqbad2j3> <div class="absolute inset-0 p-[2px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 -z-10" data-astro-cid-kqbad2j3></div> <span class="text-[12px] font-black tracking-[0.2em] uppercase text-white" data-astro-cid-kqbad2j3> ${r.away} <span class="text-[9px] font-medium lowercase tracking-normal mx-1 text-white/50 px-1" data-astro-cid-kqbad2j3>vs</span> ${r.home} </span> </a> </div> </div>`) : renderTemplate`<div class="text-gray-500 px-4" data-astro-cid-kqbad2j3>No reports found.</div>`} </div> <div class="mt-16 flex justify-center" data-astro-cid-kqbad2j3> <a href="/b2-reports" class="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.25em] shadow-2xl transition-all" data-astro-cid-kqbad2j3>
Game Report Archive
</a> </div> </section> <section class="mt-24" data-astro-cid-kqbad2j3> <h2 class="text-4xl font-black uppercase tracking-tighter mb-8" data-astro-cid-kqbad2j3>TEAM</h2> <div class="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-2" data-astro-cid-kqbad2j3> ${teams.map((t) => renderTemplate`<a${addAttribute(`/b2-team?team=${t.id}`, "href")} class="group" data-astro-cid-kqbad2j3> <div${addAttribute(`${t.color} aspect-[2/1] rounded-2xl flex items-center justify-center text-[18px] lg:text-[22px] font-black tracking-tighter transition-all duration-300 group-hover:scale-105 group-hover:brightness-125 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] uppercase px-2 text-center`, "class")} data-astro-cid-kqbad2j3> <span class="group-hover:scale-110 transition-transform leading-tight" data-astro-cid-kqbad2j3>${t.id}</span> </div> </a>`)} </div> <div class="md:hidden -mx-6" data-astro-cid-kqbad2j3> <div id="team-carousel" class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 gap-1.5" data-astro-cid-kqbad2j3> ${teamChunks.map((chunk) => renderTemplate`<div class="min-w-full snap-center grid grid-cols-3 gap-1.5" data-astro-cid-kqbad2j3> ${chunk.map((t) => renderTemplate`<a${addAttribute(`/b2-team?team=${t.id}`, "href")} data-astro-cid-kqbad2j3> <div${addAttribute(`${t.color} aspect-square rounded-lg flex items-center justify-center font-black tracking-tighter transition-all active:scale-95 uppercase px-1 text-center leading-[0.85]`, "class")} data-astro-cid-kqbad2j3> <span${addAttribute(t.id.length > 10 ? "text-[12px]" : "text-[15px]", "class")} data-astro-cid-kqbad2j3> ${t.id === "YOKOHAMA EX" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-kqbad2j3": true }, { "default": async ($$result3) => renderTemplate`YOKOHAMA<br data-astro-cid-kqbad2j3>EX` })}` : t.id} </span> </div> </a>`)} </div>`)} </div> <div class="flex justify-center gap-1.5 mt-6" data-astro-cid-kqbad2j3> ${teamChunks.map((_, i) => renderTemplate`<div${addAttribute(`h-[2px] rounded-full transition-all duration-300 ${i === 0 ? "w-6 bg-white" : "w-2 bg-white/10"}`, "class")}${addAttribute(i, "data-dot")} data-astro-cid-kqbad2j3></div>`)} </div> </div> </section> <section class="mt-32" data-astro-cid-kqbad2j3> <div class="flex items-baseline gap-4 mb-8" data-astro-cid-kqbad2j3> <h2 class="text-4xl font-black uppercase tracking-tighter" data-astro-cid-kqbad2j3>STANDING</h2> <span class="text-[10px] font-bold text-white/40 tracking-widest uppercase" data-astro-cid-kqbad2j3>Updated: ${today}</span> </div> <div class="grid grid-cols-2 gap-4 max-w-sm mb-10" data-astro-cid-kqbad2j3> <button data-tab="standing" data-target="east" class="tab-btn bg-white text-black py-4 rounded-xl text-[12px] font-black uppercase tracking-widest text-center hover:scale-105 transition-all" data-astro-cid-kqbad2j3>East</button> <button data-tab="standing" data-target="west" class="tab-btn bg-black/20 text-white/80 py-4 rounded-xl text-[12px] font-black uppercase tracking-widest text-center hover:bg-white/10 hover:scale-105 transition-all border border-white/5" data-astro-cid-kqbad2j3>West</button> </div> <div id="standing-container" class="flex overflow-x-auto gap-6 no-scrollbar snap-x pb-4 min-h-[300px]" data-astro-cid-kqbad2j3> ${Array.from({ length: 7 }).map((_, i) => renderTemplate`<div class="flex-none w-[220px] snap-center aspect-[3/4] bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 group transition-all hover:bg-black/60" data-astro-cid-kqbad2j3> <div class="text-[40px] font-black text-white/10 group-hover:text-white/20 transition-colors" data-astro-cid-kqbad2j3>${i + 1}</div> <span class="text-[10px] font-black tracking-[0.3em] uppercase text-white/30" data-astro-cid-kqbad2j3>Coming Soon</span> </div>`)} </div> </section> <section class="mt-32" data-astro-cid-kqbad2j3> <h2 class="text-4xl font-black uppercase tracking-tighter mb-8" data-astro-cid-kqbad2j3>Today's RANK 10</h2> <div class="flex flex-nowrap gap-2 mb-10 max-w-sm" data-astro-cid-kqbad2j3> ${["PTS", "REB", "AST"].map((stat, i) => renderTemplate`<button data-tab="rank"${addAttribute(`rank-btn flex-1 py-4 rounded-xl text-[12px] font-black tracking-widest uppercase transition-all border border-white/5 
                ${i === 0 ? "bg-white text-black" : "bg-black/20 text-white/80 hover:bg-white/10"}`, "class")} data-astro-cid-kqbad2j3> ${stat} </button>`)} </div> <div id="rank-container" class="flex overflow-x-auto gap-6 no-scrollbar snap-x pb-4" data-astro-cid-kqbad2j3> ${Array.from({ length: 10 }).map((_, i) => renderTemplate`<a href="/b-players" class="flex-none w-[260px] snap-center aspect-[3/4.2] bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden group" data-astro-cid-kqbad2j3> <div class="absolute top-4 left-6 text-[32px] font-black text-white/10" data-astro-cid-kqbad2j3>#${i + 1}</div> <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center" data-astro-cid-kqbad2j3> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-white/10" viewBox="0 0 16 16" data-astro-cid-kqbad2j3><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" data-astro-cid-kqbad2j3></path></svg> </div> <span class="text-[10px] font-black tracking-[0.3em] uppercase text-white/30" data-astro-cid-kqbad2j3>Coming Soon</span> </a>`)} </div> </section> </div> <div class="fixed bottom-8 right-8 z-40" data-astro-cid-kqbad2j3> <a href="/" class="bg-gray-800 text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl active:scale-95 hover:scale-105 transition-all border border-white/10" data-astro-cid-kqbad2j3>Back to Home</a> </div> </main> ` })} ${renderScript($$result, "/Users/masaki/BDATALAB-app/src/pages/b2-home.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/masaki/BDATALAB-app/src/pages/b2-home.astro", void 0);
const $$file = "/Users/masaki/BDATALAB-app/src/pages/b2-home.astro";
const $$url = "/b2-home";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$B2Home,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
