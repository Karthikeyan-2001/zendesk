/**
 * Renders docs/round1/architecture.mmd to assets/architecture.svg and assets/architecture.png
 * using Mermaid in headless Chromium (Playwright).
 *
 * Usage: MERMAID_JS=/path/to/mermaid.min.js node deck/render_diagram.js
 *   (get mermaid.min.js with `npm i mermaid@11` anywhere; defaults to ./node_modules/mermaid/dist/mermaid.min.js)
 * If Playwright is not installed, paste the .mmd into https://mermaid.live and export instead.
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "docs/round1/architecture.mmd"), "utf8");
const mermaidJs = process.env.MERMAID_JS || path.join(__dirname, "node_modules/mermaid/dist/mermaid.min.js");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setContent(`<html><body style="margin:0;background:#F6F8FB;font-family:Calibri,Carlito,Arial"><div id="d"></div></body></html>`);
  await page.addScriptTag({ path: mermaidJs });
  const svg = await page.evaluate(async (code) => {
    // eslint-disable-next-line no-undef
    mermaid.initialize({ startOnLoad: false, theme: "base", themeVariables: { fontFamily: "Calibri, Carlito, Arial", primaryColor: "#FFFFFF", lineColor: "#475569" } });
    // eslint-disable-next-line no-undef
    const { svg } = await mermaid.render("arch", code);
    document.getElementById("d").innerHTML = svg;
    return svg;
  }, src);
  fs.writeFileSync(path.join(root, "assets/architecture.svg"), svg);
  const el = await page.$("#d svg");
  await el.screenshot({ path: path.join(root, "assets/architecture.png") });
  await browser.close();
  console.log("Wrote assets/architecture.svg and assets/architecture.png");
})();
