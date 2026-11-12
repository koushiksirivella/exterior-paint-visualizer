/**
 * Photorealistic Architectural Paint Visualizer & All-Combinations Studio
 * Powered by Pixel-Accurate 3D Shading Maps (base_neutral.png + zone_map.png)
 */

// 1. EXTRACTED ASIAN PAINTS NUMBERED PALETTE (1 to 5 + Natural Teak + Custom)
let COLOR_MAP = {
  1: { id: 1, name: "Victorian Gold", code: "X103", hex: "#EEB81B", rgb: [238, 184, 27], category: "Yellow Accent", desc: "rich golden mustard yellow" },
  2: { id: 2, name: "Ice Age",        code: "8299", hex: "#D7D4CD", rgb: [215, 212, 205], category: "Warm Off-White", desc: "soft warm greige off-white" },
  3: { id: 3, name: "Bentonite",      code: "8230", hex: "#615F62", rgb: [97, 95, 98],    category: "Slate Charcoal", desc: "deep architectural slate charcoal" },
  4: { id: 4, name: "Stone Path",     code: "8255", hex: "#6F767D", rgb: [111, 118, 125], category: "Mid Slate Grey", desc: "modern mid-tone cool slate grey" },
  5: { id: 5, name: "Brown Paper",    code: "8577", hex: "#CBAC97", rgb: [203, 172, 151], category: "Earthy Sand Tan", desc: "warm sandy clay latte tan" },
  6: { id: 6, name: "Natural Teak",   code: "0425", hex: "#A56932", rgb: [165, 105, 50],  category: "Wood Finish", desc: "natural warm teak wood grain" }
};

let nextColorId = 7;

// 2. EXTRACTED BUILDING ZONES (MATCHING ZONE_MAP.PNG IDs 1..6)
const ZONES = {
  1: {
    id: 1,
    key: "wall",
    name: "Main Facade Wall & Left Tower",
    shortName: "Main Wall",
    aliases: ["wall", "main wall", "facade", "tower", "walls"],
    pinColor: "#ef4444",
    pinCoords: { x: "14%", y: "44%" },
    surfaceType: "Exterior Cement Plaster / Shear Wall",
    recommendedProduct: "Apex Ultima Protek Duralife",
    defaultColorId: 2
  },
  2: {
    id: 2,
    key: "frame",
    name: "Accent Border Frame & Groove Trim",
    shortName: "Border Frame",
    aliases: ["frame", "middle", "border", "trim", "groove"],
    pinColor: "#3b82f6",
    pinCoords: { x: "34%", y: "14%" },
    surfaceType: "Architectural POP Groove & Border Band",
    recommendedProduct: "Apex Ultima Protek (Matt)",
    defaultColorId: 3
  },
  3: {
    id: 3,
    key: "louvers",
    name: "Center Louver / Slat Feature Panel",
    shortName: "Louvers",
    aliases: ["louvers", "louver", "slats", "slat", "yellow", "center"],
    pinColor: "#f59e0b",
    pinCoords: { x: "46%", y: "43%" },
    surfaceType: "Horizontal Ventilation Slats / Feature Shaft",
    recommendedProduct: "Apex Ultima Stretch / PU Satin",
    defaultColorId: 1
  },
  4: {
    id: 4,
    key: "balcony",
    name: "Balcony Structure, Parapets & Headers",
    shortName: "Balconies",
    aliases: ["balcony", "balconies", "parapet", "parapets", "headers", "header", "ledge"],
    pinColor: "#10b981",
    pinCoords: { x: "78%", y: "55%" },
    surfaceType: "Cantilever Balcony Slabs, Parapets & Lintels",
    recommendedProduct: "Apex Ultima Protek Duralife",
    defaultColorId: 2
  },
  5: {
    id: 5,
    key: "ceiling",
    name: "Balcony Ceilings & Underside Soffits",
    shortName: "Ceilings",
    aliases: ["ceiling", "ceilings", "soffit", "soffits", "underside"],
    pinColor: "#a855f7",
    pinCoords: { x: "74%", y: "30%" },
    surfaceType: "Exposed Concrete / Balcony Soffit Plaster",
    recommendedProduct: "Apex Weatherproof Exterior Emulsion",
    defaultColorId: 3
  },
  6: {
    id: 6,
    key: "windows",
    name: "Window Frames & Casings",
    shortName: "Windows",
    aliases: ["window", "windows", "wood", "casing"],
    pinColor: "#d97706",
    pinCoords: { x: "88%", y: "71%" },
    surfaceType: "Hardwood / UPVC Window Frame Casing",
    recommendedProduct: "Asian Paints WoodTech Aquadur PU",
    defaultColorId: 6
  }
};

