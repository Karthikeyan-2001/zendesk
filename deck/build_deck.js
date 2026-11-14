/**
 * OpsDesk · VOYAGEHACK 4.0 · Round 1 deck generator
 *
 * Usage:   cd deck && npm install && npm run build
 * Output:  deck/OpsDesk_VoyageHack_Round1.pptx
 * Then:    soffice --headless --convert-to pdf OpsDesk_VoyageHack_Round1.pptx
 *
 * Source of truth for every word on the slides: docs/round1/slide-content.md.
 * If you change copy here, change it there too (and vice versa).
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
  contactK: "Karthikeyan · [email / LinkedIn]",
  contactN: "Nandhini · [email / LinkedIn]",
  outFile: path.join(__dirname, "OpsDesk_VoyageHack_Round1.pptx"),
};

// ---------------------------------------------------------------------------
// 2. DESIGN TOKENS
// ---------------------------------------------------------------------------
const FONT_HEAD = "Calibri"; // Poppins/Montserrat not guaranteed on judges' machines (see docs/DECISIONS.md)
const FONT_BODY = "Calibri";

const COL = {
  navy: "0B1220", // cover / closing background, primary text
  ink: "1E293B", // body text on light
  slate: "475569", // secondary text on light (contrast ~7:1 on off-white)
  mist: "94A3B8", // muted text on navy
  line: "E2E8F0", // hairlines / card borders
  off: "F6F8FB", // content background
  white: "FFFFFF",
  teal: "14B8A6", // primary accent (fills, motif)
  tealDk: "0F766E", // teal for text on light (AA contrast)
  tealTint: "CCFBF1",
  amber: "F59E0B", // urgency / SLA
  amberDk: "92400E",
  amberTint: "FEF3C7",
  coral: "EF4444", // breach / risk
  coralDk: "B91C1C",
  coralTint: "FEE2E2",
  indigo: "6366F1", // innovation
  indigoDk: "4338CA",
  indigoTint: "E0E7FF",
};

const THEME = {
  name: "OpsDesk",
  colors: {
    dk1: COL.navy, lt1: COL.white, dk2: COL.ink, lt2: COL.off,
    accent1: COL.teal, accent2: COL.amber, accent3: COL.coral, accent4: COL.indigo,
    accent5: COL.slate, accent6: COL.tealDk, hlink: COL.indigoDk, folHlink: COL.slate,
  },
};

const W = 13.333;
const H = 7.5;
const M = 0.5; // margin

// Fresh shadow object every time (pptxgenjs mutates options in place).
const shadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 90, color: "0B1220", opacity: 0.1 });

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

pres.defineSlideMaster({
  title: "OPSDESK_DARK",
  background: { color: COL.navy },
  objects: [],
});

pres.defineSlideMaster({
  title: "OPSDESK_CONTENT",
  background: { color: COL.off },
  margin: [0.5, 0.5, 0.5, 0.5],
  objects: [
    {
      placeholder: {
        options: {
          name: "title", type: "title", x: M, y: 0.32, w: 10.6, h: 0.72,
          fontFace: FONT_HEAD, fontSize: 32, bold: true, color: COL.navy, valign: "middle", align: "left", margin: 0,
        },
        text: "",
      },
    },
    {
      text: {
        text: "OpsDesk · VOYAGEHACK 4.0 · Karthikeyan & Nandhini",
        options: { x: M, y: 7.08, w: 8, h: 0.26, fontFace: FONT_BODY, fontSize: 10, color: COL.slate, margin: 0, valign: "middle" },
      },
    },
  ],
  slideNumber: { x: 12.33, y: 7.08, w: 0.5, h: 0.26, fontFace: FONT_BODY, fontSize: 10, color: COL.slate, align: "right" },
});

// ---------------------------------------------------------------------------
// 4. HELPERS
// ---------------------------------------------------------------------------
function text(slide, str, opts) {
  slide.addText(str, { isTextBox: true, fontFace: FONT_BODY, margin: 0, ...opts });
}

/** Rounded white card with soft shadow. */
function card(slide, x, y, w, h, name, fill = COL.white) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { color: COL.line, width: 0.75 },
    shadow: shadow(), objectName: name,
  });
}

