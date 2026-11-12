/**
 * Multi-View 16-Zone Photorealistic Architectural Paint Visualizer
 * Supports:
 *  - View 1: 3D Clean Architectural Elevation (12 Granular Pixel Zones)
 *  - View 2: Full Front Street View from KKKKKKK (Compound Wall, Recessed Box & 3 Gates)
 *  - View 3: Full 3D Side-Angle Perspective from KKKKKKK (Right Facade + 10 Box Windows + Gates)
 */

// 1. EXTRACTED ASIAN PAINTS PALETTE + SITE TEST SWATCHES
let COLOR_MAP = {
  1: { id: 1, name: "Victorian Gold",  code: "X103", hex: "#EEB81B", rgb: [238, 184, 27],  category: "Yellow Accent",    desc: "rich golden mustard yellow" },
  2: { id: 2, name: "Ice Age",         code: "8299", hex: "#D7D4CD", rgb: [215, 212, 205], category: "Warm Off-White",   desc: "soft warm greige off-white" },
  3: { id: 3, name: "Bentonite",       code: "8230", hex: "#615F62", rgb: [97, 95, 98],    category: "Slate Charcoal",   desc: "deep architectural slate charcoal" },
  4: { id: 4, name: "Stone Path",      code: "8255", hex: "#6F767D", rgb: [111, 118, 125], category: "Mid Slate Grey",   desc: "modern mid-tone cool slate grey" },
  5: { id: 5, name: "Brown Paper",     code: "8577", hex: "#CBAC97", rgb: [203, 172, 151], category: "Earthy Sand Tan",  desc: "warm sandy clay latte tan" },
  6: { id: 6, name: "Site Terracotta", code: "7998", hex: "#9E4732", rgb: [158, 71, 50],   category: "Site Swatch Red",  desc: "warm terracotta brick brown from site test patch" },
  7: { id: 7, name: "Pure Crisp White",code: "L101", hex: "#F4F5F7", rgb: [244, 245, 247], category: "Architectural White", desc: "crisp exterior pure white" },
  8: { id: 8, name: "Natural Teak",    code: "0425", hex: "#A56932", rgb: [165, 105, 50],  category: "Wood Finish",      desc: "natural warm teak wood grain" }
};

let nextColorId = 9;

