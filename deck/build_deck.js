/**
 * OpsDesk · VOYAGEHACK 4.0 · Round 1 deck generator
 *
 * Usage:   cd deck && npm install && npm run build      (or ./deck/render.sh for PPTX + PDF + PNGs)
 * Output:  deck/OpsDesk_VoyageHack_Round1.pptx
 *
 * Source of truth for every word on the slides: docs/round1/slide-content.md.
 * If you change copy here, change it there too (and vice versa).
 *
 * Visual theme: royal-navy "circuit" look inspired by the SlidesCarnival "IT Software Pitch Deck"
 * template (hex-pattern background, periwinkle circuit lines with dot nodes, Ubuntu Condensed titles,
 * rounded periwinkle badges). Everything here is redrawn from scratch: no template images or photos are copied.
 *
 * Layout: 16:9 wide (13.333 x 7.5 in). 4 slides: Cover, 2 content slides, Thank You.
 */
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

// ---------------------------------------------------------------------------
// 1. CONFIG: edit these before the final export
// ---------------------------------------------------------------------------
const CONFIG = {
  team: "404 Error",
  members: "Karthikeyan & Nandhini",
  date: "November 2026",
  // Fill these in before submitting (they appear on the Thank You slide).
  contacts: [
    { name: "Karthikeyan J", email: "karthikeyan18122001@gmail.com", linkedin: "https://in.linkedin.com/in/karthikeyanj1" },
    { name: "Nandhini M", email: "nandhini00308@gmail.com", linkedin: "https://www.linkedin.com/in/nandhini-m-de/" },
  ],
  outFile: path.join(__dirname, "OpsDesk_VoyageHack_Round1.pptx"),
  background: path.join(__dirname, "..", "assets", "bg-hex.png"),
};

// ---------------------------------------------------------------------------
// 2. DESIGN TOKENS (sampled from the template's palette)
// ---------------------------------------------------------------------------
const FONT_HEAD = "Ubuntu Condensed"; // template title font (free, Ubuntu Font Licence). See docs/DECISIONS.md D-006.
const FONT_BODY = "Arial"; // template body font; safe on every machine

const COL = {
  bg: "07346F", // royal navy field (background image base)
  panel: "0A3E80", // card / box fill
  panelAlt: "083770", // zebra rows
  chip: "0F4C9C", // inner chips
  rule: "1E4FA8", // hairlines on dark
  peri: "5271FF", // template periwinkle: lines, borders, dots
  periFill: "4361EE", // periwinkle for fills under white text (better contrast)
  white: "FFFFFF",
  soft: "C9D3FF", // secondary text on navy
  amber: "FBBF24", // SLA / urgency (text + borders on dark)
  coral: "F87171", // risk / breach
  mint: "5EEAD4", // positive / low risk
};

const THEME = {
  name: "OpsDesk Circuit",
  colors: {
    dk1: "000000", lt1: COL.white, dk2: COL.bg, lt2: COL.soft,
    accent1: COL.peri, accent2: COL.amber, accent3: COL.coral, accent4: COL.mint,
    accent5: COL.periFill, accent6: COL.panel, hlink: COL.soft, folHlink: COL.soft,
  },
};

const W = 13.333;
const M = 0.5;

// Fresh shadow object every time (pptxgenjs mutates options in place).
const shadow = () => ({ type: "outer", blur: 8, offset: 2, angle: 90, color: "000000", opacity: 0.25 });

// ---------------------------------------------------------------------------
// 3. PRESENTATION + LAYOUTS
// ---------------------------------------------------------------------------
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Karthikeyan, Nandhini (Team 404 Error)";
pres.company = "Team 404 Error";
pres.title = "OpsDesk: VOYAGEHACK 4.0 Round 1";
pres.subject = "OpsDesk for TBO (Zendesk Automation)";
pres.theme = { headFontFace: FONT_HEAD, bodyFontFace: FONT_BODY };

const bg = { path: CONFIG.background };

pres.defineSlideMaster({ title: "OPSDESK_HERO", background: bg, objects: [] });

pres.defineSlideMaster({
  title: "OPSDESK_CONTENT",
  background: bg,
  margin: [0.5, 0.5, 0.5, 0.5],
  objects: [
    {
      placeholder: {
        options: {
          name: "title", type: "title", x: M, y: 0.3, w: W - 2 * M, h: 0.72,
          fontFace: FONT_HEAD, fontSize: 38, color: COL.white, valign: "middle", align: "center", margin: 0,
        },
        text: "",
      },
    },
    {
      text: {
        text: "OpsDesk · VOYAGEHACK 4.0 · Karthikeyan & Nandhini",
        options: { x: M, y: 6.98, w: 8, h: 0.24, fontFace: FONT_BODY, fontSize: 10, color: COL.soft, margin: 0, valign: "middle" },
      },
    },
  ],
  slideNumber: { x: 12.2, y: 6.98, w: 0.5, h: 0.24, fontFace: FONT_BODY, fontSize: 10, color: COL.soft, align: "right" },
});