/** Theme header pill: icon circle + exact official theme name. */
function themePill(slide, x, y, w, label, tint, dark, accent, icon) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h: 0.4, rectRadius: 0.2, fill: { color: tint }, line: { type: "none" }, objectName: `Theme: ${label}`,
  });
  slide.addShape(pres.ShapeType.ellipse, { x: x + 0.06, y: y + 0.05, w: 0.3, h: 0.3, fill: { color: accent }, line: { type: "none" } });
  icon(slide, x + 0.06, y + 0.05, 0.3);
  text(slide, label.toUpperCase(), {
    x: x + 0.46, y, w: w - 0.5, h: 0.4, fontSize: 13, bold: true, color: dark, charSpacing: 1, valign: "middle",
  });
}

// Tiny vector icons, drawn inside a 0.3in accent circle (no fonts, no images, no logos).
const ICON = {
  target: (s, x, y, d) => {
    s.addShape(pres.ShapeType.ellipse, { x: x + d * 0.22, y: y + d * 0.22, w: d * 0.56, h: d * 0.56, fill: { type: "none" }, line: { color: COL.white, width: 1.25 } });
    s.addShape(pres.ShapeType.ellipse, { x: x + d * 0.4, y: y + d * 0.4, w: d * 0.2, h: d * 0.2, fill: { color: COL.white }, line: { type: "none" } });
  },
  bolt: (s, x, y, d) => s.addShape(pres.ShapeType.lightningBolt, { x: x + d * 0.25, y: y + d * 0.2, w: d * 0.5, h: d * 0.6, fill: { color: COL.white }, line: { type: "none" } }),
  gear: (s, x, y, d) => s.addShape(pres.ShapeType.gear6, { x: x + d * 0.2, y: y + d * 0.2, w: d * 0.6, h: d * 0.6, fill: { color: COL.white }, line: { type: "none" } }),
  warn: (s, x, y, d) => s.addShape(pres.ShapeType.triangle, { x: x + d * 0.22, y: y + d * 0.22, w: d * 0.56, h: d * 0.5, fill: { color: COL.white }, line: { type: "none" } }),
};

/** Recurring motif: a dotted flight-path arc with origin/destination dots. */
function flightPath(slide, x, y, w, h, color, dotA, dotB, transparency = 0) {
  slide.addShape(pres.ShapeType.arc, {
    x, y, w, h, angleRange: [190, 350], line: { color, width: 1.5, dashType: "sysDot", transparency }, objectName: "Motif: flight path",
  });
  // Endpoints sit on the ellipse at 190 and 350 degrees.
  const cx = x + w / 2, cy = y + h / 2, rx = w / 2, ry = h / 2;
  const pt = (deg) => [cx + rx * Math.cos((deg * Math.PI) / 180), cy + ry * Math.sin((deg * Math.PI) / 180)];
  const r = 0.07;
  const [ax, ay] = pt(190);
  const [bx, by] = pt(350);
  slide.addShape(pres.ShapeType.ellipse, { x: ax - r, y: ay - r, w: 2 * r, h: 2 * r, fill: { color: dotA }, line: { type: "none" } });
  slide.addShape(pres.ShapeType.ellipse, { x: bx - r, y: by - r, w: 2 * r, h: 2 * r, fill: { color: dotB }, line: { type: "none" } });
}

function ribbon(slide, str) {
  slide.addShape(pres.ShapeType.roundRect, {
    x: M, y: 6.42, w: W - 2 * M, h: 0.5, rectRadius: 0.1, fill: { color: COL.navy }, line: { type: "none" }, objectName: "Bottom ribbon",
  });
  slide.addShape(pres.ShapeType.ellipse, { x: M + 0.2, y: 6.42 + 0.19, w: 0.12, h: 0.12, fill: { color: COL.teal }, line: { type: "none" } });
  text(slide, str, { x: M + 0.45, y: 6.42, w: W - 2 * M - 0.65, h: 0.5, fontSize: 13, italic: true, color: COL.white, valign: "middle" });
}