// 2. ALL 16 EXTRACTED ARCHITECTURAL ZONES ACROSS THE 3 VIEWS
const ZONES = {
  1: {
    id: 1, key: "wall", group: "Front Tower & Trim",
    name: "Main Left Shear Wall & Lower Facade", shortName: "Main Wall",
    aliases: ["wall", "main wall", "facade", "tower"],
    pinColor: "#ef4444",
    pins: { render: {x:"12%", y:"48%"}, front: {x:"14%", y:"45%"}, side: {x:"14%", y:"45%"} },
    surfaceType: "Exterior Cement Plaster / Shear Wall",
    recommendedProduct: "Apex Ultima Protek Duralife",
    defaultColorId: 2
  },
  2: {
    id: 2, key: "crown", group: "Front Tower & Trim",
    name: "Top Roof Crown & Upper Parapet Ledge", shortName: "Roof Crown",
    aliases: ["crown", "roof", "top", "top ledge"],
    pinColor: "#f97316",
    pins: { render: {x:"36%", y:"5%"}, front: {x:"33%", y:"4%"}, side: {x:"35%", y:"7%"} },
    surfaceType: "Upper Roof Parapet & Coping Band",
    recommendedProduct: "Apex Ultima Protek Duralife",
    defaultColorId: 3
  },
  3: {
    id: 3, key: "outer_trim", group: "Front Tower & Trim",
    name: "Outer L-Border & Left Vertical Trim", shortName: "Outer L-Trim",
    aliases: ["outer trim", "l border", "left strip", "bottom ledge"],
    pinColor: "#3b82f6",
    pins: { render: {x:"21%", y:"36%"}, front: {x:"20%", y:"38%"}, side: {x:"18%", y:"38%"} },
    surfaceType: "Left Vertical Trim & Bottom Horizontal L-Band",
    recommendedProduct: "Apex Ultima Protek (Matt)",
    defaultColorId: 3
  },
  4: {
    id: 4, key: "groove_panel", group: "Front Tower & Trim",
    name: "Recessed Vertical Groove Panel", shortName: "Groove Panel",
    aliases: ["groove", "groove panel", "recessed panel", "vertical channel"],
    pinColor: "#06b6d4",
    pins: { render: {x:"27%", y:"52%"}, front: {x:"24%", y:"50%"}, side: {x:"22%", y:"50%"} },
    surfaceType: "Recessed Vertical Grooved Wall Between Trim & Louvers",
    recommendedProduct: "Apex Ultima Protek Duralife",
    defaultColorId: 2
  },
  5: {
    id: 5, key: "louver_frame", group: "Center Feature Shaft",
    name: "Inner Louver Frame Border", shortName: "Louver Frame",
    aliases: ["frame", "louver frame", "inner frame", "border"],
    pinColor: "#6366f1",
    pins: { render: {x:"34%", y:"18%"}, front: {x:"30%", y:"20%"}, side: {x:"26%", y:"22%"} },
    surfaceType: "Inverted-U Moulding Frame Enclosing Louvers",
    recommendedProduct: "Apex Ultima Protek (Matt)",
    defaultColorId: 3
  },
  6: {
    id: 6, key: "louvers", group: "Center Feature Shaft",
    name: "Center Louver / Slat Panel (Main Slats)", shortName: "Main Louvers",
    aliases: ["louvers", "louver", "slats", "slat", "yellow"],
    pinColor: "#eab308",
    pins: { render: {x:"46%", y:"38%"}, front: {x:"38%", y:"36%"}, side: {x:"28%", y:"36%"} },
    surfaceType: "Horizontal Ventilation Slats / Feature Shaft",
    recommendedProduct: "Apex Ultima Stretch / PU Satin",
    defaultColorId: 1
  },
  7: {
    id: 7, key: "louver_accent", group: "Center Feature Shaft",
    name: "Louver Accent Band (Site Test Swatch Zone)", shortName: "Louver Accent",
    aliases: ["accent", "swatch", "test patch", "stripe", "louver accent"],
    pinColor: "#e11d48",
    pins: { render: {x:"48%", y:"56%"}, front: {x:"38%", y:"55%"}, side: {x:"26%", y:"58%"} },
    surfaceType: "Middle Highlight Slats (Site Swatch Test Band)",
    recommendedProduct: "Apex Ultima Stretch / PU Satin",
    defaultColorId: 1
  },
  8: {
    id: 8, key: "balcony_parapet", group: "5-Floor Balcony Structure",
    name: "Balcony Front Parapet Walls (5 Floors)", shortName: "Balcony Parapets",
    aliases: ["balcony", "balconies", "parapet", "parapets", "railing"],
    pinColor: "#10b981",
    pins: { render: {x:"74%", y:"55%"}, front: {x:"65%", y:"53%"}, side: {x:"48%", y:"52%"} },
    surfaceType: "Horizontal Cantilever Balcony Railing Walls",
    recommendedProduct: "Apex Ultima Protek Duralife",
    defaultColorId: 2
  },
  9: {
    id: 9, key: "balcony_box", group: "5-Floor Balcony Structure",
    name: "Balcony Right-Corner Box Blocks & Pillars", shortName: "Corner Box Blocks",
    aliases: ["corner", "corner box", "pillars", "balcony box", "right pillar"],
    pinColor: "#14b8a6",
    pins: { render: {x:"90%", y:"38%"}, front: {x:"88%", y:"40%"}, side: {x:"66%", y:"40%"} },
    surfaceType: "Protruding 3D Corner Blocks & Right Vertical Columns",
    recommendedProduct: "Apex Ultima Protek Duralife",
    defaultColorId: 2
  },
  10: {
    id: 10, key: "balcony_inner", group: "5-Floor Balcony Structure",
    name: "Balcony Inner Recessed Walls", shortName: "Inner Balcony Wall",
    aliases: ["inner wall", "recessed wall", "balcony inner", "inside wall"],
    pinColor: "#84cc16",
    pins: { render: {x:"74%", y:"70%"}, front: {x:"62%", y:"63%"}, side: {x:"46%", y:"62%"} },
    surfaceType: "Interior Balcony Bay Walls Around Windows & Doors",
    recommendedProduct: "Apex Weatherproof / Royale Aspira",
    defaultColorId: 7
  },
  11: {
    id: 11, key: "ceiling", group: "5-Floor Balcony Structure",
    name: "Balcony Ceilings / Underside Soffits", shortName: "Balcony Ceilings",
    aliases: ["ceiling", "ceilings", "soffit", "soffits", "underside"],
    pinColor: "#a855f7",
    pins: { render: {x:"72%", y:"28%"}, front: {x:"64%", y:"26%"}, side: {x:"48%", y:"26%"} },
    surfaceType: "Exposed Concrete / Balcony Soffit Plaster",
    recommendedProduct: "Apex Weatherproof Exterior Emulsion",
    defaultColorId: 3
  },
  12: {
    id: 12, key: "windows", group: "5-Floor Balcony Structure",
    name: "Window Frames & Wood Casings", shortName: "Window Frames",
    aliases: ["window", "windows", "wood", "casing"],
    pinColor: "#d97706",
    pins: { render: {x:"88%", y:"71%"}, front: {x:"76%", y:"64%"}, side: {x:"56%", y:"62%"} },
    surfaceType: "Hardwood / UPVC Window Frame Casings",
    recommendedProduct: "Asian Paints WoodTech Aquadur PU",
    defaultColorId: 8
  },
  13: {
    id: 13, key: "side_wall", group: "Side Elevation & Street Compound (KKKKKKK)",
    name: "Right-Side Elevation Main Wall", shortName: "Right Side Wall",
    aliases: ["side wall", "right wall", "side elevation", "side facade"],
    pinColor: "#ec4899",
    pins: { render: null, front: null, side: {x:"84%", y:"48%"} },
    surfaceType: "Right-Side Full Height Exterior Wall (View 3)",
    recommendedProduct: "Apex Ultima Protek Duralife",
    defaultColorId: 2
  },
  14: {
    id: 14, key: "side_boxes", group: "Side Elevation & Street Compound (KKKKKKK)",
    name: "10 Side Window Box Frames & Compound Inner Box", shortName: "10 Box Windows",
    aliases: ["box windows", "side boxes", "window boxes", "recessed box", "inner box"],
    pinColor: "#8b5cf6",
    pins: { render: null, front: {x:"30%", y:"85%"}, side: {x:"88%", y:"62%"} },
    surfaceType: "10 Protruding Side Window Surrounds & Compound Molding Box",
    recommendedProduct: "Apex Ultima Protek (Matt)",
    defaultColorId: 3
  },
  15: {
    id: 15, key: "compound_wall", group: "Side Elevation & Street Compound (KKKKKKK)",
    name: "Front & Side Compound Boundary Wall", shortName: "Compound Wall",
    aliases: ["compound", "compound wall", "boundary", "boundary wall"],
    pinColor: "#0ea5e9",
    pins: { render: null, front: {x:"12%", y:"83%"}, side: {x:"78%", y:"82%"} },
    surfaceType: "Street-Level Compound Wall & Grooved Side Boundary",
    recommendedProduct: "Apex Duracast / Ultima Protek",
    defaultColorId: 2
  },
  16: {
    id: 16, key: "gates", group: "Side Elevation & Street Compound (KKKKKKK)",
    name: "Main Entrance Metal Gates (3 Gates)", shortName: "Entrance Gates",
    aliases: ["gate", "gates", "metal gate", "entrance gate"],
    pinColor: "#f59e0b",
    pins: { render: null, front: {x:"64%", y:"85%"}, side: {x:"38%", y:"82%"} },
    surfaceType: "3 Metal Entrance Gates with Enamel Finish",
    recommendedProduct: "Asian Paints Apcolite Premium Gloss Enamel",
    defaultColorId: 1
  }
};