// ---------------------------------------------------------------------------
// 4. HELPERS
// ---------------------------------------------------------------------------
function text(slide, str, opts) {
  slide.addText(str, { isTextBox: true, fontFace: FONT_BODY, margin: 0, color: COL.white, ...opts });
}

/** Straight segment between two points (any direction). */
function seg(slide, x1, y1, x2, y2, color = COL.peri, width = 1.5, extra = {}) {
  slide.addShape(pres.ShapeType.line, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipH: (x2 < x1) !== (y2 < y1), line: { color, width, ...extra },
  });
}

function dot(slide, x, y, r = 0.07, color = COL.peri) {
  slide.addShape(pres.ShapeType.ellipse, { x: x - r, y: y - r, w: 2 * r, h: 2 * r, fill: { color }, line: { type: "none" } });
}

/**
 * Template motif: circuit bracket. A horizontal and a vertical line meeting at a corner,
 * with dot nodes at the corner, along the run and at both ends.
 */
function bracket(slide, cx, cy, hx, vy) {
  seg(slide, cx, cy, hx, cy);
  seg(slide, cx, cy, cx, vy);
  dot(slide, cx, cy);
  dot(slide, hx, cy);
  dot(slide, cx, vy);
  dot(slide, cx + (hx - cx) * 0.22, cy, 0.06);
  dot(slide, cx, cy + (vy - cy) * 0.6, 0.06);
}

/** Card: navy panel with periwinkle rounded border (the template's photo-frame look). */
function card(slide, x, y, w, h, name, opts = {}) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: opts.r ?? 0.1, fill: { color: opts.fill || COL.panel },
    line: { color: opts.line || COL.peri, width: opts.lw ?? 1.25, dashType: opts.dash || "solid" },
    shadow: opts.noShadow ? undefined : shadow(), objectName: name,
  });
}

/** Rounded-square number badge (template's "1 2 3" tiles). */
function badge(slide, x, y, d, label, fill = COL.periFill, color = COL.white, size = 14) {
  slide.addShape(pres.ShapeType.roundRect, { x, y, w: d, h: d, rectRadius: d * 0.22, fill: { color: fill }, line: { type: "none" } });
  text(slide, label, { x, y, w: d, h: d, fontSize: size, bold: true, color, align: "center", valign: "middle" });
}

/** Theme header pill: periwinkle pill (template's "Presentation" pill) + icon + exact official theme name. */
function themePill(slide, x, y, w, label, icon) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h: 0.4, rectRadius: 0.2, fill: { color: COL.periFill }, line: { type: "none" }, objectName: `Theme: ${label}`,
  });
  slide.addShape(pres.ShapeType.ellipse, { x: x + 0.06, y: y + 0.05, w: 0.3, h: 0.3, fill: { color: COL.white }, line: { type: "none" } });
  icon(slide, x + 0.06, y + 0.05, 0.3);
  text(slide, label.toUpperCase(), { x: x + 0.46, y, w: w - 0.5, h: 0.4, fontSize: 13, bold: true, charSpacing: 1, valign: "middle" });
}

// Tiny vector icons (periwinkle on the white circle): no fonts, images or logos.
const ICON = {
  target: (s, x, y, d) => {
    s.addShape(pres.ShapeType.ellipse, { x: x + d * 0.2, y: y + d * 0.2, w: d * 0.6, h: d * 0.6, fill: { type: "none" }, line: { color: COL.periFill, width: 1.5 } });
    s.addShape(pres.ShapeType.ellipse, { x: x + d * 0.39, y: y + d * 0.39, w: d * 0.22, h: d * 0.22, fill: { color: COL.periFill }, line: { type: "none" } });
  },
  bolt: (s, x, y, d) => s.addShape(pres.ShapeType.lightningBolt, { x: x + d * 0.25, y: y + d * 0.18, w: d * 0.5, h: d * 0.64, fill: { color: COL.periFill }, line: { type: "none" } }),
  gear: (s, x, y, d) => s.addShape(pres.ShapeType.gear6, { x: x + d * 0.17, y: y + d * 0.17, w: d * 0.66, h: d * 0.66, fill: { color: COL.periFill }, line: { type: "none" } }),
  warn: (s, x, y, d) => s.addShape(pres.ShapeType.triangle, { x: x + d * 0.2, y: y + d * 0.2, w: d * 0.6, h: d * 0.52, fill: { color: COL.periFill }, line: { type: "none" } }),
};