// ---------------------------------------------------------------------------
// SLIDE 0: COVER
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide({ masterName: "OPSDESK_DARK" });
  flightPath(s, 9.2, 1.0, 6.4, 6.4, COL.teal, COL.teal, COL.amber, 35);
  flightPath(s, 10.2, 2.6, 4.8, 4.6, COL.indigo, COL.indigo, COL.teal, 55);

  text(s, "VOYAGEHACK 4.0  ·  ROUND 1  ·  IDEA SUBMISSION", {
    x: 0.9, y: 1.25, w: 8, h: 0.35, fontSize: 14, bold: true, color: COL.teal, charSpacing: 2,
  });
  text(s, "OpsDesk", { x: 0.9, y: 1.7, w: 8, h: 1.25, fontFace: FONT_HEAD, fontSize: 80, bold: true, color: COL.white });
  text(s, "Context-rich, travel-aware operations cases for TBO.", {
    x: 0.9, y: 3.0, w: 8.5, h: 0.55, fontSize: 26, color: "E2E8F0",
  });
  text(
    s,
    [
      { text: "Linked by agency and TBOH", options: { color: COL.white } },
      { text: "   ·   ", options: { color: COL.teal } },
      { text: "Routed by reality", options: { color: COL.white } },
      { text: "   ·   ", options: { color: COL.teal } },
      { text: "Escalated on purpose", options: { color: COL.white } },
    ],
    { x: 0.9, y: 3.7, w: 9, h: 0.45, fontSize: 18, bold: true },
  );

  // Meta block
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.9, y: 4.85, w: 6.4, h: 1.5, rectRadius: 0.1, fill: { color: "16213A" }, line: { color: "24314F", width: 0.75 }, objectName: "Meta card",
  });
  text(
    s,
    [
      { text: "Topic: ", options: { color: COL.mist } },
      { text: "Zendesk Automation (OpsDesk for TBO)", options: { color: COL.white, breakLine: true } },
      { text: "Team: ", options: { color: COL.mist } },
      { text: CONFIG.team, options: { color: COL.white, bold: true, breakLine: true } },
      { text: "Members: ", options: { color: COL.mist } },
      { text: "Karthikeyan & Nandhini", options: { color: COL.white, bold: true, breakLine: true } },
      { text: "Date: ", options: { color: COL.mist } },
      { text: CONFIG.date, options: { color: COL.white } },
    ],
    { x: 1.15, y: 4.95, w: 6.0, h: 1.3, fontSize: 15, valign: "middle", paraSpaceAfter: 2 },
  );
}