// 3. PRE-GENERATED 20 ALL-COMBINATION VARIATIONS
const COMBINATIONS_GALLERY = [
  { id: 1,  title: "Signature Gold & Charcoal",              file: "images/combinations/combo_2_3_1_2_3.jpg", map: {1:2, 2:3, 3:3, 4:2, 5:3, 6:1, 7:1, 8:2, 9:2, 10:7, 11:3, 12:8, 13:2, 14:3, 15:2, 16:1}, tag: "louvers-1" },
  { id: 2,  title: "Brown Paper Louvers & Charcoal Trim",    file: "images/combinations/combo_2_3_5_2_3.jpg", map: {1:2, 2:3, 3:3, 4:2, 5:3, 6:5, 7:5, 8:2, 9:2, 10:7, 11:3, 12:8, 13:2, 14:3, 15:2, 16:5}, tag: "louvers-5" },
  { id: 3,  title: "Stone Path Louvers & Charcoal Trim",     file: "images/combinations/combo_2_3_4_2_3.jpg", map: {1:2, 2:3, 3:3, 4:2, 5:3, 6:4, 7:4, 8:2, 9:2, 10:7, 11:3, 12:8, 13:2, 14:3, 15:2, 16:4}, tag: "louvers-4" },
  { id: 4,  title: "Ice Age Louvers & Charcoal Frame",       file: "images/combinations/combo_2_3_2_2_3.jpg", map: {1:2, 2:3, 3:3, 4:2, 5:3, 6:2, 7:1, 8:2, 9:2, 10:7, 11:3, 12:8, 13:2, 14:3, 15:2, 16:3}, tag: "louvers-2" },
  { id: 5,  title: "Monolith Charcoal Louvers & Trim",       file: "images/combinations/combo_2_3_3_2_3.jpg", map: {1:2, 2:3, 3:3, 4:2, 5:3, 6:3, 7:1, 8:2, 9:2, 10:7, 11:3, 12:8, 13:2, 14:3, 15:2, 16:3}, tag: "louvers-3" },
  { id: 6,  title: "Slate Facade & Gold Louvers",            file: "images/combinations/combo_4_2_1_4_3.jpg", map: {1:4, 2:2, 3:2, 4:4, 5:2, 6:1, 7:1, 8:4, 9:2, 10:7, 11:3, 12:8, 13:4, 14:2, 15:4, 16:1}, tag: "louvers-1" },
  { id: 7,  title: "Slate Facade & Brown Paper Louvers",     file: "images/combinations/combo_4_2_5_4_3.jpg", map: {1:4, 2:2, 3:2, 4:4, 5:2, 6:5, 7:5, 8:4, 9:2, 10:7, 11:3, 12:8, 13:4, 14:2, 15:4, 16:5}, tag: "louvers-5" },
  { id: 8,  title: "Slate Facade & Charcoal Louvers",        file: "images/combinations/combo_4_2_3_4_3.jpg", map: {1:4, 2:2, 3:2, 4:4, 5:2, 6:3, 7:1, 8:4, 9:2, 10:7, 11:3, 12:8, 13:4, 14:2, 15:4, 16:3}, tag: "louvers-3" },
  { id: 9,  title: "Slate Facade & Ice Age Louvers",         file: "images/combinations/combo_4_2_2_4_3.jpg", map: {1:4, 2:2, 3:2, 4:4, 5:2, 6:2, 7:1, 8:4, 9:2, 10:7, 11:3, 12:8, 13:4, 14:2, 15:4, 16:2}, tag: "louvers-2" },
  { id: 10, title: "Dual-Tone Slate Tower & Ice Balconies",  file: "images/combinations/combo_4_3_1_2_3.jpg", map: {1:4, 2:3, 3:3, 4:2, 5:3, 6:1, 7:1, 8:2, 9:3, 10:7, 11:3, 12:8, 13:4, 14:3, 15:2, 16:1}, tag: "louvers-1" },
  { id: 11, title: "Warm Earth Frame & Gold Louvers",        file: "images/combinations/combo_2_5_1_2_5.jpg", map: {1:2, 2:5, 3:5, 4:2, 5:5, 6:1, 7:6, 8:2, 9:5, 10:7, 11:5, 12:8, 13:2, 14:5, 15:2, 16:1}, tag: "louvers-1" },
  { id: 12, title: "Brown Paper Frame & Charcoal Louvers",   file: "images/combinations/combo_2_5_3_2_3.jpg", map: {1:2, 2:5, 3:5, 4:2, 5:5, 6:3, 7:3, 8:2, 9:5, 10:7, 11:3, 12:8, 13:2, 14:5, 15:2, 16:3}, tag: "louvers-3" },
  { id: 13, title: "Seamless Brown Paper Feature Wall",      file: "images/combinations/combo_2_5_5_2_3.jpg", map: {1:2, 2:5, 3:5, 4:5, 5:3, 6:5, 7:6, 8:2, 9:3, 10:7, 11:3, 12:8, 13:2, 14:5, 15:2, 16:5}, tag: "louvers-5" },
  { id: 14, title: "Brown Paper Tower & Gold Louvers",       file: "images/combinations/combo_5_3_1_2_3.jpg", map: {1:5, 2:3, 3:3, 4:2, 5:3, 6:1, 7:1, 8:2, 9:3, 10:7, 11:3, 12:8, 13:5, 14:3, 15:5, 16:1}, tag: "louvers-1" },
  { id: 15, title: "Warm Latte Facade & Charcoal Slats",     file: "images/combinations/combo_5_2_3_5_3.jpg", map: {1:5, 2:2, 3:2, 4:5, 5:2, 6:3, 7:1, 8:5, 9:2, 10:7, 11:3, 12:8, 13:5, 14:2, 15:5, 16:3}, tag: "louvers-3" },
  { id: 16, title: "Minimalist Ice Age & Gold Slats",        file: "images/combinations/combo_2_2_1_2_4.jpg", map: {1:2, 2:2, 3:2, 4:2, 5:2, 6:1, 7:1, 8:2, 9:2, 10:7, 11:4, 12:8, 13:2, 14:4, 15:2, 16:1}, tag: "louvers-1" },
  { id: 17, title: "Stone Path Trim & Brown Paper Slats",    file: "images/combinations/combo_2_4_5_4_3.jpg", map: {1:2, 2:4, 3:4, 4:2, 5:4, 6:5, 7:5, 8:4, 9:2, 10:7, 11:3, 12:8, 13:2, 14:4, 15:2, 16:5}, tag: "louvers-5" },
  { id: 18, title: "Bold Charcoal Tower & Ice Balconies",    file: "images/combinations/combo_3_2_1_2_3.jpg", map: {1:3, 2:2, 3:2, 4:3, 5:2, 6:1, 7:1, 8:2, 9:3, 10:7, 11:3, 12:8, 13:3, 14:2, 15:2, 16:1}, tag: "louvers-1" },
  { id: 19, title: "Slate Wall, Brown Trim & Ice Slats",     file: "images/combinations/combo_4_5_2_2_3.jpg", map: {1:4, 2:5, 3:5, 4:2, 5:5, 6:2, 7:6, 8:2, 9:5, 10:7, 11:3, 12:8, 13:4, 14:5, 15:4, 16:5}, tag: "louvers-2" },
  { id: 20, title: "Tri-Color Gold, Charcoal & Brown Paper", file: "images/combinations/combo_2_3_1_5_3.jpg", map: {1:2, 2:3, 3:3, 4:5, 5:3, 6:1, 7:6, 8:5, 9:3, 10:7, 11:3, 12:8, 13:2, 14:3, 15:5, 16:1}, tag: "louvers-1" }
];

