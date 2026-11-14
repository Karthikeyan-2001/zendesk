# Decisions log

Running log of choices and why. Newest at the bottom. "Proposed" = made on the team's behalf, needs a quick confirm.

| ID | Date | Decision | Why | Status |
|---|---|---|---|---|
| D-001 | 2026-11-14 | Deck = **Cover + 2 content slides + Thank You** (4 slides). Slide 1 carries Potential Impact + Innovation; Slide 2 carries Implementation and Technical Feasibility + Adoption Risk/Feasibility. | Brief: "2-slide PPT excluding cover and Thank You"; competition page lists four themes. Labels use the exact official names. | Decided (by K) |
| D-002 | 2026-11-14 | Stack proposal: **Angular + NestJS (Node.js) + PostgreSQL**, TypeScript end to end. Ionic not used. | One language for two builders; K's Angular strength; NestJS gives modules, DTO validation and guards for role checks; PostgreSQL gives durable relational storage, cursors for streamed export and a clear replica/CDC scale path. | **Proposed: confirm** |
| D-003 | 2026-11-14 | Role split: K = frontend + architecture + demo/video; N = backend/data + rules engines + tests/CI. | Matches stated backgrounds; clean ownership per epic for individual finalist questions. | **Proposed: confirm** |
| D-004 | 2026-11-14 | Intent detection = **rules + taxonomy first**; TF-IDF + logistic regression is a documented upgrade behind the same interface. | Explainable, testable, zero training data, no paid AI add-on. Matches "rules before ML" strategy. | Decided |
| D-005 | 2026-11-14 | No invented numbers. Impact is shown as **targets we will measure** in the prototype; risk likelihoods are labelled as our estimate. | Hackathon rule of thumb + our own "no fabricated claims" rule. | Decided |
| D-006 | 2026-11-14 | Font: **Calibri** for headings (bold) and body, not Poppins/Montserrat. | Poppins/Montserrat are not installed in the build environment and are not guaranteed on judges' machines; a missing font would reflow the PPTX. Calibri ships with Office, renders metric-identically via Carlito in our LibreOffice QA, and is embedded in the PDF. Swap `FONT_HEAD` in `deck/build_deck.js` if you install Poppins and accept the risk. | Decided |
| D-007 | 2026-11-14 | Deck built **from a script** (`deck/build_deck.js`, pptxgenjs) with all text native/editable; the architecture diagram is redrawn as native shapes (Mermaid source kept in `docs/round1/architecture.mmd`, PNG/SVG export in `assets/`). | Repeatable edits; crisp diagram at any zoom; text stays searchable/editable. | Decided |
| D-008 | 2026-11-14 | No TBO or Zendesk logos; text names only. Icons are simple vector shapes; motif = dotted flight-path arc. | Rights + brief instructions. | Decided |
| D-009 | 2026-11-14 | Repo root **is** the project (`voyagehack-opsdesk/` layout applied at the root of this `zendesk` repo). | Avoids a redundant nested folder; same structure. Rename the GitHub repo to `voyagehack-opsdesk` if you prefer. | Proposed |
| D-010 | 2026-11-14 | Video: two speakers, ~405 words (~2:54 at 140 wpm), plus single-narrator variant and 60 s cut. | Target 3:00, cap 4:00; Unstop's length/size limit not confirmed. | Decided |
| D-011 | 2026-11-14 | Round 2 realtime = polling first, WebSocket as stretch. | Cheapest reliable path for 2 builders; honest to state in demo. | Proposed |
| D-012 | 2026-11-14 | Placeholders left: Round 1 deadline, Round 2/Finale dates, contact details on Thank You slide. | Not provided yet. | Open |