// ---------------------------------------------------------------------------
// SLIDE 1: THE PROBLEM & OUR IDEA  (Potential Impact + Innovation)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide({ masterName: "OPSDESK_CONTENT" });
  s.addText("From isolated tickets to connected operations", { placeholder: "title" });
  flightPath(s, 10.9, 0.28, 2.6, 1.3, COL.teal, COL.teal, COL.amber, 30);

  // ---- LEFT: POTENTIAL IMPACT --------------------------------------------
  const LX = M, LW = 6.15;
  themePill(s, LX, 1.2, 2.55, "Potential Impact", COL.tealTint, COL.tealDk, COL.teal, ICON.target);
  card(s, LX, 1.72, LW, 3.28, "Before/after card");

  const cNum = LX + 0.15, cLab = LX + 0.52, cToday = LX + 1.85, cArrow = LX + 3.82, cOps = LX + 4.05;
  const wLab = 1.3, wToday = 1.95, wOps = LW - (cOps - LX) - 0.12;
  // header row
  text(s, "PROBLEM", { x: cLab, y: 1.8, w: wLab, h: 0.28, fontSize: 10, bold: true, color: COL.slate, charSpacing: 1, valign: "middle" });
  text(s, "TODAY", { x: cToday, y: 1.8, w: wToday, h: 0.28, fontSize: 10, bold: true, color: COL.coralDk, charSpacing: 1, valign: "middle" });
  text(s, "WITH OPSDESK", { x: cOps, y: 1.8, w: wOps, h: 0.28, fontSize: 10, bold: true, color: COL.tealDk, charSpacing: 1, valign: "middle" });

  const rows = [
    ["Context", "Same refund raised 3x = 3 isolated tickets", "One case graph: agency + TBOH + intent"],
    ["Routing", "Hardcoded FIFO/LIFO, mostly by country", "Scored by region, time, rank, availability"],
    ["Side convos", "Recipients locked to group; break on transfer", "Explicit recipient lists survive transfer"],
    ["SLA & escalation", "One-size SLA; escalate via followers/email", "Check-in/LCD-aware clock + 1-click escalate"],
    ["Insights", "Locked in tickets; AI add-ons cost extra", "Weekly themes, no paid add-on"],
    ["Data & export", "~3K-row export cap; no realtime", "Streamed, uncapped export + scale path"],
  ];
  const rowY0 = 2.1, rowH = 0.48;
  rows.forEach(([lab, today, ops], i) => {
    const y = rowY0 + i * rowH;
    if (i % 2 === 0) {
      s.addShape(pres.ShapeType.rect, { x: LX + 0.08, y, w: LW - 0.16, h: rowH, fill: { color: COL.off }, line: { type: "none" } });
    }
    s.addShape(pres.ShapeType.ellipse, { x: cNum, y: y + 0.1, w: 0.28, h: 0.28, fill: { color: COL.teal }, line: { type: "none" } });
    text(s, String(i + 1), { x: cNum, y: y + 0.1, w: 0.28, h: 0.28, fontSize: 12, bold: true, color: COL.white, align: "center", valign: "middle" });
    text(s, lab, { x: cLab, y, w: wLab, h: rowH, fontSize: 12, bold: true, color: COL.navy, valign: "middle" });
    text(s, today, { x: cToday, y, w: wToday, h: rowH, fontSize: 12, color: COL.slate, valign: "middle" });
    text(s, "→", { x: cArrow, y, w: 0.2, h: rowH, fontSize: 14, bold: true, color: COL.teal, align: "center", valign: "middle" });
    text(s, ops, { x: cOps, y, w: wOps, h: rowH, fontSize: 12, bold: true, color: COL.ink, valign: "middle" });
  });

  // Impact strip: targets (no invented numbers)
  text(s, "TARGETS WE WILL MEASURE IN THE PROTOTYPE", {
    x: LX, y: 5.12, w: LW, h: 0.26, fontSize: 10, bold: true, color: COL.tealDk, charSpacing: 1, valign: "middle",
  });
  const targets = [
    "Repeat contacts linked",
    "Time to correct owner",
    "SLA risk seen before LCD",
    "Exports beyond the 3K cap",
    "Zero per-add-on fees",
    "Every decision explained",
  ];
  const tw = (LW - 0.2) / 3;
  targets.forEach((t, i) => {
    const x = LX + (i % 3) * (tw + 0.1);
    const y = 5.43 + Math.floor(i / 3) * 0.44;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: tw, h: 0.36, rectRadius: 0.18, fill: { color: COL.white }, line: { color: COL.teal, width: 1 }, objectName: `Target ${i + 1}`,
    });
    text(s, t, { x, y, w: tw, h: 0.36, fontSize: 12, color: COL.navy, align: "center", valign: "middle" });
  });

  // ---- RIGHT: INNOVATION ---------------------------------------------------
  const RX = 6.95, RW = W - M - RX; // 5.883
  themePill(s, RX, 1.2, 2.05, "Innovation", COL.indigoTint, COL.indigoDk, COL.indigo, ICON.bolt);
  const cards = [
    { p: "Solves P1", t: "Case graph, not tickets", b: "Agency + TBOH + intent linkage is first-class, with full history in one view. It replaces the separate third-party TBOH app.", a: COL.indigo },
    { p: "Solves P4", t: "Travel-aware SLA clock", b: "Priority plus check-in/LCD proximity, with an optional regional-calendar flag, drives at-risk and breached. Not a generic timer.", a: COL.amber },
    { p: "Solves P2 · P4", t: "Explainable routing + direct escalation", b: "Scores region, time, rank and availability, and stores “why routed”. One click escalates to the Escalation Manager.", a: COL.indigo },
    { p: "Solves P3 · P5", t: "Transfer-proof threads + insight loop", b: "Side-conversation recipients survive reassignment. Conversations roll up into weekly themes without a paid AI add-on.", a: COL.indigo },
  ];
  const cw = (RW - 0.2) / 2, ch = 2.24;
  cards.forEach((c, i) => {
    const x = RX + (i % 2) * (cw + 0.2);
    const y = 1.72 + Math.floor(i / 2) * (ch + 0.18);
    card(s, x, y, cw, ch, `Innovation card ${i + 1}`);
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.2, y: y + 0.2, w: 0.38, h: 0.38, fill: { color: c.a }, line: { type: "none" } });
    text(s, String(i + 1), { x: x + 0.2, y: y + 0.2, w: 0.38, h: 0.38, fontSize: 14, bold: true, color: COL.white, align: "center", valign: "middle" });
    text(s, c.t, { x: x + 0.7, y: y + 0.14, w: cw - 0.85, h: 0.52, fontFace: FONT_HEAD, fontSize: 14, bold: true, color: COL.navy, valign: "middle" });
    text(s, c.b, { x: x + 0.2, y: y + 0.76, w: cw - 0.4, h: ch - 1.2, fontSize: 12, color: COL.ink, valign: "top", lineSpacingMultiple: 1.05 });
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.2, y: y + ch - 0.42, w: 1.3, h: 0.28, rectRadius: 0.14, fill: { color: COL.indigoTint }, line: { type: "none" } });
    text(s, c.p, { x: x + 0.2, y: y + ch - 0.42, w: 1.3, h: 0.28, fontSize: 10, bold: true, color: COL.indigoDk, align: "center", valign: "middle" });
  });

  ribbon(s, "OpsDesk replaces isolated tickets with context-rich, travel-aware operations cases: linked by agency and TBOH, routed by reality, escalated on purpose.");
  s.addNotes("Slide 1 carries two official themes: Potential Impact (left) and Innovation (right). Impact items are targets to be measured in the Round 2 prototype; no figures are claimed.");
}