// 4. CAMERA VIEWS CONFIGURATION
const VIEWS = {
  render: {
    id: "render",
    label: "🏛️ View 1: 3D Clean Elevation (12 Zones)",
    baseSrc: "images/base_neutral.png",
    zoneSrc: "images/zone_map.png",
    width: 571,
    height: 1024
  },
  front: {
    id: "front",
    label: "🚧 View 2: Full Front Street & Gates (KKKKKKK)",
    baseSrc: "images/site_front_full.jpg",
    zoneSrc: "images/zone_map_front.png",
    width: 720,
    height: 1280
  },
  side: {
    id: "side",
    label: "📐 View 3: Side-Angle 10-Box-Windows & Gates (KKKKKKK)",
    baseSrc: "images/site_side_angle.jpg",
    zoneSrc: "images/zone_map_side.png",
    width: 720,
    height: 1280
  }
};

// 5. STATE
let activeViewId = "render";
let activeZoneId = 6; // Default active: Center Louvers
let currentAssignments = {};
let linkAccentToLouvers = true; // Whether Zone 7 follows Zone 6 automatically unless clicked directly
let isBeforeMode = false;
let showPins = true;
let activeGalleryFilter = "all";

// Cached pixel buffers per view
const viewCache = {};

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16)
  ];
}