// 3. PRE-GENERATED 20 ALL-COMBINATION VARIATIONS
const COMBINATIONS_GALLERY = [
  { id: 1,  title: "Signature Gold & Charcoal",              file: "images/combinations/combo_2_3_1_2_3.jpg", z: {1:2, 2:3, 3:1, 4:2, 5:3, 6:6}, tag: "louvers-1" },
  { id: 2,  title: "Brown Paper Louvers & Charcoal Trim",    file: "images/combinations/combo_2_3_5_2_3.jpg", z: {1:2, 2:3, 3:5, 4:2, 5:3, 6:6}, tag: "louvers-5" },
  { id: 3,  title: "Stone Path Louvers & Charcoal Trim",     file: "images/combinations/combo_2_3_4_2_3.jpg", z: {1:2, 2:3, 3:4, 4:2, 5:3, 6:6}, tag: "louvers-4" },
  { id: 4,  title: "Ice Age Louvers & Charcoal Frame",       file: "images/combinations/combo_2_3_2_2_3.jpg", z: {1:2, 2:3, 3:2, 4:2, 5:3, 6:6}, tag: "louvers-2" },
  { id: 5,  title: "Monolith Charcoal Louvers & Trim",       file: "images/combinations/combo_2_3_3_2_3.jpg", z: {1:2, 2:3, 3:3, 4:2, 5:3, 6:6}, tag: "louvers-3" },
  { id: 6,  title: "Slate Facade & Gold Louvers",            file: "images/combinations/combo_4_2_1_4_3.jpg", z: {1:4, 2:2, 3:1, 4:4, 5:3, 6:6}, tag: "louvers-1" },
  { id: 7,  title: "Slate Facade & Brown Paper Louvers",     file: "images/combinations/combo_4_2_5_4_3.jpg", z: {1:4, 2:2, 3:5, 4:4, 5:3, 6:6}, tag: "louvers-5" },
  { id: 8,  title: "Slate Facade & Charcoal Louvers",        file: "images/combinations/combo_4_2_3_4_3.jpg", z: {1:4, 2:2, 3:3, 4:4, 5:3, 6:6}, tag: "louvers-3" },
  { id: 9,  title: "Slate Facade & Ice Age Louvers",         file: "images/combinations/combo_4_2_2_4_3.jpg", z: {1:4, 2:2, 3:2, 4:4, 5:3, 6:6}, tag: "louvers-2" },
  { id: 10, title: "Dual-Tone Slate Tower & Ice Balconies",  file: "images/combinations/combo_4_3_1_2_3.jpg", z: {1:4, 2:3, 3:1, 4:2, 5:3, 6:6}, tag: "louvers-1" },
  { id: 11, title: "Warm Earth Frame & Gold Louvers",        file: "images/combinations/combo_2_5_1_2_5.jpg", z: {1:2, 2:5, 3:1, 4:2, 5:5, 6:6}, tag: "louvers-1" },
  { id: 12, title: "Brown Paper Frame & Charcoal Louvers",   file: "images/combinations/combo_2_5_3_2_3.jpg", z: {1:2, 2:5, 3:3, 4:2, 5:3, 6:6}, tag: "louvers-3" },
  { id: 13, title: "Seamless Brown Paper Feature Wall",      file: "images/combinations/combo_2_5_5_2_3.jpg", z: {1:2, 2:5, 3:5, 4:2, 5:3, 6:6}, tag: "louvers-5" },
  { id: 14, title: "Brown Paper Tower & Gold Louvers",       file: "images/combinations/combo_5_3_1_2_3.jpg", z: {1:5, 2:3, 3:1, 4:2, 5:3, 6:6}, tag: "louvers-1" },
  { id: 15, title: "Warm Latte Facade & Charcoal Slats",     file: "images/combinations/combo_5_2_3_5_3.jpg", z: {1:5, 2:2, 3:3, 4:5, 5:3, 6:6}, tag: "louvers-3" },
  { id: 16, title: "Minimalist Ice Age & Gold Slats",        file: "images/combinations/combo_2_2_1_2_4.jpg", z: {1:2, 2:2, 3:1, 4:2, 5:4, 6:6}, tag: "louvers-1" },
  { id: 17, title: "Stone Path Trim & Brown Paper Slats",    file: "images/combinations/combo_2_4_5_4_3.jpg", z: {1:2, 2:4, 3:5, 4:4, 5:3, 6:6}, tag: "louvers-5" },
  { id: 18, title: "Bold Charcoal Tower & Ice Balconies",    file: "images/combinations/combo_3_2_1_2_3.jpg", z: {1:3, 2:2, 3:1, 4:2, 5:3, 6:6}, tag: "louvers-1" },
  { id: 19, title: "Slate Wall, Brown Trim & Ice Slats",     file: "images/combinations/combo_4_5_2_2_3.jpg", z: {1:4, 2:5, 3:2, 4:2, 5:3, 6:6}, tag: "louvers-2" },
  { id: 20, title: "Tri-Color Gold, Charcoal & Brown Paper", file: "images/combinations/combo_2_3_1_5_3.jpg", z: {1:2, 2:3, 3:1, 4:5, 5:3, 6:6}, tag: "louvers-1" }
];