// ---------------------------------------------------------------------------
// SLIDE 2: HOW WE BUILD & SHIP IT  (Implementation and Technical Feasibility + Adoption Risk/Feasibility)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide({ masterName: "OPSDESK_CONTENT" });
  s.addText("Built to ship in weeks, safe to adopt", { placeholder: "title" });
  flightPath(s, 10.9, 0.28, 2.6, 1.3, COL.teal, COL.teal, COL.amber, 30);

  // ---- LEFT: IMPLEMENTATION AND TECHNICAL FEASIBILITY ----------------------
  const LX = M, LW = 7.0;
  themePill(s, LX, 1.2, 5.0, "Implementation and Technical Feasibility", COL.tealTint, COL.tealDk, COL.teal, ICON.gear);

  // Architecture diagram (native shapes; source: docs/round1/architecture.mmd)
  const top = 1.75, dh = 2.42;
  card(s, LX, top, LW, dh, "Architecture card");
  const pad = 0.15;
  const c1x = LX + pad, c1w = 1.5;
  const c2x = c1x + c1w + 0.22, c2w = 1.15;
  const c3x = c2x + c2w + 0.22, c3w = 1.6;
  const c4x = c3x + c3w + 0.22, c4w = LX + LW - pad - c4x;
  const iy = top + 0.15, ih = dh - 0.3;

  const box = (x, y, w, h, title, sub, fill, stroke, dark, dash) => {
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w, h, rectRadius: 0.06, fill: { color: fill }, line: { color: stroke, width: 1, dashType: dash || "solid" }, objectName: `Arch: ${title}`,
    });
    text(
      s,
      [
        { text: title, options: { bold: true, color: dark, breakLine: !!sub } },
        ...(sub ? [{ text: sub, options: { color: COL.ink } }] : []),
      ],
      { x: x + 0.06, y, w: w - 0.12, h, fontSize: 12, align: "center", valign: "middle" },
    );
  };
  const arrow = (x1, y1, x2, y2, color = COL.slate) =>
    s.addShape(pres.ShapeType.line, { x: x1, y: y1, w: x2 - x1, h: y2 - y1, line: { color, width: 1.25, endArrowType: "triangle" } });

  // col 1: web app + simulated TBO systems (mock boundary)
  const b1h = 0.95;
  box(c1x, iy, c1w, b1h, "Web app", "Angular · role-based views", COL.tealTint, COL.teal, COL.tealDk);
  box(c1x, iy + ih - b1h, c1w, b1h, "Simulated TBO", "agencies · TBOH · calendars (seed/mock)", COL.amberTint, COL.amber, COL.amberDk, "dash");
  // col 2: API
  box(c2x, iy, c2w, ih, "REST API", "auth\nrole checks\nvalidation", COL.white, COL.navy, COL.navy);
  arrow(c1x + c1w, iy + b1h / 2, c2x, iy + b1h / 2);
  arrow(c1x + c1w, iy + ih - b1h / 2, c2x, iy + ih - b1h / 2, COL.amber);
  // col 3: domain services
  s.addShape(pres.ShapeType.roundRect, {
    x: c3x, y: iy, w: c3w, h: ih, rectRadius: 0.06, fill: { color: COL.indigoTint }, line: { color: COL.indigo, width: 1 }, objectName: "Arch: services",
  });
  text(s, "Services", { x: c3x, y: iy + 0.03, w: c3w, h: 0.28, fontSize: 12, bold: true, color: COL.indigoDk, align: "center", valign: "middle" });
  const svcs = ["Linkage", "Routing engine", "SLA engine", "Side-conversations", "Insights", "Export"];
  const sh = 0.24, sg = 0.055;
  svcs.forEach((n, i) => {
    const y = iy + 0.34 + i * (sh + sg);
    s.addShape(pres.ShapeType.roundRect, { x: c3x + 0.1, y, w: c3w - 0.2, h: sh, rectRadius: 0.05, fill: { color: COL.white }, line: { type: "none" } });
    text(s, n, { x: c3x + 0.1, y, w: c3w - 0.2, h: sh, fontSize: 12, color: COL.navy, align: "center", valign: "middle" });
  });
  arrow(c2x + c2w, iy + ih / 2, c3x, iy + ih / 2);
  // col 4: data path
  const d4h = (ih - 0.2) / 3;
  box(c4x, iy, c4w, d4h, "PostgreSQL", "cases · links · audit", COL.white, COL.navy, COL.navy);
  box(c4x, iy + d4h + 0.1, c4w, d4h, "Outbox events", "→ realtime WS / poll", COL.white, COL.navy, COL.navy);
  box(c4x, iy + 2 * (d4h + 0.1), c4w, d4h, "Streamed export", "→ replica, warehouse", COL.tealTint, COL.teal, COL.tealDk);
  arrow(c3x + c3w, iy + d4h / 2, c4x, iy + d4h / 2);
  arrow(c3x + c3w, iy + ih - d4h / 2, c4x, iy + ih - d4h / 2);

  // Stack line
  text(
    s,
    [
      { text: "Stack: ", options: { bold: true, color: COL.navy } },
      { text: "Angular · NestJS (Node.js) · PostgreSQL: one TypeScript stack for two builders.", options: { color: COL.ink } },
    ],
    { x: LX, y: 4.25, w: LW, h: 0.3, fontSize: 12, valign: "middle" },
  );

  // MVP -> Problem map
  const mvps = [
    ["MVP-1 · P1", "Linkage"], ["MVP-2 · P2", "Routing"], ["MVP-3 · P3", "Side convos"], ["MVP-4 · P4", "SLA"],
    ["MVP-5 · P5", "Insights"], ["MVP-6 · P6", "Data export"], ["MVP-7 · all", "Roles"],
  ];
  const mg = 0.07, mw = (LW - 6 * mg) / 7;
  mvps.forEach(([a, b], i) => {
    const x = LX + i * (mw + mg);
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.58, w: mw, h: 0.56, rectRadius: 0.06, fill: { color: COL.white }, line: { color: COL.line, width: 0.75 }, objectName: `MVP map ${i + 1}` });
    text(s, [{ text: a, options: { bold: true, color: COL.tealDk, breakLine: true } }, { text: b, options: { color: COL.ink } }], {
      x, y: 4.58, w: mw, h: 0.56, fontSize: 12, align: "center", valign: "middle",
    });
  });

  // 3-phase mini-timeline
  const phases = [
    ["Round 1", "Idea + plan"],
    ["Round 2", "Working slice A–E"],
    ["Finale", "Polish + live demo"],
  ];
  const pw = [1.95, 2.55, 2.6];
  let px = LX;
  phases.forEach(([a, b], i) => {
    s.addShape(pres.ShapeType.chevron, {
      x: px, y: 5.24, w: pw[i], h: 0.4, fill: { color: i === 1 ? COL.teal : COL.navy }, line: { type: "none" }, objectName: `Phase ${i + 1}`,
    });
    text(s, [{ text: a + ": ", options: { bold: true } }, { text: b }], {
      x: px + (i ? 0.3 : 0.12), y: 5.24, w: pw[i] - (i ? 0.48 : 0.3), h: 0.4, fontSize: 12, color: COL.white, align: "center", valign: "middle",
    });
    px += pw[i] - 0.05;
  });

  // Team of 2 strip
  s.addShape(pres.ShapeType.roundRect, {
    x: LX, y: 5.74, w: LW, h: 0.58, rectRadius: 0.08, fill: { color: COL.white }, line: { color: COL.line, width: 0.75 }, objectName: "Team strip",
  });
  text(
    s,
    [
      { text: "Team of 2:  ", options: { bold: true, color: COL.tealDk } },
      { text: "Karthikeyan ", options: { bold: true, color: COL.navy } },
      { text: "frontend & architecture  ·  ", options: { color: COL.ink } },
      { text: "Nandhini ", options: { bold: true, color: COL.navy } },
      { text: "backend, rules engines & data", options: { color: COL.ink, breakLine: true } },
      { text: "Two builders, one focused vertical slice.", options: { italic: true, color: COL.slate } },
    ],
    { x: LX + 0.15, y: 5.74, w: LW - 0.3, h: 0.58, fontSize: 12, valign: "middle" },
  );

  // ---- RIGHT: ADOPTION RISK/FEASIBILITY ------------------------------------
  const RX = 7.8, RW = W - M - RX; // 5.033
  themePill(s, RX, 1.2, 3.35, "Adoption Risk/Feasibility", COL.coralTint, COL.coralDk, COL.coral, ICON.warn);

  const hdr = (t) => ({ text: t, options: { bold: true, color: COL.white, fill: { color: COL.navy }, fontSize: 11 } });
  const lvl = (t, c) => ({ text: t, options: { bold: true, color: c, align: "center" } });
  const risks = [
    ["Data migration from Zendesk", lvl("Med", COL.amberDk), "CSV/API import, then dual-run"],
    ["Agent change fatigue", lvl("High", COL.coralDk), "Familiar queues, keyboard-first UI, guided link suggestions"],
    ["Routing mistrust", lvl("Med", COL.amberDk), "Visible “why routed”, manual override, audit log"],
    ["SLA misconfiguration", lvl("Med", COL.amberDk), "Versioned rule config + simulation view"],
    ["Scale limits", lvl("Low", COL.tealDk), "Streamed export; replica / CDC path documented"],
    ["Security & data leaks", lvl("Low", COL.tealDk), "Role-based access, per-agency isolation, no hardcoded secrets"],
  ];
  const rowsT = [
    [hdr("Risk"), { ...hdr("Likelihood*"), options: { ...hdr("").options, align: "center" } }, hdr("Mitigation")],
    ...risks.map((r, i) => {
      const fill = { color: i % 2 === 0 ? COL.white : COL.off };
      return [
        { text: r[0], options: { bold: true, color: COL.navy, fill } },
        { text: r[1].text, options: { ...r[1].options, fill } },
        { text: r[2], options: { color: COL.ink, fill } },
      ];
    }),
  ];
  s.addTable(rowsT, {
    x: RX, y: 1.75, w: RW, colW: [1.55, 0.95, RW - 2.5], rowH: [0.3, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46],
    fontFace: FONT_BODY, fontSize: 12, valign: "middle", margin: [0.03, 0.08, 0.03, 0.08],
    border: { type: "solid", pt: 0.75, color: COL.line }, objectName: "Risk table",
  });
  text(s, "*Our estimate before the pilot; re-rated with prototype evidence.", {
    x: RX, y: 4.86, w: RW, h: 0.24, fontSize: 10, italic: true, color: COL.slate, valign: "middle",
  });

  // Low-risk rollout strip
  text(s, "LOW-RISK ROLLOUT", { x: RX, y: 5.18, w: RW, h: 0.26, fontSize: 10, bold: true, color: COL.coralDk, charSpacing: 1, valign: "middle" });
  const steps = [["1", "Pilot one region / queue"], ["2", "Shadow-run beside Zendesk"], ["3", "Expand queue by queue"]];
  const sw = (RW - 0.2) / 3;
  steps.forEach(([n, t], i) => {
    const x = RX + i * (sw + 0.1);
    card(s, x, 5.48, sw, 0.8, `Rollout ${n}`);
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.1, y: 5.48 + 0.25, w: 0.3, h: 0.3, fill: { color: COL.coral }, line: { type: "none" } });
    text(s, n, { x: x + 0.1, y: 5.48 + 0.25, w: 0.3, h: 0.3, fontSize: 12, bold: true, color: COL.white, align: "center", valign: "middle" });
    text(s, t, { x: x + 0.47, y: 5.48, w: sw - 0.55, h: 0.8, fontSize: 12, bold: true, color: COL.navy, valign: "middle" });
  });

  ribbon(s, "Cost contrast: own a single data path vs paying per add-on / per TPS API.");
  s.addNotes("Slide 2 carries two official themes: Implementation and Technical Feasibility (left) and Adoption Risk/Feasibility (right). TBO systems are simulated with seed data in the hackathon build.");
}