function ribbon(slide, str) {
  slide.addShape(pres.ShapeType.roundRect, {
    x: M, y: 6.4, w: W - 2 * M, h: 0.48, rectRadius: 0.1, fill: { color: COL.periFill }, line: { type: "none" }, objectName: "Bottom ribbon",
  });
  dot(slide, M + 0.26, 6.64, 0.06, COL.white);
  text(slide, str, { x: M + 0.45, y: 6.4, w: W - 2 * M - 0.6, h: 0.48, fontSize: 13, italic: true, valign: "middle" });
}

/** Content-slide frame: top-left and bottom-right circuit brackets. */
function contentFrame(slide) {
  bracket(slide, 0.25, 0.25, 3.4, 1.35);
  bracket(slide, W - 0.25, 7.27, W - 3.4, 6.05);
}

/** Hero illustration (cover + closing): a mini "case graph" inside a periwinkle frame. */
function caseGraph(slide, fx, fy, fw, fh) {
  card(slide, fx, fy, fw, fh, "Case graph frame", { lw: 3, r: 0.25, fill: COL.panel });
  const cx = fx + fw / 2, cy = fy + fh / 2;
  const sw = 1.7, sh = 0.62;
  const sats = [
    { x: fx + 0.3, y: fy + 0.5, t: "Agency", line: COL.peri },
    { x: fx + fw - 0.3 - sw, y: fy + 0.5, t: "TBOH", line: COL.peri },
    { x: fx + 0.3, y: fy + fh - 0.5 - sh, t: "Intent", line: COL.peri },
    { x: fx + fw - 0.3 - sw, y: fy + fh - 0.5 - sh, t: "SLA clock", line: COL.amber },
  ];
  sats.forEach((s) => seg(slide, s.x + sw / 2, s.y + sh / 2, cx, cy, COL.peri, 1.5, { dashType: "sysDot" }));
  // centre node
  slide.addShape(pres.ShapeType.ellipse, { x: cx - 0.85, y: cy - 0.55, w: 1.7, h: 1.1, fill: { color: COL.periFill }, line: { color: COL.white, width: 2 }, objectName: "Case node" });
  text(slide, "Case", { x: cx - 0.85, y: cy - 0.55, w: 1.7, h: 1.1, fontFace: FONT_HEAD, fontSize: 30, align: "center", valign: "middle" });
  sats.forEach((s) => {
    slide.addShape(pres.ShapeType.roundRect, { x: s.x, y: s.y, w: sw, h: sh, rectRadius: 0.12, fill: { color: COL.chip }, line: { color: s.line, width: 1.5 }, objectName: `Node ${s.t}` });
    text(slide, s.t, { x: s.x, y: s.y, w: sw, h: sh, fontSize: 16, bold: true, align: "center", valign: "middle", color: s.line === COL.amber ? COL.amber : COL.white });
  });
  // "why routed" tag between top nodes
  slide.addShape(pres.ShapeType.roundRect, { x: cx - 1.05, y: fy + fh / 2 + 0.8, w: 2.1, h: 0.38, rectRadius: 0.19, fill: { color: COL.bg }, line: { color: COL.peri, width: 1 } });
  text(slide, "why routed: shown", { x: cx - 1.05, y: fy + fh / 2 + 0.8, w: 2.1, h: 0.38, fontSize: 12, color: COL.soft, align: "center", valign: "middle" });
}

/** Template-style circuit traces entering from the left edge (cover + closing). */
function edgeTraces(slide, y) {
  seg(slide, 0, y, 1.6, y); dot(slide, 1.6, y); dot(slide, 0.9, y, 0.06);
  seg(slide, 0, y + 0.22, 1.1, y + 0.22); dot(slide, 1.1, y + 0.22);
  seg(slide, 0, y + 0.44, 2.2, y + 0.44); dot(slide, 2.2, y + 0.44);
}