// 4. ENGINE STATE
let activeZoneId = 3; // Start focused on Center Louvers so user can test all 5 colors right away
let currentAssignments = { 1: 2, 2: 3, 3: 1, 4: 2, 5: 3, 6: 6 };
let isBeforeMode = false;
let showPins = true;
let activeGalleryFilter = "all";

// Pixel buffers for photorealistic canvas engine
let basePixels = null;
let zonePixels = null;
let canvasWidth = 571;
let canvasHeight = 1024;
let engineReady = false;

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16)
  ];
}

// Load state from localStorage
function initState() {
  const saved = localStorage.getItem("paintStudioPhotorealV3");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.colors) COLOR_MAP = parsed.colors;
      if (parsed.assignments) currentAssignments = parsed.assignments;
      return;
    } catch (e) {}
  }
  resetToDefaults();
}

function resetToDefaults() {
  currentAssignments = { 1: 2, 2: 3, 3: 1, 4: 2, 5: 3, 6: 6 };
  saveState();
}

function saveState() {
  localStorage.setItem("paintStudioPhotorealV3", JSON.stringify({
    colors: COLOR_MAP,
    assignments: currentAssignments
  }));
}

// 5. INITIALIZE PHOTOREALISTIC PIXEL ENGINE
function initCanvasEngine() {
  const baseImg = new Image();
  const zoneImg = new Image();
  let loadedCount = 0;

  const onBothLoaded = () => {
    canvasWidth = baseImg.width;
    canvasHeight = baseImg.height;

    const offCanvas = document.createElement("canvas");
    offCanvas.width = canvasWidth;
    offCanvas.height = canvasHeight;
    const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });

    offCtx.drawImage(baseImg, 0, 0);
    basePixels = offCtx.getImageData(0, 0, canvasWidth, canvasHeight).data;

    offCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    offCtx.drawImage(zoneImg, 0, 0);
    zonePixels = offCtx.getImageData(0, 0, canvasWidth, canvasHeight).data;

    engineReady = true;
    const loader = document.getElementById("canvas-loader");
    if (loader) loader.classList.add("hidden");

    renderPhotorealisticCanvas();
  };

  baseImg.onload = () => { loadedCount++; if (loadedCount === 2) onBothLoaded(); };
  zoneImg.onload = () => { loadedCount++; if (loadedCount === 2) onBothLoaded(); };

  baseImg.src = "images/base_neutral.png";
  zoneImg.src = "images/zone_map.png";
}

// 6. REAL-TIME PHOTOREALISTIC PIXEL SHADER (Runs in < 4ms)
function renderPhotorealisticCanvas() {
  const canvas = document.getElementById("building-canvas");
  if (!canvas || !engineReady) return;
  const ctx = canvas.getContext("2d");

  const outData = ctx.createImageData(canvasWidth, canvasHeight);
  const dst = outData.data;

  if (isBeforeMode) {
    // Show untouched neutral white base
    dst.set(basePixels);
    ctx.putImageData(outData, 0, 0);
    return;
  }

  // Pre-fetch RGB arrays for zones 1..6
  const zoneR = new Uint8Array(7);
  const zoneG = new Uint8Array(7);
  const zoneB = new Uint8Array(7);

  for (let z = 1; z <= 6; z++) {
    const cid = currentAssignments[z] || ZONES[z].defaultColorId;
    const c = COLOR_MAP[cid] || COLOR_MAP[1];
    const rgb = c.rgb || hexToRgb(c.hex);
    zoneR[z] = rgb[0];
    zoneG[z] = rgb[1];
    zoneB[z] = rgb[2];
  }

  const totalBytes = basePixels.length;
  for (let i = 0; i < totalBytes; i += 4) {
    const zid = zonePixels[i];       // R channel = Zone ID (0..6)
    const alpha = zonePixels[i + 1]; // G channel = Edge blend alpha (0..255)

    if (zid === 0 || alpha === 0) {
      dst[i] = basePixels[i];
      dst[i + 1] = basePixels[i + 1];
      dst[i + 2] = basePixels[i + 2];
      dst[i + 3] = 255;
    } else {
      const lum = zonePixels[i + 2]; // B channel = Shading luminance
      const s = lum / 228.0;

      let nr = (zoneR[zid] * s) | 0;
      let ng = (zoneG[zid] * s) | 0;
      let nb = (zoneB[zid] * s) | 0;
      if (nr > 255) nr = 255;
      if (ng > 255) ng = 255;
      if (nb > 255) nb = 255;

      if (alpha >= 250) {
        dst[i] = nr;
        dst[i + 1] = ng;
        dst[i + 2] = nb;
        dst[i + 3] = 255;
      } else {
        const a = alpha / 255.0;
        const ia = 1.0 - a;
        dst[i] = (nr * a + basePixels[i] * ia) | 0;
        dst[i + 1] = (ng * a + basePixels[i + 1] * ia) | 0;
        dst[i + 2] = (nb * a + basePixels[i + 2] * ia) | 0;
        dst[i + 3] = 255;
      }
    }
  }

  ctx.putImageData(outData, 0, 0);
}