// ---------------------------------------------------------------------------
// SLIDE 3: THANK YOU
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide({ masterName: "OPSDESK_DARK" });
  flightPath(s, 9.2, 1.0, 6.4, 6.4, COL.teal, COL.teal, COL.amber, 35);
  text(s, "Thank you", { x: 0.9, y: 1.5, w: 8, h: 1.2, fontFace: FONT_HEAD, fontSize: 66, bold: true, color: COL.white });
  text(
    s,
    "OpsDesk replaces isolated tickets with context-rich, travel-aware operations cases: linked by agency and TBOH, routed by reality, escalated on purpose.",
    { x: 0.9, y: 2.8, w: 8.2, h: 1.0, fontSize: 20, italic: true, color: "E2E8F0", lineSpacingMultiple: 1.1 },
  );
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.9, y: 4.25, w: 6.4, h: 1.25, rectRadius: 0.1, fill: { color: "16213A" }, line: { color: "24314F", width: 0.75 }, objectName: "Contacts card",
  });
  text(
    s,
    [
      { text: `Team ${CONFIG.team}`, options: { bold: true, color: COL.teal, breakLine: true } },
      { text: CONFIG.contactK, options: { color: COL.white, breakLine: true } },
      { text: CONFIG.contactN, options: { color: COL.white } },
    ],
    { x: 1.15, y: 4.3, w: 6.0, h: 1.15, fontSize: 16, valign: "middle", paraSpaceAfter: 3 },
  );
  text(
    s,
    [
      { text: "What’s next: ", options: { bold: true, color: COL.amber } },
      { text: "a working prototype in Round 2.", options: { color: COL.white } },
    ],
    { x: 0.9, y: 5.8, w: 8, h: 0.45, fontSize: 18 },
  );
}

// ---------------------------------------------------------------------------
// WRITE + APPLY THEME COLOURS
// ---------------------------------------------------------------------------
async function applyThemeColors(file, theme) {
  const JSZip = require(require.resolve("jszip", { paths: [require.resolve("pptxgenjs")] }));
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const p = "ppt/theme/theme1.xml";
  let xml = await zip.file(p).async("string");
  const slot = (k, v) => (k === "dk1" || k === "lt1"
    ? `<a:${k}><a:srgbClr val="${v}"/></a:${k}>`
    : `<a:${k}><a:srgbClr val="${v}"/></a:${k}>`);
  const order = ["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"];
  const scheme = `<a:clrScheme name="${theme.name}">${order.map((k) => slot(k, theme.colors[k])).join("")}</a:clrScheme>`;
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
