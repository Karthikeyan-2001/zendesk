# OpsDesk for TBO · VOYAGEHACK 4.0

> *OpsDesk replaces isolated tickets with context-rich, travel-aware operations cases: linked by agency and TBOH, routed by reality, escalated on purpose.*

**Team 404 Error · Karthikeyan & Nandhini** · Topic: **Zendesk Automation** (problem statement: OpsDesk for TBO)

## Status

| Round | Deliverable | Status |
|---|---|---|
| **1 · Idea** | 4-slide deck (Cover + 2 content + Thank You), PDF + PPTX | ✅ Built: [`deck/OpsDesk_VoyageHack_Round1.pdf`](deck/OpsDesk_VoyageHack_Round1.pdf) |
| | Video (MP4, 1:40) | ✅ Recorded and compiled with `video/compose_video.py` (slides + face-cam bottom right). The MP4 is kept out of git |
| **2 · Prototype** | GitHub repo with working slice (Journeys A–E), docs, explainer video | ⏳ Planned: [`docs/ROADMAP.md`](docs/ROADMAP.md) |
| **3 · Grand Finale** | Live 3–5 min demo + jury Q&A | ⏳ Planned: [`docs/ROADMAP.md#5-grand-finale-plan`](docs/ROADMAP.md#5-grand-finale-plan) |

## The idea in one table

| Problem today | OpsDesk |
|---|---|
| Same refund raised 3× = 3 isolated tickets | Case graph linked by agency + TBOH + intent |
| Hardcoded FIFO/LIFO routing by country | Scored routing (region, time, rank, availability) with a stored "why routed" |
| Side conversations break on transfer | Explicit recipient lists that survive transfer |
| One-size SLA, escalation via email | Check-in/LCD-aware SLA clock + one-click escalation |
| Insights locked, AI add-ons cost extra | Weekly theme insights, no paid add-on |
| ~3K-row export cap, no realtime | Streamed, uncapped export + documented scale path |

## Repo layout

```
├─ README.md                  this file
├─ docs/
│  ├─ ROADMAP.md              Round 1 → 2 → Finale plan, traceability, epics, risks, DoD
│  ├─ DECISIONS.md            decisions log (stack, fonts, intent approach…)
│  ├─ ASSUMPTIONS.md          demo login, simulated data, rules-before-ML, single tenant
│  └─ round1/
│     ├─ slide-content.md     final copy for all 4 slides (source of truth)
│     ├─ video-script.md      timed 2-speaker script, single-narrator variant, 60 s cut, shot list
│     ├─ wordcount.py         word count + read-time for the script
│     ├─ architecture.mmd     Mermaid source for the Slide 2 architecture
│     └─ qa-checklist.md      pre-submission checklist
├─ deck/
│  ├─ build_deck.js           generates the PPTX (pptxgenjs)
│  ├─ render.sh               build → PDF (LibreOffice) → PNGs for visual QA
│  ├─ render_diagram.js       architecture.mmd → assets/architecture.{svg,png}
│  ├─ make_background.py      draws assets/bg-hex.png
│  ├─ OpsDesk_VoyageHack_Round1.pptx
│  └─ OpsDesk_VoyageHack_Round1.pdf
├─ video/
│  └─ compose_video.py        slides + face-cam picture-in-picture → video/out/*.mp4 (not committed)
└─ assets/                    bg-hex.png (deck background), architecture.svg / .png (our own work only)
```

## Rebuild the deck

Requires Node 18+, Python 3 + Pillow (background), LibreOffice (`soffice`), Poppler (`pdftoppm`) and the **Ubuntu Condensed** font installed (titles; free on Google Fonts). Body text is Arial.

```bash
cd deck && npm install
```

```bash
./deck/render.sh
```

This writes the PPTX, the PDF and `deck/qa/slide-N.png` for visual checks. Edit copy in `docs/round1/slide-content.md` and `deck/build_deck.js` together. `python3 deck/make_background.py` regenerates `assets/bg-hex.png`.

Visual theme: royal-navy "circuit" look after the SlidesCarnival *IT Software Pitch Deck* template, redrawn from scratch (see `docs/DECISIONS.md` D-013).

## Planned stack (Round 2, proposed)

Angular (web) · NestJS / Node.js (API) · PostgreSQL (durable store) · Playwright (e2e) · GitHub Actions (CI). One TypeScript stack for two builders. See [`docs/DECISIONS.md`](docs/DECISIONS.md).