// 7. DIRECT PIXEL CLICK & HOVER DETECTION ON CANVAS
function setupCanvasInteraction() {
  const canvas = document.getElementById("building-canvas");
  if (!canvas) return;

  const getZoneAtEvent = (e) => {
    if (!engineReady) return 0;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvasWidth);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvasHeight);
    if (x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight) return 0;
    const idx = (y * canvasWidth + x) * 4;
    return zonePixels[idx];
  };

  canvas.addEventListener("click", (e) => {
    const zid = getZoneAtEvent(e);
    if (zid >= 1 && zid <= 6) {
      selectZone(zid);
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    const zid = getZoneAtEvent(e);
    const tooltip = document.getElementById("hover-tooltip");
    if (zid >= 1 && zid <= 6) {
      canvas.style.cursor = "pointer";
      const z = ZONES[zid];
      const cid = currentAssignments[zid];
      const c = COLOR_MAP[cid];
      if (tooltip) {
        tooltip.innerHTML = `<span class="inline-block w-2 h-2 rounded-full mr-1" style="background:${z.pinColor}"></span><b>${z.shortName}:</b> #${cid} ${c.name} (${c.code})`;
        tooltip.classList.remove("opacity-0");
      }
    } else {
      canvas.style.cursor = "default";
      if (tooltip) tooltip.classList.add("opacity-0");
    }
  });

  canvas.addEventListener("mouseleave", () => {
    const tooltip = document.getElementById("hover-tooltip");
    if (tooltip) tooltip.classList.add("opacity-0");
  });
}

// 8. ZONE & COLOR ASSIGNMENT ACTIONS
function selectZone(zid) {
  activeZoneId = zid;
  updateUI();
}

function setZoneColor(zid, colorId) {
  if (!COLOR_MAP[colorId] || !ZONES[zid]) return;
  currentAssignments[zid] = colorId;
  activeZoneId = zid;
  saveState();
  updateUI();
}

function applyColorToActiveZone(colorId) {
  setZoneColor(activeZoneId, colorId);
}

function loadCombination(comboId) {
  const combo = COMBINATIONS_GALLERY.find(c => c.id === comboId);
  if (!combo) return;
  currentAssignments = { ...combo.z };
  saveState();
  updateUI();
  // Smooth scroll to top visualizer on mobile/desktop
  document.getElementById("studio-top")?.scrollIntoView({ behavior: "smooth" });
}

function randomizeColors() {
  const mainIds = [1, 2, 3, 4, 5];
  for (let z = 1; z <= 5; z++) {
    currentAssignments[z] = mainIds[Math.floor(Math.random() * mainIds.length)];
  }
  saveState();
  updateUI();
}

// 9. RENDER UI PANELS
function renderTopColorBar() {
  const container = document.getElementById("numbered-colors-grid");
  if (!container) return;
  container.innerHTML = "";

  const activeColorId = currentAssignments[activeZoneId];

  Object.keys(COLOR_MAP).forEach(k => {
    const num = parseInt(k);
    const c = COLOR_MAP[num];
    const isLight = isLightColor(c.hex);
    const isSelected = num === activeColorId;

    const btn = document.createElement("button");
    btn.onclick = () => applyColorToActiveZone(num);
    btn.className = `color-num-btn flex items-center justify-between p-2.5 rounded-xl border text-left transition shadow-md ${isSelected ? 'border-amber-400 bg-slate-800/95 ring-2 ring-amber-400/50 scale-[1.02]' : 'border-slate-800 bg-slate-900/75 hover:border-slate-600'}`;
    btn.innerHTML = `
      <div class="flex items-center gap-2.5 min-w-0">
        <span class="w-8 h-8 rounded-lg font-black text-xs flex items-center justify-center border flex-shrink-0 shadow-inner ${isLight ? 'text-slate-950 border-black/20' : 'text-white border-white/20'}" style="background-color: ${c.hex};">
          #${c.id}
        </span>
        <div class="min-w-0">
          <div class="text-xs font-bold text-white truncate">${c.name}</div>
          <div class="text-[10px] text-amber-400 font-mono">${c.code ? 'Code ' + c.code : c.hex}</div>
        </div>
      </div>
      <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}">
        ${isSelected ? 'Active' : 'Apply'}
      </span>
    `;
    container.appendChild(btn);
  });
}