function initState() {
  const saved = localStorage.getItem("paintStudio16ZoneV4");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.colors) COLOR_MAP = parsed.colors;
      if (parsed.assignments && Object.keys(parsed.assignments).length >= 12) {
        currentAssignments = parsed.assignments;
        return;
      }
    } catch (e) {}
  }
  resetToDefaults();
}

function resetToDefaults() {
  Object.keys(ZONES).forEach(k => {
    const zid = parseInt(k);
    currentAssignments[zid] = ZONES[zid].defaultColorId;
  });
  saveState();
}

function saveState() {
  localStorage.setItem("paintStudio16ZoneV4", JSON.stringify({
    colors: COLOR_MAP,
    assignments: currentAssignments
  }));
}

// 6. LOAD & SWITCH CAMERA VIEWS (View 1, View 2, View 3)
function switchCameraView(viewId) {
  if (!VIEWS[viewId]) return;
  activeViewId = viewId;

  // Update view tab buttons
  document.querySelectorAll(".camera-view-btn").forEach(btn => {
    if (btn.dataset.view === viewId) {
      btn.className = "camera-view-btn px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg transition flex items-center gap-1.5 whitespace-nowrap";
    } else {
      btn.className = "camera-view-btn px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 transition flex items-center gap-1.5 whitespace-nowrap";
    }
  });

  const v = VIEWS[viewId];
  const canvas = document.getElementById("building-canvas");
  const container = document.getElementById("canvas-aspect-box");

  if (viewCache[viewId]) {
    canvas.width = v.width;
    canvas.height = v.height;
    if (container) container.style.aspectRatio = `${v.width} / ${v.height}`;
    updateUI();
    return;
  }

  const loader = document.getElementById("canvas-loader");
  if (loader) loader.classList.remove("hidden");

  const baseImg = new Image();
  const zoneImg = new Image();
  let loaded = 0;

  const onReady = () => {
    const off = document.createElement("canvas");
    off.width = v.width;
    off.height = v.height;
    const ctx = off.getContext("2d", { willReadFrequently: true });

    ctx.drawImage(baseImg, 0, 0, v.width, v.height);
    const baseData = ctx.getImageData(0, 0, v.width, v.height).data;

    ctx.clearRect(0, 0, v.width, v.height);
    ctx.drawImage(zoneImg, 0, 0, v.width, v.height);
    const zoneData = ctx.getImageData(0, 0, v.width, v.height).data;

    viewCache[viewId] = {
      width: v.width,
      height: v.height,
      basePixels: baseData,
      zonePixels: zoneData
    };

    canvas.width = v.width;
    canvas.height = v.height;
    if (container) container.style.aspectRatio = `${v.width} / ${v.height}`;
    if (loader) loader.classList.add("hidden");
    updateUI();
  };

  baseImg.onload = () => { loaded++; if (loaded === 2) onReady(); };
  zoneImg.onload = () => { loaded++; if (loaded === 2) onReady(); };
  baseImg.src = v.baseSrc;
  zoneImg.src = v.zoneSrc;
}