// ---------------------------------------------------------------------------
// SLIDE 0: COVER
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide({ masterName: "OPSDESK_HERO" });
  bracket(s, 0.3, 0.3, 4.2, 1.2);
  edgeTraces(s, 6.75);
  caseGraph(s, 8.2, 1.05, 4.6, 5.1);
  bracket(s, W - 0.3, 7.2, W - 2.6, 6.55);

  s.addShape(pres.ShapeType.roundRect, { x: 0.9, y: 0.95, w: 4.1, h: 0.42, rectRadius: 0.21, fill: { color: COL.periFill }, line: { type: "none" }, objectName: "Event pill" });
  text(s, "VOYAGEHACK 4.0  ·  ROUND 1", { x: 0.9, y: 0.95, w: 4.1, h: 0.42, fontSize: 14, bold: true, charSpacing: 2, align: "center", valign: "middle" });
  text(s, "OpsDesk", { x: 0.9, y: 1.45, w: 7, h: 1.35, fontFace: FONT_HEAD, fontSize: 96 });
  text(s, "Context-rich, travel-aware operations cases for TBO.", { x: 0.9, y: 2.85, w: 7.2, h: 0.85, fontSize: 21, color: COL.soft });

  // tagline as a circuit trace: three nodes on a vertical line
  const tags = ["Linked by agency and TBOH", "Routed by reality", "Escalated on purpose"];
  seg(s, 1.0, 3.98, 1.0, 4.98);
  tags.forEach((t, i) => {
    const y = 3.98 + i * 0.5;
    dot(s, 1.0, y, 0.08);
    text(s, t, { x: 1.3, y: y - 0.2, w: 6, h: 0.4, fontSize: 18, bold: true, valign: "middle" });
  });

  card(s, 0.9, 5.35, 6.6, 1.25, "Meta card", { lw: 1 });
  text(
    s,
    [
      { text: "Topic: ", options: { color: COL.soft } },
      { text: "Zendesk Automation (OpsDesk for TBO)", options: { breakLine: true } },
      { text: "Team: ", options: { color: COL.soft } },
      { text: CONFIG.team, options: { bold: true } },
      { text: "   ·   Date: ", options: { color: COL.soft } },
      { text: CONFIG.date, options: { breakLine: true } },
      { text: "Members: ", options: { color: COL.soft } },
      { text: "Karthikeyan J & Nandhini M", options: { bold: true } },
    ],
    { x: 1.15, y: 5.4, w: 6.2, h: 1.15, fontSize: 15, valign: "middle", paraSpaceAfter: 3 },
  );
}