function renderZoneCards() {
  const container = document.getElementById("components-list");
  if (!container) return;
  container.innerHTML = "";

  Object.keys(ZONES).forEach(k => {
    const zid = parseInt(k);
    const z = ZONES[zid];
    const colorId = currentAssignments[zid] || z.defaultColorId;
    const c = COLOR_MAP[colorId] || COLOR_MAP[1];
    const isActive = activeZoneId === zid;

    const numberPills = Object.keys(COLOR_MAP).map(ck => {
      const cnum = parseInt(ck);
      const col = COLOR_MAP[cnum];
      const isChosen = cnum === colorId;
      return `
        <button 
          onclick="event.stopPropagation(); setZoneColor(${zid}, ${cnum})" 
          title="#${cnum} ${col.name} (${col.code})"
          class="color-num-btn w-7 h-7 rounded-lg text-xs font-extrabold transition flex items-center justify-center border ${isChosen ? 'ring-2 ring-white scale-110 border-white shadow-lg' : 'border-slate-700 opacity-75 hover:opacity-100'}"
          style="background-color: ${col.hex}; color: ${isLightColor(col.hex) ? '#0f172a' : '#ffffff'};">
          ${cnum}
        </button>
      `;
    }).join("");

    const card = document.createElement("div");
    card.onclick = () => selectZone(zid);
    card.className = `p-3.5 rounded-xl border transition cursor-pointer mb-2.5 ${isActive ? 'border-blue-500 bg-blue-950/30 ring-1 ring-blue-500/60 shadow-lg' : 'border-slate-800/90 bg-slate-900/60 hover:bg-slate-900/90'}`;
    card.innerHTML = `
      <div class="flex items-center justify-between gap-2 mb-2.5">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="w-6 h-6 rounded-full text-[11px] font-black text-white flex items-center justify-center flex-shrink-0 shadow" style="background-color: ${z.pinColor}">
            ${zid}
          </span>
          <div class="min-w-0">
            <div class="text-xs font-extrabold text-white truncate">${z.name}</div>
            <div class="text-[10px] text-slate-400 truncate">${z.surfaceType}</div>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="text-right">
            <div class="text-[11px] font-bold text-amber-400">#${colorId} ${c.name}</div>
            <div class="text-[10px] text-slate-400 font-mono">${c.code} • ${c.hex}</div>
          </div>
          <div class="w-7 h-7 rounded-lg border border-white/20 shadow-inner" style="background-color: ${c.hex};"></div>
        </div>
      </div>
      <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Instant Color #:</span>
        <div class="flex items-center gap-1.5 flex-wrap">
          ${numberPills}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// 10. MOBILE BOTTOM QUICK-BAR
function renderMobileDock() {
  const zoneBar = document.getElementById("mobile-zone-tabs");
  const colorBar = document.getElementById("mobile-color-pills");
  if (!zoneBar || !colorBar) return;

  zoneBar.innerHTML = Object.keys(ZONES).map(k => {
    const zid = parseInt(k);
    const z = ZONES[zid];
    const cid = currentAssignments[zid];
    const c = COLOR_MAP[cid];
    const isActive = zid === activeZoneId;
    return `
      <button onclick="selectZone(${zid})" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${isActive ? 'bg-blue-600 border-blue-400 text-white shadow-md' : 'bg-slate-900 border-slate-800 text-slate-300'}">
        <span class="w-3 h-3 rounded-full border border-white/40" style="background:${c.hex}"></span>
        <span>${zid}. ${z.shortName}</span>
      </button>
    `;
  }).join("");

  const activeCid = currentAssignments[activeZoneId];
  colorBar.innerHTML = Object.keys(COLOR_MAP).map(ck => {
    const cnum = parseInt(ck);
    const col = COLOR_MAP[cnum];
    const isChosen = cnum === activeCid;
    return `
      <button onclick="applyColorToActiveZone(${cnum})" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap transition ${isChosen ? 'ring-2 ring-amber-400 border-white scale-105' : 'border-slate-700 opacity-85'}" style="background-color: ${col.hex}; color: ${isLightColor(col.hex) ? '#0f172a' : '#ffffff'};">
        <span>#${cnum}</span>
        <span>${col.name}</span>
      </button>
    `;
  }).join("");
}

// 11. RENDER ALL-COMBINATIONS GALLERY GRID
function renderCombinationsGallery(filter = activeGalleryFilter) {
  activeGalleryFilter = filter;
  const grid = document.getElementById("combinations-gallery-grid");
  if (!grid) return;
  grid.innerHTML = "";

  // Update filter buttons
  document.querySelectorAll(".gallery-filter-btn").forEach(btn => {
    if (btn.dataset.filter === filter) {
      btn.className = "gallery-filter-btn px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow transition whitespace-nowrap";
    } else {
      btn.className = "gallery-filter-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-600 transition whitespace-nowrap";
    }
  });

  const filtered = filter === "all" 
    ? COMBINATIONS_GALLERY 
    : COMBINATIONS_GALLERY.filter(item => item.tag === filter);

  filtered.forEach(item => {
    const cWall = COLOR_MAP[item.z[1]];
    const cFrame = COLOR_MAP[item.z[2]];
    const cLouver = COLOR_MAP[item.z[3]];
    const cBalcony = COLOR_MAP[item.z[4]];

    const card = document.createElement("div");
    card.className = "combo-card glass-panel rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer group";
    card.onclick = () => loadCombination(item.id);

    card.innerHTML = `
      <div>
        <div class="relative aspect-[571/820] overflow-hidden bg-slate-950">
          <img src="${item.file}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover object-top" />
          <div class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur border border-white/10 text-[10px] font-bold text-amber-400">
            Variation #${item.id}
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-65"></div>
          <div class="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
            <div class="flex items-center gap-1">
              <span title="Wall: ${cWall.name}" class="w-5 h-5 rounded-full border border-white/50 shadow" style="background:${cWall.hex}"></span>
              <span title="Frame: ${cFrame.name}" class="w-5 h-5 rounded-full border border-white/50 shadow" style="background:${cFrame.hex}"></span>
              <span title="Louvers: ${cLouver.name}" class="w-5 h-5 rounded-full border-2 border-amber-400 shadow" style="background:${cLouver.hex}"></span>
              <span title="Balcony: ${cBalcony.name}" class="w-5 h-5 rounded-full border border-white/50 shadow" style="background:${cBalcony.hex}"></span>
            </div>
            <span class="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-bold shadow group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              Load Live →
            </span>
          </div>
        </div>
        <div class="p-3.5">
          <h4 class="text-xs font-extrabold text-white mb-1">${item.title}</h4>
          <div class="text-[11px] text-slate-400 space-y-0.5 font-mono">
            <div>Louvers: <span class="text-slate-200 font-semibold">#${item.z[3]} ${cLouver.name}</span></div>
            <div>Frame: <span class="text-slate-200">#${item.z[2]} ${cFrame.name}</span> • Wall: <span class="text-slate-200">#${item.z[1]} ${cWall.name}</span></div>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 12. PINS OVERLAY ON CANVAS
function renderPins() {
  const container = document.getElementById("pins-overlay-container");
  if (!container) return;
  container.innerHTML = "";
  if (!showPins) return;

  Object.keys(ZONES).forEach(k => {
    const zid = parseInt(k);
    const z = ZONES[zid];
    const cid = currentAssignments[zid];
    const c = COLOR_MAP[cid];
    const isActive = zid === activeZoneId;

    const btn = document.createElement("button");
    btn.className = `absolute -translate-x-1/2 -translate-y-1/2 rounded-full text-[11px] font-black flex items-center justify-center shadow-xl transition transform hover:scale-125 z-10 w-7 h-7 border-2 border-white ${isActive ? 'pulse-badge scale-125' : 'opacity-90'}`;
    btn.style.left = z.pinCoords.x;
    btn.style.top = z.pinCoords.y;
    btn.style.backgroundColor = c.hex;
    btn.style.color = isLightColor(c.hex) ? '#0f172a' : '#ffffff';
    btn.innerText = cid;
    btn.title = `Zone ${zid} (${z.shortName}): Color #${cid} ${c.name}`;
    btn.onclick = (e) => {
      e.stopPropagation();
      selectZone(zid);
    };
    container.appendChild(btn);
  });
}

function togglePins() {
  showPins = !showPins;
  const btn = document.getElementById("toggle-pins-btn");
  if (btn) btn.innerText = showPins ? "📍 Hide Pins" : "📍 Show Pins";
  renderPins();
}

function toggleBeforeAfter() {
  isBeforeMode = !isBeforeMode;
  const btn = document.getElementById("toggle-compare-btn");
  if (btn) {
    btn.innerText = isBeforeMode ? "✨ Show Colored Render" : "👁️ Compare White Base";
  }
  renderPhotorealisticCanvas();
}

// 13. DOWNLOAD CURRENT LIVE CANVAS AS HIGH-RES IMAGE
function downloadLiveRender() {
  const canvas = document.getElementById("building-canvas");
  if (!canvas) return;
  const link = document.createElement("a");
  const codeSeq = [1,2,3,4,5].map(z => currentAssignments[z]).join("-");
  link.download = `exterior-paint-render-${codeSeq}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// 14. ADD CUSTOM COLOR OR PICK FROM WHEEL
function addNewColor() {
  const nameInput = document.getElementById("new-color-name");
  const codeInput = document.getElementById("new-color-code");
  const hexInput = document.getElementById("new-color-hex");

  const name = nameInput.value.trim() || `Custom Shade ${nextColorId}`;
  const code = codeInput.value.trim() || `C0${nextColorId}`;
  const hex = hexInput.value.toUpperCase();

  COLOR_MAP[nextColorId] = {
    id: nextColorId,
    name: name,
    code: code,
    hex: hex,
    rgb: hexToRgb(hex),
    category: "Custom Shade",
    desc: `custom ${name.toLowerCase()} shade`
  };

  currentAssignments[activeZoneId] = nextColorId;
  nextColorId++;
  saveState();
  updateUI();
  nameInput.value = "";
  codeInput.value = "";
}

// Live Color Wheel instant preview on active zone
function onLiveWheelInput(hexVal) {
  const hex = hexVal.toUpperCase();
  COLOR_MAP[99] = {
    id: 99,
    name: "Live Custom",
    code: hex,
    hex: hex,
    rgb: hexToRgb(hex),
    category: "Live Wheel",
    desc: `custom shade ${hex}`
  };
  currentAssignments[activeZoneId] = 99;
  renderPhotorealisticCanvas();
  updateActiveBanner();
}

// 15. PROMPT COMMAND PARSER
function executePrompt() {
  const inputEl = document.getElementById("prompt-input");
  const text = inputEl.value.trim().toLowerCase();
  if (!text) return;

  let updated = 0;
  const rawNums = text.match(/\b([1-9])\b/g);
  if (/^[\s,0-9]+$/.test(text) && rawNums && rawNums.length >= 2) {
    rawNums.forEach((n, idx) => {
      const zid = idx + 1;
      const cid = parseInt(n);
      if (ZONES[zid] && COLOR_MAP[cid]) {
        currentAssignments[zid] = cid;
        updated++;
      }
    });
  } else {
    Object.keys(ZONES).forEach(k => {
      const zid = parseInt(k);
      const z = ZONES[zid];
      z.aliases.forEach(alias => {
        const regex = new RegExp(`(?:\\b${alias}\\b)[^0-9]{0,10}\\b([1-9])\\b`, "i");
        const m = text.match(regex);
        if (m && COLOR_MAP[parseInt(m[1])]) {
          currentAssignments[zid] = parseInt(m[1]);
          updated++;
        }
      });
    });
  }

  const fb = document.getElementById("prompt-feedback");
  if (updated > 0) {
    if (fb) {
      fb.innerText = `✅ Applied ${updated} color assignments in real-time!`;
      fb.className = "text-xs mt-1.5 text-emerald-400 font-semibold";
    }
    saveState();
    updateUI();
  } else if (fb) {
    fb.innerText = "Try typing: 'louvers: 5, frame: 3, wall: 2' or sequence '2 3 5 2 3'";
    fb.className = "text-xs mt-1.5 text-amber-400";
  }
}

// 16. CONSTRUCTIBLE AI PROMPT & SCHEDULE
function buildConstructiblePrompt() {
  const getCol = (zid) => COLOR_MAP[currentAssignments[zid]] || COLOR_MAP[1];
  const c1 = getCol(1), c2 = getCol(2), c3 = getCol(3), c4 = getCol(4), c5 = getCol(5), c6 = getCol(6);

  const prompt = `Photorealistic architectural exterior photograph of a modern 5-story contemporary residential building from a low-angle perspective in bright daylight. ` +
    `1) Main Exterior Wall & Left Tower painted in Asian Paints ${c1.name} (Code ${c1.code}, ${c1.hex}). ` +
    `2) Accent Border Frame & Vertical Trim wrapping the central shaft in ${c2.name} (Code ${c2.code}, ${c2.hex}). ` +
    `3) Tall vertical Center Louver / Slat Feature Panel finished in ${c3.name} (Code ${c3.code}, ${c3.hex}). ` +
    `4) Cantilever Balcony Parapets, Beams & Window Lintel Headers in ${c4.name} (Code ${c4.code}, ${c4.hex}). ` +
    `5) Balcony Underside Ceilings (Soffits) in ${c5.name} (Code ${c5.code}, ${c5.hex}). ` +
    `6) Window Frames in ${c6.name} (${c6.hex}). Ultra-detailed 8k V-Ray architectural photography.`;

  const el = document.getElementById("ai-constructible-prompt");
  if (el) el.value = prompt;
  return prompt;
}

function updateActiveBanner() {
  const z = ZONES[activeZoneId];
  const cid = currentAssignments[activeZoneId];
  const c = COLOR_MAP[cid] || COLOR_MAP[1];

  document.getElementById("active-component-zone").innerText = `Zone #${zid} Active`;
  document.getElementById("active-component-title").innerText = z.name;
  document.getElementById("active-component-product").innerText = z.recommendedProduct;

  const badge = document.getElementById("active-assigned-badge");
  badge.innerText = `#${cid} ${c.name} (${c.code})`;
  badge.style.backgroundColor = c.hex;
  badge.style.color = isLightColor(c.hex) ? '#0f172a' : '#ffffff';
}