// 7. REAL-TIME PHOTOREALISTIC PIXEL SHADER FOR ACTIVE VIEW
function renderPhotorealisticCanvas() {
  const canvas = document.getElementById("building-canvas");
  const cache = viewCache[activeViewId];
  if (!canvas || !cache) return;

  const { width, height, basePixels, zonePixels } = cache;
  const ctx = canvas.getContext("2d");
  const outData = ctx.createImageData(width, height);
  const dst = outData.data;

  if (isBeforeMode) {
    dst.set(basePixels);
    ctx.putImageData(outData, 0, 0);
    return;
  }

  const zoneR = new Uint8Array(17);
  const zoneG = new Uint8Array(17);
  const zoneB = new Uint8Array(17);

  for (let z = 1; z <= 16; z++) {
    const cid = currentAssignments[z] || ZONES[z].defaultColorId;
    const c = COLOR_MAP[cid] || COLOR_MAP[1];
    const rgb = c.rgb || hexToRgb(c.hex);
    zoneR[z] = rgb[0];
    zoneG[z] = rgb[1];
    zoneB[z] = rgb[2];
  }

  const totalBytes = basePixels.length;
  for (let i = 0; i < totalBytes; i += 4) {
    const zid = zonePixels[i];
    const alpha = zonePixels[i + 1];

    if (zid === 0 || zid > 16 || alpha === 0) {
      dst[i] = basePixels[i];
      dst[i + 1] = basePixels[i + 1];
      dst[i + 2] = basePixels[i + 2];
      dst[i + 3] = 255;
    } else {
      const lum = zonePixels[i + 2];
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

// 8. DIRECT PIXEL CLICK & HOVER DETECTION ON CANVAS
function setupCanvasInteraction() {
  const canvas = document.getElementById("building-canvas");
  if (!canvas) return;

  const getZoneAtEvent = (e) => {
    const cache = viewCache[activeViewId];
    if (!cache) return 0;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * cache.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * cache.height);
    if (x < 0 || x >= cache.width || y < 0 || y >= cache.height) return 0;
    const idx = (y * cache.width + x) * 4;
    return cache.zonePixels[idx];
  };

  canvas.addEventListener("click", (e) => {
    const zid = getZoneAtEvent(e);
    if (zid >= 1 && zid <= 16) {
      selectZone(zid);
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    const zid = getZoneAtEvent(e);
    const tooltip = document.getElementById("hover-tooltip");
    if (zid >= 1 && zid <= 16) {
      canvas.style.cursor = "pointer";
      const z = ZONES[zid];
      const cid = currentAssignments[zid];
      const c = COLOR_MAP[cid] || COLOR_MAP[1];
      if (tooltip) {
        tooltip.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full mr-1.5" style="background:${z.pinColor}"></span><b>Zone #${zid} (${z.shortName}):</b> ${c.name} (${c.code})`;
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

// 9. ZONE & COLOR ACTIONS
function selectZone(zid) {
  activeZoneId = zid;
  // Auto-switch to Side View if user selects Zone 13 (Right Side Wall) while in View 1
  if (zid === 13 && activeViewId !== "side") {
    switchCameraView("side");
    return;
  }
  if ((zid === 14 || zid === 15 || zid === 16) && activeViewId === "render") {
    switchCameraView("side");
    return;
  }
  updateUI();
}

function setZoneColor(zid, colorId) {
  if (!COLOR_MAP[colorId] || !ZONES[zid]) return;
  currentAssignments[zid] = colorId;
  // If user paints Zone 6 (Main Louvers) and linkAccentToLouvers is active, sync Zone 7 unless Zone 7 was explicitly targeted
  if (zid === 6 && linkAccentToLouvers) {
    currentAssignments[7] = colorId;
  }
  if (zid === 7 && colorId !== currentAssignments[6]) {
    linkAccentToLouvers = false;
  }
  activeZoneId = zid;
  if (zid === 13 && activeViewId !== "side") {
    switchCameraView("side");
    return;
  }
  if ((zid === 14 || zid === 15 || zid === 16) && activeViewId === "render") {
    switchCameraView("side");
    return;
  }
  saveState();
  updateUI();
}

function applyColorToActiveZone(colorId) {
  setZoneColor(activeZoneId, colorId);
}

function loadCombination(comboId) {
  const combo = COMBINATIONS_GALLERY.find(c => c.id === comboId);
  if (!combo) return;
  currentAssignments = { ...combo.map };
  saveState();
  updateUI();
  document.getElementById("studio-top")?.scrollIntoView({ behavior: "smooth" });
}

function randomizeColors() {
  const mainIds = [1, 2, 3, 4, 5, 6, 7];
  Object.keys(ZONES).forEach(k => {
    const zid = parseInt(k);
    if (zid === 12) return; // keep wood windows natural unless changed
    currentAssignments[zid] = mainIds[Math.floor(Math.random() * mainIds.length)];
  });
  saveState();
  updateUI();
}

// 10. RENDER UI PANELS
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
      <div class="flex items-center gap-2 min-w-0">
        <span class="w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center border flex-shrink-0 shadow-inner ${isLight ? 'text-slate-950 border-black/20' : 'text-white border-white/20'}" style="background-color: ${c.hex};">
          #${c.id}
        </span>
        <div class="min-w-0">
          <div class="text-xs font-bold text-white truncate">${c.name}</div>
          <div class="text-[10px] text-amber-400 font-mono">${c.code} • ${c.hex}</div>
        </div>
      </div>
    `;
    container.appendChild(btn);
  });
}

function renderZoneCards() {
  const container = document.getElementById("components-list");
  if (!container) return;
  container.innerHTML = "";

  let currentGroup = "";

  Object.keys(ZONES).forEach(k => {
    const zid = parseInt(k);
    const z = ZONES[zid];
    const colorId = currentAssignments[zid] || z.defaultColorId;
    const c = COLOR_MAP[colorId] || COLOR_MAP[1];
    const isActive = activeZoneId === zid;

    if (z.group !== currentGroup) {
      currentGroup = z.group;
      const header = document.createElement("div");
      header.className = "text-[11px] font-black uppercase tracking-wider text-amber-400 mt-3 mb-1.5 flex items-center gap-1.5";
      header.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>${currentGroup}`;
      container.appendChild(header);
    }

    const numberPills = Object.keys(COLOR_MAP).map(ck => {
      const cnum = parseInt(ck);
      const col = COLOR_MAP[cnum];
      const isChosen = cnum === colorId;
      return `
        <button 
          onclick="event.stopPropagation(); setZoneColor(${zid}, ${cnum})" 
          title="#${cnum} ${col.name} (${col.code})"
          class="color-num-btn w-6 h-6 rounded-md text-[11px] font-extrabold transition flex items-center justify-center border ${isChosen ? 'ring-2 ring-white scale-110 border-white shadow-lg' : 'border-slate-700 opacity-75 hover:opacity-100'}"
          style="background-color: ${col.hex}; color: ${isLightColor(col.hex) ? '#0f172a' : '#ffffff'};">
          ${cnum}
        </button>
      `;
    }).join("");

    const card = document.createElement("div");
    card.onclick = () => selectZone(zid);
    card.className = `p-3 rounded-xl border transition cursor-pointer mb-2 ${isActive ? 'border-blue-500 bg-blue-950/35 ring-1 ring-blue-500/60 shadow-lg' : 'border-slate-800/90 bg-slate-900/60 hover:bg-slate-900/90'}`;
    card.innerHTML = `
      <div class="flex items-center justify-between gap-2 mb-2">
        <div class="flex items-center gap-2 min-w-0">
          <span class="w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center flex-shrink-0 shadow" style="background-color: ${z.pinColor}">
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
            <div class="text-[10px] text-slate-400 font-mono">${c.code}</div>
          </div>
          <div class="w-6 h-6 rounded-md border border-white/20 shadow-inner" style="background-color: ${c.hex};"></div>
        </div>
      </div>
      <div class="pt-1.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <span class="text-[10px] text-slate-400 uppercase font-bold">Color #:</span>
        <div class="flex items-center gap-1 flex-wrap">
          ${numberPills}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// 11. MOBILE DOCK
function renderMobileDock() {
  const zoneBar = document.getElementById("mobile-zone-tabs");
  const colorBar = document.getElementById("mobile-color-pills");
  if (!zoneBar || !colorBar) return;

  zoneBar.innerHTML = Object.keys(ZONES).map(k => {
    const zid = parseInt(k);
    const z = ZONES[zid];
    const cid = currentAssignments[zid];
    const c = COLOR_MAP[cid] || COLOR_MAP[1];
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

// 12. PINS OVERLAY FOR ACTIVE VIEW
function renderPins() {
  const container = document.getElementById("pins-overlay-container");
  if (!container) return;
  container.innerHTML = "";
  if (!showPins) return;

  Object.keys(ZONES).forEach(k => {
    const zid = parseInt(k);
    const z = ZONES[zid];
    const pt = z.pins[activeViewId];
    if (!pt) return;

    const cid = currentAssignments[zid];
    const c = COLOR_MAP[cid] || COLOR_MAP[1];
    const isActive = zid === activeZoneId;

    const btn = document.createElement("button");
    btn.className = `absolute -translate-x-1/2 -translate-y-1/2 rounded-full text-[10px] font-black flex items-center justify-center shadow-xl transition transform hover:scale-125 z-10 w-6 h-6 border-2 border-white ${isActive ? 'pulse-badge scale-125' : 'opacity-90'}`;
    btn.style.left = pt.x;
    btn.style.top = pt.y;
    btn.style.backgroundColor = c.hex;
    btn.style.color = isLightColor(c.hex) ? '#0f172a' : '#ffffff';
    btn.innerText = zid;
    btn.title = `Zone #${zid} (${z.shortName}): ${c.name} (${c.code})`;
    btn.onclick = (e) => {
      e.stopPropagation();
      selectZone(zid);
    };
    container.appendChild(btn);
  });
}

// 13. ALL-COMBINATIONS GALLERY
function renderCombinationsGallery(filter = activeGalleryFilter) {
  activeGalleryFilter = filter;
  const grid = document.getElementById("combinations-gallery-grid");
  if (!grid) return;
  grid.innerHTML = "";

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
    const cWall = COLOR_MAP[item.map[1]];
    const cFrame = COLOR_MAP[item.map[5]];
    const cLouver = COLOR_MAP[item.map[6]];
    const cBalcony = COLOR_MAP[item.map[8]];

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
            <div>Louvers: <span class="text-slate-200 font-semibold">#${item.map[6]} ${cLouver.name}</span></div>
            <div>Frame: <span class="text-slate-200">#${item.map[5]} ${cFrame.name}</span> • Wall: <span class="text-slate-200">#${item.map[1]} ${cWall.name}</span></div>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
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
    btn.innerText = isBeforeMode ? "✨ Show Colored Render" : "👁️ Compare Original";
  }
  renderPhotorealisticCanvas();
}

function downloadLiveRender() {
  const canvas = document.getElementById("building-canvas");
  if (!canvas) return;
  const link = document.createElement("a");
  link.download = `exterior-paint-${activeViewId}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

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

function executePrompt() {
  const inputEl = document.getElementById("prompt-input");
  const text = inputEl.value.trim().toLowerCase();
  if (!text) return;

  let updated = 0;
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

  const fb = document.getElementById("prompt-feedback");
  if (updated > 0) {
    if (fb) {
      fb.innerText = `✅ Applied ${updated} zone assignments in real time!`;
      fb.className = "text-xs mt-1.5 text-emerald-400 font-semibold";
    }
    saveState();
    updateUI();
  } else if (fb) {
    fb.innerText = "Try typing: 'louvers: 5, frame: 3, wall: 2, box windows: 3, compound: 2, gates: 1'";
    fb.className = "text-xs mt-1.5 text-amber-400";
  }
}

function buildConstructiblePrompt() {
  const getCol = (zid) => COLOR_MAP[currentAssignments[zid]] || COLOR_MAP[1];
  const lines = Object.keys(ZONES).map(k => {
    const zid = parseInt(k);
    const z = ZONES[zid];
    const c = getCol(zid);
    return `${zid}) ${z.name} in ${c.name} (Code ${c.code}, ${c.hex})`;
  });

  const prompt = `Photorealistic 8k architectural exterior photograph of a modern 5-story residential apartment building in bright daylight: ` + lines.join("; ") + `. Crisp architectural shadows, V-Ray global illumination.`;
  const el = document.getElementById("ai-constructible-prompt");
  if (el) el.value = prompt;
  return prompt;
}

function updateActiveBanner() {
  const z = ZONES[activeZoneId];
  const cid = currentAssignments[activeZoneId];
  const c = COLOR_MAP[cid] || COLOR_MAP[1];

  document.getElementById("active-component-zone").innerText = `Zone #${activeZoneId} Active`;
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
      <td class="py-2.5 px-3 font-bold text-white">
        <span class="inline-block w-2.5 h-2.5 rounded-full mr-2" style="background-color: ${z.pinColor};"></span>
        Zone ${zid}: ${z.name}
      </td>
      <td class="py-2.5 px-3 font-mono font-bold text-amber-400">Color #${cid}</td>
      <td class="py-2.5 px-3 flex items-center gap-2">
        <span class="w-4 h-4 rounded border border-white/20 shadow-sm inline-block" style="background-color: ${c.hex};"></span>
        <span class="font-bold text-slate-100">${c.name}</span>
      </td>
      <td class="py-2.5 px-3 font-mono font-bold text-slate-200">${c.code}</td>
      <td class="py-2.5 px-3 font-mono text-slate-400">${c.hex}</td>
      <td class="py-2.5 px-3 text-slate-300">${z.recommendedProduct}</td>
    `;
    tbody.appendChild(tr);
  });
}

function copyFormulation() {
  let spec = "========================================================\n";
  spec += "COMPLETE 16-ZONE ARCHITECTURAL PAINT SCHEDULE\n";
  spec += "========================================================\n\n";
  Object.keys(ZONES).forEach(k => {
    const zid = parseInt(k);
    const z = ZONES[zid];
    const cid = currentAssignments[zid];
    const c = COLOR_MAP[cid] || COLOR_MAP[1];
    spec += `Zone ${String(zid).padEnd(2)} (${z.name.padEnd(44)}) : #${cid} ${c.name} (Code: ${c.code}, ${c.hex})\n`;
  });
  spec += "\nCONSTRUCTIBLE AI PROMPT:\n" + buildConstructiblePrompt();
  navigator.clipboard.writeText(spec).then(() => {
    alert("Copied all 16 Zone Paint Specifications & AI Prompt to clipboard!");
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
  setupCanvasInteraction();
  switchCameraView("render");
  renderCombinationsGallery("all");

  const promptInput = document.getElementById("prompt-input");
  if (promptInput) {
    promptInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") executePrompt();
    });
  }
});