// ---------------------------------------------------------------------------
// SLIDE 1: THE PROBLEM & OUR IDEA  (Potential Impact + Innovation)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide({ masterName: "OPSDESK_CONTENT" });
  contentFrame(s);
  s.addText("From isolated tickets to connected operations", { placeholder: "title" });

  // ---- LEFT: POTENTIAL IMPACT --------------------------------------------
  const LX = M, LW = 6.15;
  themePill(s, LX, 1.2, 2.65, "Potential Impact", ICON.target);
  const rowY0 = 2.1, rowH = 0.46;
  card(s, LX, 1.72, LW, 0.38 + 6 * rowH + 0.1, "Before/after card");

  const cNum = LX + 0.14, cLab = LX + 0.52, cToday = LX + 1.6, cArrow = LX + 3.55, cOps = LX + 3.8;
  const wLab = 1.05, wToday = 1.92, wOps = LW - (cOps - LX) - 0.12;
  text(s, "PROBLEM", { x: cLab, y: 1.8, w: wLab, h: 0.28, fontSize: 10, bold: true, color: COL.soft, charSpacing: 1, valign: "middle" });
  text(s, "TODAY", { x: cToday, y: 1.8, w: wToday, h: 0.28, fontSize: 10, bold: true, color: COL.coral, charSpacing: 1, valign: "middle" });
  text(s, "WITH OPSDESK", { x: cOps, y: 1.8, w: wOps, h: 0.28, fontSize: 10, bold: true, color: COL.mint, charSpacing: 1, valign: "middle" });

  const rows = [
    ["Context", "Same refund 3x = 3 isolated tickets", "Case graph: agency + TBOH + intent"],
    ["Routing", "Hardcoded FIFO/LIFO, mostly by country", "Scored: region, time, rank, availability"],
    ["Side convos", "Tied to group; break on transfer", "Recipient lists survive transfer"],
    ["SLA", "One-size SLA; escalate via email", "LCD-aware clock + 1-click escalate"],
    ["Insights", "Locked in tickets; AI add-ons cost extra", "Weekly themes, no paid add-on"],
    ["Data", "~3K-row export cap; no realtime", "Streamed, uncapped export + scale path"],
  ];
  rows.forEach(([lab, today, ops], i) => {
    const y = rowY0 + i * rowH;
    if (i % 2 === 0) s.addShape(pres.ShapeType.rect, { x: LX + 0.06, y, w: LW - 0.12, h: rowH, fill: { color: COL.panelAlt }, line: { type: "none" } });
    badge(s, cNum, y + 0.09, 0.28, String(i + 1), COL.periFill, COL.white, 12);
    text(s, lab, { x: cLab, y, w: wLab, h: rowH, fontSize: 12, bold: true, valign: "middle" });
    text(s, today, { x: cToday, y, w: wToday, h: rowH, fontSize: 12, color: COL.soft, valign: "middle" });
    text(s, "→", { x: cArrow, y, w: 0.22, h: rowH, fontSize: 18, bold: true, color: COL.peri, align: "center", valign: "middle" });
    text(s, ops, { x: cOps, y, w: wOps, h: rowH, fontSize: 12, bold: true, valign: "middle" });
  });

  // Impact strip: targets (no invented numbers)
  text(s, "TARGETS WE WILL MEASURE IN THE PROTOTYPE", { x: LX, y: 5.0, w: LW, h: 0.26, fontSize: 10, bold: true, color: COL.mint, charSpacing: 1, valign: "middle" });
  const targets = [
    "Repeat contacts linked", "Time to correct owner",
    "SLA risk seen before LCD", "Exports beyond the 3K cap",
    "Zero per-add-on fees", "Every decision explained",
  ];
  const tw = (LW - 0.15) / 2;
  targets.forEach((t, i) => {
    const x = LX + (i % 2) * (tw + 0.15);
    const y = 5.3 + Math.floor(i / 2) * 0.36;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: tw, h: 0.3, rectRadius: 0.15, fill: { color: COL.panel }, line: { color: COL.peri, width: 1 }, objectName: `Target ${i + 1}` });
    dot(s, x + 0.17, y + 0.15, 0.05, COL.mint);
    text(s, t, { x: x + 0.32, y, w: tw - 0.4, h: 0.3, fontSize: 12, valign: "middle" });
  });

  // ---- RIGHT: INNOVATION ---------------------------------------------------
  const RX = 6.95, RW = W - M - RX;
  themePill(s, RX, 1.2, 2.1, "Innovation", ICON.bolt);
  const cards = [
    { p: "Solves P1", t: "Case graph, not tickets", b: "Agency + TBOH + intent linkage is first-class, with full history in one view. It replaces the separate third-party TBOH app.", a: COL.periFill },
    { p: "Solves P4", t: "Travel-aware SLA clock", b: "Priority plus check-in/LCD proximity, with an optional regional-calendar flag, drives at-risk and breached.", a: "D97706" },
    { p: "Solves P2 · P4", t: "Explainable routing + escalation", b: "Scores region, time, rank and availability, and stores “why routed”. One click escalates to the Escalation Manager.", a: COL.periFill },
    { p: "Solves P3 · P5", t: "Transfer-proof threads + insights", b: "Side-conversation recipients survive reassignment. Conversations roll up into weekly themes without a paid AI add-on.", a: COL.periFill },
  ];
  const cw = (RW - 0.2) / 2, ch = 2.24;
  cards.forEach((c, i) => {
    const x = RX + (i % 2) * (cw + 0.2);
    const y = 1.72 + Math.floor(i / 2) * (ch + 0.18);
    card(s, x, y, cw, ch, `Innovation card ${i + 1}`);
    badge(s, x + 0.18, y + 0.2, 0.42, String(i + 1), c.a, COL.white, 16);
    text(s, c.t, { x: x + 0.72, y: y + 0.12, w: cw - 0.85, h: 0.6, fontFace: FONT_HEAD, fontSize: 17, valign: "middle" });
    text(s, c.b, { x: x + 0.18, y: y + 0.78, w: cw - 0.34, h: ch - 1.2, fontSize: 12, color: COL.soft, valign: "top" });
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.18, y: y + ch - 0.4, w: 1.35, h: 0.26, rectRadius: 0.13, fill: { color: COL.bg }, line: { color: COL.peri, width: 0.75 } });
    text(s, c.p, { x: x + 0.18, y: y + ch - 0.4, w: 1.35, h: 0.26, fontSize: 10, bold: true, color: COL.soft, align: "center", valign: "middle" });
  });

  ribbon(s, "OpsDesk: context-rich, travel-aware operations cases, linked by agency and TBOH, routed by reality, escalated on purpose.");
  s.addNotes("Slide 1 carries two official themes: Potential Impact (left) and Innovation (right). Impact items are targets to be measured in the Round 2 prototype; no figures are claimed.");
}