function updateScheduleTable() {
  const tbody = document.getElementById("schedule-table-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  Object.keys(ZONES).forEach(k => {
    const zid = parseInt(k);
    const z = ZONES[zid];
    const cid = currentAssignments[zid];
    const c = COLOR_MAP[cid] || COLOR_MAP[1];

    const tr = document.createElement("tr");
    tr.className = "border-b border-slate-800/80 hover:bg-slate-900/50 text-xs";
    tr.innerHTML = `
      <td class="py-3 px-3 font-bold text-white">
        <span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background-color: ${z.pinColor};"></span>
        Zone ${zid}: ${z.name}
      </td>
      <td class="py-3 px-3 font-mono font-bold text-amber-400">Color #${cid}</td>
      <td class="py-3 px-3 flex items-center gap-2">
        <span class="w-5 h-5 rounded-md border border-white/20 shadow-sm inline-block" style="background-color: ${c.hex};"></span>
        <span class="font-bold text-slate-100">${c.name}</span>
      </td>
      <td class="py-3 px-3 font-mono font-bold text-slate-200">${c.code}</td>
      <td class="py-3 px-3 font-mono text-slate-400">${c.hex}</td>
      <td class="py-3 px-3 text-slate-300">${z.recommendedProduct}</td>
    `;
    tbody.appendChild(tr);
  });
}

function copyFormulation() {
  let spec = "========================================================\n";
  spec += "ASIAN PAINTS ARCHITECTURAL EXTERIOR COLOR SCHEDULE\n";
  spec += "========================================================\n\n";
  Object.keys(ZONES).forEach(k => {
    const zid = parseInt(k);
    const z = ZONES[zid];
    const cid = currentAssignments[zid];
    const c = COLOR_MAP[cid];
    spec += `Zone ${zid} (${z.shortName.padEnd(14)}) : #${cid} ${c.name} (Code: ${c.code}, ${c.hex})\n`;
  });
  spec += "\nCONSTRUCTIBLE AI PROMPT:\n" + buildConstructiblePrompt();
  navigator.clipboard.writeText(spec).then(() => {
    alert("Copied Paint Schedule & Constructible Prompt to clipboard!");
  });
}

function copyConstructiblePrompt() {
  navigator.clipboard.writeText(buildConstructiblePrompt()).then(() => {
    const btn = document.getElementById("copy-ai-prompt-btn");
    if (btn) {
      btn.innerText = "✅ Copied!";
      setTimeout(() => { btn.innerText = "📋 Copy AI Prompt"; }, 2000);
    }
  });
}

function isLightColor(hex) {
  const rgb = hexToRgb(hex);
  return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 > 155;
}

function updateUI() {
  renderPhotorealisticCanvas();
  renderTopColorBar();
  renderZoneCards();
  renderMobileDock();
  renderPins();
  updateActiveBanner();
  updateScheduleTable();
  buildConstructiblePrompt();
}

document.addEventListener("DOMContentLoaded", () => {
  initState();
  initCanvasEngine();
  setupCanvasInteraction();
  updateUI();
  renderCombinationsGallery("all");

  const promptInput = document.getElementById("prompt-input");
  if (promptInput) {
    promptInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") executePrompt();
    });
  }
});