// ---------------------------------------------------------------------------
// SLIDE 2: HOW WE BUILD & SHIP IT  (Implementation and Technical Feasibility + Adoption Risk/Feasibility)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide({ masterName: "OPSDESK_CONTENT" });
  contentFrame(s);
  s.addText("Built to ship in weeks, safe to adopt", { placeholder: "title" });

  // ---- LEFT: IMPLEMENTATION AND TECHNICAL FEASIBILITY ----------------------
  const LX = M, LW = 7.0;
  themePill(s, LX, 1.2, 6.2, "Implementation and Technical Feasibility", ICON.gear);

  // Architecture diagram (native shapes; source: docs/round1/architecture.mmd)
  const top = 1.72, dh = 2.42;
  card(s, LX, top, LW, dh, "Architecture card");
  const pad = 0.15;
  const c1x = LX + pad, c1w = 1.5;
  const c2x = c1x + c1w + 0.22, c2w = 1.15;
  const c3x = c2x + c2w + 0.22, c3w = 1.6;
  const c4x = c3x + c3w + 0.22, c4w = LX + LW - pad - c4x;
  const iy = top + 0.15, ih = dh - 0.3;

  const box = (x, y, w, h, title, sub, opts = {}) => {
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w, h, rectRadius: 0.06, fill: { color: opts.fill || COL.chip }, line: { color: opts.line || COL.peri, width: 1, dashType: opts.dash || "solid" }, objectName: `Arch: ${title}`,
    });
    text(
      s,
      [
        { text: title, options: { bold: true, color: opts.titleColor || COL.white, breakLine: !!sub } },
        ...(sub ? [{ text: sub, options: { color: COL.soft } }] : []),
      ],
      { x: x + 0.05, y, w: w - 0.1, h, fontSize: 12, align: "center", valign: "middle" },
    );
  };
  const arrow = (x1, y1, x2, y2, color = COL.soft) =>
    s.addShape(pres.ShapeType.line, { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color, width: 1.25, endArrowType: "triangle" } });

  const b1h = 0.95;
  box(c1x, iy, c1w, b1h, "Web app", "Angular, role-based views");
  box(c1x, iy + ih - b1h, c1w, b1h, "Simulated TBO", "agencies, TBOH, calendars", { line: COL.amber, dash: "dash", titleColor: COL.amber, fill: COL.panel });
  box(c2x, iy, c2w, ih, "REST API", "auth\nrole checks\nvalidation");
  arrow(c1x + c1w, iy + b1h / 2, c2x, iy + b1h / 2);
  arrow(c1x + c1w, iy + ih - b1h / 2, c2x, iy + ih - b1h / 2, COL.amber);

  s.addShape(pres.ShapeType.roundRect, { x: c3x, y: iy, w: c3w, h: ih, rectRadius: 0.06, fill: { color: COL.bg }, line: { color: COL.peri, width: 1 }, objectName: "Arch: services" });
  text(s, "Services", { x: c3x, y: iy + 0.03, w: c3w, h: 0.28, fontSize: 12, bold: true, align: "center", valign: "middle" });
  const svcs = ["Linkage", "Routing engine", "SLA engine", "Side convos", "Insights", "Export"];
  const sh = 0.24, sg = 0.055;
  svcs.forEach((n, i) => {
    const y = iy + 0.34 + i * (sh + sg);
    s.addShape(pres.ShapeType.roundRect, { x: c3x + 0.1, y, w: c3w - 0.2, h: sh, rectRadius: 0.05, fill: { color: COL.periFill }, line: { type: "none" } });
    text(s, n, { x: c3x + 0.1, y, w: c3w - 0.2, h: sh, fontSize: 12, align: "center", valign: "middle" });
  });
  arrow(c2x + c2w, iy + ih / 2, c3x, iy + ih / 2);

  const d4h = (ih - 0.2) / 3;
  box(c4x, iy, c4w, d4h, "PostgreSQL", "cases · links · audit");
  box(c4x, iy + d4h + 0.1, c4w, d4h, "Outbox events", "→ realtime WS / poll");
  box(c4x, iy + 2 * (d4h + 0.1), c4w, d4h, "Streamed export", "→ replica, warehouse", { line: COL.mint, titleColor: COL.mint });
  arrow(c3x + c3w, iy + d4h / 2, c4x, iy + d4h / 2);
  arrow(c3x + c3w, iy + ih - d4h / 2, c4x, iy + ih - d4h / 2);

  text(
    s,
    [
      { text: "Stack: ", options: { bold: true } },
      { text: "Angular · NestJS · PostgreSQL: one TypeScript stack for two builders.", options: { color: COL.soft } },
    ],
    { x: LX, y: 4.2, w: LW, h: 0.3, fontSize: 12, valign: "middle" },
  );

  // MVP map: MVP-n solves Problem n (MVP-7 covers all)
  const mvps = [["MVP-1", "Linkage"], ["MVP-2", "Routing"], ["MVP-3", "Threads"], ["MVP-4", "SLA"], ["MVP-5", "Insights"], ["MVP-6", "Export"], ["MVP-7", "Roles"]];
  const mg = 0.05, mw = (LW - 6 * mg) / 7;
  mvps.forEach(([a, b], i) => {
    const x = LX + i * (mw + mg);
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.55, w: mw, h: 0.56, rectRadius: 0.08, fill: { color: COL.panel }, line: { color: COL.peri, width: 0.75 }, objectName: `MVP map ${i + 1}` });
    text(s, [{ text: a, options: { bold: true, color: COL.mint, breakLine: true } }, { text: b }], { x, y: 4.55, w: mw, h: 0.56, fontSize: 12, align: "center", valign: "middle" });
  });
  text(s, "MVP-n solves Problem n · MVP-7 secures all six", { x: LX, y: 5.12, w: LW, h: 0.22, fontSize: 10, italic: true, color: COL.soft, valign: "middle" });

  // 3-phase mini-timeline
  const phases = [["Round 1", "Idea + plan"], ["Round 2", "Journeys A–E"], ["Finale", "Polish + live demo"]];
  const pw = [1.95, 2.55, 2.6];
  let px = LX;
  phases.forEach(([a, b], i) => {
    s.addShape(pres.ShapeType.chevron, { x: px, y: 5.38, w: pw[i], h: 0.38, fill: { color: i === 1 ? COL.periFill : COL.chip }, line: { color: COL.peri, width: 0.75 }, objectName: `Phase ${i + 1}` });
    text(s, [{ text: a + ": ", options: { bold: true } }, { text: b }], { x: px + (i ? 0.3 : 0.12), y: 5.38, w: pw[i] - (i ? 0.48 : 0.3), h: 0.38, fontSize: 12, align: "center", valign: "middle" });
    px += pw[i] - 0.05;
  });

  // Team of 2 strip
  card(s, LX, 5.82, LW, 0.5, "Team strip", { lw: 0.75, noShadow: true });
  text(
    s,
    [
      { text: "Team of 2: ", options: { bold: true, color: COL.mint } },
      { text: "Karthikeyan ", options: { bold: true } },
      { text: "frontend & architecture · ", options: { color: COL.soft } },
      { text: "Nandhini ", options: { bold: true } },
      { text: "backend, rules & data", options: { color: COL.soft, breakLine: true } },
      { text: "Two builders, one focused vertical slice.", options: { italic: true, color: COL.soft } },
    ],
    { x: LX + 0.15, y: 5.82, w: LW - 0.3, h: 0.5, fontSize: 12, valign: "middle" },
  );

  // ---- RIGHT: ADOPTION RISK/FEASIBILITY ------------------------------------
  const RX = 7.75, RW = W - M - RX;
  themePill(s, RX, 1.2, 3.55, "Adoption Risk/Feasibility", ICON.warn);

  const hdr = (t, align = "left") => ({ text: t, options: { bold: true, color: COL.white, fill: { color: COL.periFill }, fontSize: 11, align } });
  const lvl = (t, c) => ({ text: t, options: { bold: true, color: c, align: "center" } });
  const risks = [
    ["Data migration from Zendesk", lvl("Med", COL.amber), "CSV/API import, dual-run"],
    ["Agent change fatigue", lvl("High", COL.coral), "Familiar queues, keyboard-first, guided links"],
    ["Routing mistrust", lvl("Med", COL.amber), "Visible “why routed”, override, audit log"],
    ["SLA misconfiguration", lvl("Med", COL.amber), "Versioned rules + simulation view"],
    ["Scale limits", lvl("Low", COL.mint), "Streamed export; replica / CDC path"],
    ["Security & data leaks", lvl("Low", COL.mint), "Role-based access, agency isolation, env secrets"],
  ];
  const rowsT = [
    [hdr("Risk"), hdr("Likelihood*", "center"), hdr("Mitigation")],
    ...risks.map((r, i) => {
      const fill = { color: i % 2 === 0 ? COL.panel : COL.panelAlt };
      return [
        { text: r[0], options: { bold: true, color: COL.white, fill } },
        { text: r[1].text, options: { ...r[1].options, fill } },
        { text: r[2], options: { color: COL.soft, fill } },
      ];
    }),
  ];
  s.addTable(rowsT, {
    x: RX, y: 1.72, w: RW, colW: [1.6, 1.1, RW - 2.7], rowH: [0.3, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46],
    fontFace: FONT_BODY, fontSize: 12, valign: "middle", margin: [0.03, 0.08, 0.03, 0.08],
    border: { type: "solid", pt: 0.75, color: COL.rule }, objectName: "Risk table",
  });
  text(s, "*Our estimate before the pilot; re-rated with prototype evidence.", { x: RX, y: 4.83, w: RW, h: 0.24, fontSize: 10, italic: true, color: COL.soft, valign: "middle" });

  text(s, "LOW-RISK ROLLOUT", { x: RX, y: 5.15, w: RW, h: 0.26, fontSize: 10, bold: true, color: COL.mint, charSpacing: 1, valign: "middle" });
  const steps = [["1", "Pilot one region / queue"], ["2", "Shadow-run beside Zendesk"], ["3", "Expand queue by queue"]];
  const sw = (RW - 0.2) / 3;
  steps.forEach(([n, t], i) => {
    const x = RX + i * (sw + 0.1);
    card(s, x, 5.45, sw, 0.85, `Rollout ${n}`);
    badge(s, x + 0.1, 5.45 + 0.27, 0.32, n, COL.periFill, COL.white, 12);
    text(s, t, { x: x + 0.5, y: 5.45, w: sw - 0.58, h: 0.85, fontSize: 12, bold: true, valign: "middle" });
  });

  ribbon(s, "Cost contrast: own a single data path vs paying per add-on / per TPS API.");
  s.addNotes("Slide 2 carries two official themes: Implementation and Technical Feasibility (left) and Adoption Risk/Feasibility (right). TBO systems are simulated with seed data in the hackathon build.");
}

// ---------------------------------------------------------------------------
// SLIDE 3: THANK YOU
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide({ masterName: "OPSDESK_HERO" });
  bracket(s, 0.3, 0.3, 4.2, 1.2);
  edgeTraces(s, 6.75);
  caseGraph(s, 8.2, 1.05, 4.6, 5.1);
  bracket(s, W - 0.3, 7.2, W - 2.6, 6.55);

  text(s, "Thank you!", { x: 0.9, y: 1.2, w: 7, h: 1.3, fontFace: FONT_HEAD, fontSize: 80 });
  text(
    s,
    "OpsDesk replaces isolated tickets with context-rich, travel-aware operations cases: linked by agency and TBOH, routed by reality, escalated on purpose.",
    { x: 0.9, y: 2.6, w: 6.9, h: 1.3, fontSize: 19, italic: true, color: COL.soft, lineSpacingMultiple: 1.1 },
  );
  card(s, 0.9, 4.0, 6.6, 1.42, "Contacts card", { lw: 1 });
  text(s, `Team ${CONFIG.team}`, { x: 1.15, y: 4.08, w: 6.1, h: 0.34, fontSize: 15, bold: true, color: COL.mint, valign: "middle" });
  const shortUrl = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  CONFIG.contacts.forEach((c, i) => {
    const x = 1.15 + i * 3.2;
    text(
      s,
      [
        { text: c.name, options: { bold: true, fontSize: 15, breakLine: true } },
        { text: c.email, options: { color: COL.soft, hyperlink: { url: `mailto:${c.email}` }, breakLine: true } },
        { text: shortUrl(c.linkedin), options: { color: COL.soft, hyperlink: { url: c.linkedin } } },
      ],
      { x, y: 4.45, w: 3.1, h: 1.1, fontSize: 12, valign: "top", paraSpaceAfter: 4 },
    );
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.9, y: 5.7, w: 6.6, h: 0.5, rectRadius: 0.25, fill: { color: COL.periFill }, line: { type: "none" }, objectName: "Next pill" });
  text(s, [{ text: "What’s next: ", options: { bold: true } }, { text: "a working prototype in Round 2." }], { x: 0.9, y: 5.7, w: 6.6, h: 0.5, fontSize: 17, align: "center", valign: "middle" });
}

// ---------------------------------------------------------------------------
// WRITE + APPLY THEME COLOURS
// ---------------------------------------------------------------------------
async function applyThemeColors(file, theme) {
  const JSZip = require(require.resolve("jszip", { paths: [require.resolve("pptxgenjs")] }));
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const p = "ppt/theme/theme1.xml";
  let xml = await zip.file(p).async("string");
  const order = ["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"];
  const scheme = `<a:clrScheme name="${theme.name}">${order.map((k) => `<a:${k}><a:srgbClr val="${theme.colors[k]}"/></a:${k}>`).join("")}</a:clrScheme>`;
  xml = xml.replace(/<a:clrScheme[\s\S]*?<\/a:clrScheme>/, scheme);
  zip.file(p, xml);
  for (const k of Object.keys(zip.files)) if (zip.files[k].dir) delete zip.files[k];
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

(async () => {
  await pres.writeFile({ fileName: CONFIG.outFile });
  await applyThemeColors(CONFIG.outFile, THEME);
  console.log("Wrote", CONFIG.outFile);
})();
