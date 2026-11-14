# OpsDesk roadmap: Round 1 → Round 2 → Grand Finale

**Team 404 Error · Karthikeyan & Nandhini · VOYAGEHACK 4.0 · Topic: Zendesk Automation (OpsDesk for TBO)**

> **Principle: the Round 1 deck is a contract.** Every claim on Slide 1 and Slide 2 must become a working, demonstrable feature in Round 2. The traceability table below is the checklist; if a claim cannot be delivered, we change the claim in our Round 2 docs and say so in the demo.

Owner codes: **K** = Karthikeyan (frontend + architecture + demo), **N** = Nandhini (backend/data + rules engines + tests). Proposed split; confirm or swap.

---

## 1. Timeline (edit the dates)

Round 1 deadline is not yet filled in. Everything below is planned **backwards** from it. Round 2 and Finale dates are TBD on Unstop: replace `TBD` when announced.

| Milestone | Date | Owner | Status |
|---|---|---|---|
| **Round 1 deadline** | `<fill in>` | K | ☐ |
| Deck copy frozen (slide-content.md) | deadline − 5 days | K + N | ☑ draft ready |
| Contacts filled on Thank You slide, deck rebuilt | deadline − 4 days | K | ☑ |
| Video rehearsal ×2 with stopwatch | deadline − 3 days | K + N | ☐ |
| Video recorded + edited + exported (MP4) | deadline − 2 days | K (edit), N (own lines) | ☐ |
| Final QA (docs/round1/qa-checklist.md) | deadline − 1 day | N | ☐ |
| **Upload PDF/PPTX + MP4 on Unstop** | deadline − 1 day (buffer) | K | ☐ |
| Round 1 results | `TBD` | | |
| Round 2 build window starts (Foundation) | results + 0 days (start early: Foundation can begin before results) | K + N | ☐ |
| Round 2: Journeys A–D working end to end | Round 2 deadline − 7 days | K + N | ☐ |
| Round 2: Journey E + hardening + docs | Round 2 deadline − 3 days | K + N | ☐ |
| Round 2: explainer video recorded | Round 2 deadline − 2 days | K | ☐ |
| **Round 2 deadline** (GitHub repo + explainer video) | `TBD` | K | ☐ |
| Grand Finale (live jury demo) | `TBD` | K + N | ☐ |

**Suggested Round 2 build pace (if we get ~3 weeks):** Week 1 = Foundation + MVP-1 + MVP-2 · Week 2 = MVP-3 + MVP-4 + MVP-5/6 · Week 3 = MVP-7 hardening, tests, docs, video. If the window is shorter, cut stretch first, then Journey E's realtime piece (keep the export).

---

## 2. Traceability: claim on slide → MVP → epic → test → demo journey

| # | Claim on slide | MVP | Epic | Test(s) | Demo journey |
|---|---|---|---|---|---|
| C1 | "One case graph: agency + TBOH + intent" (S1 table row 1, Innovation card 1) | MVP-1 | E1 Linkage | unit: link rules (same TBOH, same agency+intent within N days); e2e: create 3rd refund ticket → auto-linked to previous 2 | **A** |
| C2 | "Replaces the separate third-party TBOH app" (card 1) | MVP-1 | E1 Linkage | e2e: search by TBOH shows all linked cases in one view | **A** |
| C3 | Intent taxonomy with auto-suggest (rules first) | MVP-1 | E1 Linkage | unit: keyword/rule → intent suggestions with confidence + reason | **A** |
| C4 | "Scored by region, time, rank, availability" (row 2, card 3) | MVP-2 | E2 Routing | unit: scoring per factor; config change alters result; tie-breaks | **B** |
| C5 | Stored "why routed" reason; "Every decision explained" | MVP-2 / MVP-4 | E2, E4 | unit: every assignment/SLA/escalation writes `audit_events.reason`; e2e: reason visible on timeline | **B, D** |
| C6 | Manual override + audit log (risk table) | MVP-2 | E2 Routing | e2e: agent reassigns → override reason captured + audit event | **B** |
| C7 | Views: triage, my queue, by region, by intent, linked-case | MVP-2 | E2 Routing | e2e: each view renders correct filtered set for role | **B** |
| C8 | "Explicit recipient lists survive transfer" (row 3, card 4) | MVP-3 | E3 Side convos | unit: transfer keeps `side_conversation_recipients`; e2e: transfer ticket, supplier thread intact | **C** |
| C9 | Internal note vs external reply clearly separated | MVP-3 | E3 Side convos | unit: visibility rules; e2e: requester never sees internal notes | **C** |
| C10 | "Check-in/LCD-aware clock" + optional regional calendar (row 4, card 2) | MVP-4 | E4 SLA | unit: SLA due = f(priority, check-in/LCD proximity, calendar flag); boundary tests | **D** |
| C11 | At-risk / breached badges; "SLA risk seen before LCD" | MVP-4 | E4 SLA | unit: state transitions; e2e: seeded at-risk ticket shows amber badge, breached shows coral | **D** |
| C12 | "1-click escalate" to Escalation Manager, changes owner/queue, on timeline | MVP-4 | E4 Escalation | e2e: escalate → owner = Escalation Mgr, queue = Escalation, timeline event | **D** |
| C13 | "Weekly themes, no paid add-on" (row 5, card 4) | MVP-5 | E5 Insights | unit: theme tagger; e2e: Insights page shows top themes + sample tickets for the week | **E** |
| C14 | "Streamed, uncapped export"; "Exports beyond the 3K cap" (row 6) | MVP-6 | E6 Data | integration: export 50,000+ generated rows as CSV/JSON stream, memory stays flat; e2e download | **E** |
| C15 | Documented scale path: replica / CDC / warehouse; realtime WS/poll | MVP-6 | E6 Data | doc review; optional e2e: second browser updates via polling/WebSocket | **E** |
| C16 | Role-based access, per-agency isolation, no hardcoded secrets (risk table) | MVP-7 | E7 Hardening | integration: Requester of agency X cannot read agency Y (API 403/404); secrets from env only; lint for secrets | all |
| C17 | Versioned rule config + simulation view (SLA misconfig mitigation) | MVP-4 | E4 SLA | unit: rule config has version; simulation endpoint returns "what would change" | **D** |
| C18 | CSV/API import, then dual-run (migration mitigation) | MVP-6 | E6 Data | integration: import a Zendesk-style CSV into tickets/agencies | (Q&A) |
| C19 | Durable storage for tickets, links, comments, side conversations | Foundation | E0 | migrations + restart test: data survives restart | all |
| C20 | Targets: repeat contacts linked · time to correct owner · SLA risk before LCD · exports beyond 3K · zero per-add-on fees · every decision explained | all | E8 Metrics | a small "Ops metrics" panel computed from seed data (counts, not marketing numbers) | Finale |

---

## 3. Round 2 plan: epics with checkboxes

Order = highest judge value first. A vertical slice that runs beats a wide slice that doesn't.

### E0 Foundation (owners: K frontend shell, N schema/auth)
- [ ] Monorepo: `apps/web` (Angular), `apps/api` (NestJS), `packages/shared` (types) · **K**
- [ ] `docker compose up` brings up PostgreSQL + API + web; `npm run seed` resets demo data · **N**
- [ ] Demo auth: 4 demo users (Requester per agency, Agent, Escalation Manager, Lead), JWT, no real IdP · **N**
- [ ] Angular shell: login picker, role-based route guards, layout, empty/loading/error components · **K**
- [ ] Schema + migrations: `agencies, users, tickets, tboh_bookings, intents, ticket_links, comments, side_conversations, side_conversation_recipients, assignments, audit_events, sla_policies (versioned), sla_state, themes, ticket_themes` · **N**
- [ ] Seed: 3+ agencies; tickets sharing a TBOH + repeated refund intent; mixed regions/priorities; 2–3 SLA at-risk/breached; 1 transferred ticket with an active supplier side convo; 1–2 tickets in Escalation queue; theme tags · **N**
- [ ] CI (GitHub Actions): lint + unit tests on every PR · **N**

### E1 MVP-1 Context & linkage (Journey A)
- [ ] Ticket create form: title, description, agency, TBOH, priority, intent, check-in date, LCD · **K**
- [ ] Status flow New → Open → Pending → Escalated → Resolved → Closed (server-enforced) · **N**
- [ ] Linkage service: auto-link by TBOH; suggest link by agency + intent within a window; manual link/unlink with reason · **N**
- [ ] Intent taxonomy (JSON config) + rule-based auto-suggest with "matched because…" reason · **N**
- [ ] Linked-case panel + full activity timeline in one view · **K**

### E2 MVP-2 Routing & ownership (Journey B)
- [ ] Routing engine: config-driven weights for region, time window, priority/ranking, availability (simulated roster) · **N**
- [ ] Assign / reassign / unassign APIs; every change writes `audit_events` with a human-readable reason · **N**
- [ ] Views: Triage, My queue, By region, By intent, Linked-case · **K**
- [ ] "Why routed" chip + expandable score breakdown; manual override dialog requiring a reason · **K**

### E3 MVP-3 Side conversations (Journey C)
- [ ] Recipient model decoupled from ticket group; recipients persist on transfer · **N**
- [ ] Thread UI with recipient picker (agents, groups, external supplier email placeholder) · **K**
- [ ] Clear separation: internal note vs external reply (colour, label, permission) · **K + N**

### E4 MVP-4 SLA & escalation (Journey D)
- [ ] SLA engine: due time from priority + check-in/LCD proximity + optional regional-calendar flag; versioned policy · **N**
- [ ] Scheduler (cron/interval) recomputes `sla_state`: on track / at risk / breached, with reason · **N**
- [ ] Badges (amber at-risk, coral breached) in all views and ticket header · **K**
- [ ] "Escalate to Escalation Manager" action: changes owner + queue, timeline event, notification stub · **K + N**
- [ ] SLA simulation view: "if this policy changed, these N tickets would change state" · **K + N**

### E5–E6 MVP-5/6 Insights & data (Journey E)
- [ ] Theme tagger (rules/keywords over title, description, intent) · **N**
- [ ] Weekly Insights page: top themes, trend vs last week, sample tickets, optional "suggested link to product/bug" · **K**
- [ ] Streamed export endpoint (CSV + NDJSON) using DB cursor; no row cap · **N**
- [ ] Large-dataset generator (e.g. 50k–100k tickets) to demo export beyond 3K · **N**
- [ ] `docs/DATA.md`: scale path (read replica, CDC → warehouse, WebSocket vs polling), retention/archival policy · **N**
- [ ] Realtime: polling first (simple), WebSocket if time allows · **K**

### E7 MVP-7 Roles & hardening
- [ ] Per-role permissions: Requester = own agency tickets only; Agent = org queues; Escalation Mgr = escalation queue + escalate; Lead = lead views · **N**
- [ ] Per-agency isolation tests at API level · **N**
- [ ] Input validation (DTO validation pipes), rate limiting on auth, helmet headers · **N**
- [ ] Env-based config (`.env.example`), no secrets in repo · **N**
- [ ] Empty / loading / error states on every view · **K**
- [ ] Accessibility basics: keyboard navigation, focus states, contrast · **K**

### E8 Docs + video
- [ ] README: stack, one-command run, demo accounts, feature checklist mapped to Problems 1–6 · **K**
- [ ] `docs/ARCHITECTURE.md` (diagram + services), `docs/DECISIONS.md` updated, API docs (Swagger) · **N**
- [ ] 3–5 min demo script (Journeys A → E) · **K**
- [ ] Explainer video (workflow + key features) · **K** (N records her parts)
- [ ] Open-source licences listed (`docs/LICENSES.md`) · **N**

### Stretch (only after MVP is solid; cut these first)
- [ ] Realtime dashboard via WebSocket
- [ ] Webhooks on ticket create/update
- [ ] CSAT after resolve
- [ ] Macros with intent-aware suggestions
- [ ] Supplier portal thread UX
- [ ] Stronger auto-intent: TF-IDF + logistic regression trained on seed/historical text, behind the same "suggest" interface

### Owner table (proposed)

| Epic | Karthikeyan | Nandhini |
|---|---|---|
| Foundation / auth / schema + seed | Frontend shell, role-based routing/guards | DB schema, migrations, seed data, auth API |
| MVP-1 Linkage | Ticket form, timeline, linked-case UI | Linkage + intent auto-suggest rules, APIs |
| MVP-2 Routing | Triage / my-queue / region / intent views, "why routed" display | Routing engine, audit reasons |
| MVP-3 Side conversations | Thread UI, recipient picker | Recipient model, transfer-safe logic |
| MVP-4 SLA & escalation | At-risk/breach badges, escalate action UI | SLA engine, escalation workflow |
| MVP-5/6 Insights & data | Insights dashboard | Theme tagging, streamed export, scale doc |
| Tests, CI, docs, videos | Demo script, explainer video, README | Unit/e2e tests, CI, API docs |

Both review each other's PRs. Small commits with clear messages: finalists are asked individually about what they built.

### Round 2 quality gates
- [ ] Unit tests: routing, SLA, linkage rules (and theme tagger)
- [ ] ≥ 1 end-to-end test per demo journey (A–E), Playwright
- [ ] CI green on main (lint + unit + e2e smoke)
- [ ] One-command local run documented and tested on a clean machine
- [ ] Clean commit history; each epic traceable to its owner
- [ ] Licences listed

---

## 4. Risk register (project delivery risks, not product adoption risks)

| # | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Scope creep for a 2-person team | High | High | Traceability table is the scope. Stretch list is frozen until A–D pass e2e | K |
| R2 | Round 2 window shorter than expected | Med | High | Foundation can start before results; build order is value-first | K + N |
| R3 | Routing/SLA rules get complex and buggy | Med | High | Config-driven, unit-tested pure functions; keep 2–4 factors | N |
| R4 | Seed data doesn't show the journeys clearly | Med | Med | Write seed from the demo script, not the other way round | N |
| R5 | Demo failure on venue network/laptop | Med | High | Local-only stack, offline recording, second laptop (see Finale) | K |
| R6 | One member unavailable for some days | Med | Med | Both can run the stack; PR reviews keep knowledge shared | K + N |
| R7 | Overclaiming in deck vs prototype | Low | High | Contract principle; say explicitly what's cut | K |
| R8 | Export of 50k+ rows slow or memory-heavy | Low | Med | DB cursor + streaming; test with generator early | N |

---

## 5. Grand Finale plan

### 5.1 Live demo script (3–5 min)

| Time | Journey | Who drives | What the jury sees |
|---|---|---|---|
| 0:00–0:20 | Intro | K | One line problem + pitch line. Straight to the app. |
| 0:20–1:10 | **A Context & linkage** | K | Requester (Agency X) raises a refund on TBOH-1234 → OpsDesk auto-links it to two earlier cases with the same TBOH + intent; intent auto-suggested with "matched because…" |
| 1:10–1:50 | **B Routing** | N | Ticket lands in Triage; routing assigns to an APAC agent on shift; "why routed" shows the score breakdown; Lead overrides with a reason → audit event |
| 1:50–2:30 | **C Side conversation + transfer** | N | Agent opens supplier side conversation (explicit recipients) → transfers ticket to another group → thread and recipients intact; internal note vs external reply |
| 2:30–3:15 | **D SLA & escalate** | K | Check-in tomorrow → amber at-risk badge with reason; click "Escalate" → owner = Escalation Manager, queue changes, timeline event |
| 3:15–4:00 | **E Insights & export** | N | Weekly themes with sample tickets; export 50,000+ rows streamed in seconds vs the ~3K cap |
| 4:00–4:30 | Close | K | What we cut (if anything), cost contrast, rollout plan, thank you |

State cuts honestly: e.g. "Realtime sync uses polling, not WebSockets; supplier portal is out of scope."

### 5.2 Resilience plan
- [ ] `npm run demo:reset` (or `docker compose run seed`) restores the exact demo dataset in < 30 s
- [ ] Everything runs on localhost: no venue Wi-Fi dependency; Docker images pre-pulled
- [ ] Offline fallback: full demo screen recording (MP4) on both laptops + USB stick
- [ ] Second laptop with the same build, pre-logged-in
- [ ] Browser tabs pre-loaded per role (Requester, Agent, Escalation Mgr, Lead) in separate profiles
- [ ] Scripted recovery lines: "Let me reset the dataset, takes 20 seconds" / "Here's the same flow recorded this morning"
- [ ] Rehearse the full demo 3× with a timer, including one deliberate failure-recovery drill

### 5.3 Jury Q&A prep

| Likely question | Crisp answer |
|---|---|
| How is this cheaper than Zendesk + add-ons? | We don't claim a number. Structurally: one owned data path and one codebase, instead of per-add-on and per-TPS-API fees plus glue. The prototype shows the capabilities that today need add-ons (linkage, routing, SLA logic, export, insights) running in one system. Real cost comparison needs TBO's licence data. |
| How would you migrate from Zendesk? | CSV/API import of tickets, users and orgs into our schema, then a shadow-run beside Zendesk for one queue before switching. Our import step is a tested script. |
| Does it scale beyond 50K rows? | Exports stream from a DB cursor with no cap; we demo 50K+. Beyond that: read replica for reporting, CDC to a warehouse for analytics, indexes on agency/TBOH/intent/SLA due. Documented in DATA.md. |
| How do you stop one agency seeing another's data? | Every query is scoped by role and agency in the API layer, not the UI; isolation is covered by automated tests that try cross-agency reads. |
| Why rules before ML? | Explainable, testable, works with zero training data, and ops can change it today. The same "suggest" interface can swap in TF-IDF + logistic regression once there is labelled history. |
| How is routing explained? | Each assignment stores the factor scores and a sentence ("APAC region, on shift, priority High, lowest load"). Agents see it; Leads can override with a reason that's audited. |
| What happens on failures? | Writes are transactional; events go through an outbox so realtime updates aren't lost; SLA recompute is idempotent; UI shows clear error states with retry. |
| What about real TBO integrations? | Simulated in the hackathon (seed/mock boundary on the slide). The API layer is where TBO booking/agency services would plug in. |
| Who built what? | See owner table and commit history: K frontend/architecture, N backend/rules/data. Each of us can walk through our code. |

### 5.4 Business framing
- **Cost/complexity contrast:** own the platform (one data path, rules as config) vs pay per add-on / per TPS API + integration glue. Qualitative, no invented figures.
- **Adoption rollout:** pilot one region/queue → shadow-run beside Zendesk → expand queue by queue; success = the six targets measured on real pilot data.
- **30/60/90 days after a hypothetical go-ahead:**
  - 30: integrate real agency + booking (TBOH) data read-only; pilot queue configured; SSO.
  - 60: shadow-run one region; tune routing/SLA rules from the audit log; import history.
  - 90: switch the pilot queue; expand to a second region; warehouse feed for insights.

### 5.5 Polish list
- [ ] Consistent spacing, colour tokens and badges matching the deck palette
- [ ] Performance: list views paginated/virtualised; export streams
- [ ] Accessibility basics: keyboard, focus rings, contrast, aria labels on badges
- [ ] Branding: OpsDesk wordmark (text only), no TBO/Zendesk logos

---

## 6. Definition of done

### Round 1 (idea)
- [x] Deck: exactly 4 slides (Cover, 2 content, Thank You), 4 official themes labelled verbatim
- [x] PPTX + PDF exported, visually QA'd
- [x] Video script (main, single-narrator, 60 s cut) + shot list + export settings
- [x] ROADMAP, DECISIONS, ASSUMPTIONS, QA checklist in repo
- [x] Contacts filled on Thank You slide, deck rebuilt
- [ ] Video recorded, exported as MP4 within Unstop's size limit
- [ ] Both files uploaded on Unstop, topic "Zendesk Automation" selected

### Round 2 (prototype)
- [ ] Journeys A–D work end to end on seeded data; Journey E (insights + 50K export) works
- [ ] Every row in the traceability table is ✅ or explicitly marked "cut" with a reason
- [ ] One-command run; README with demo accounts and Problem 1–6 checklist
- [ ] Tests + CI green; licences listed
- [ ] Explainer video uploaded; repo public/shareable

### Grand Finale
- [ ] 3–5 min live demo rehearsed 3×, resettable dataset, offline fallback ready
- [ ] Q&A table rehearsed; each member can explain their own code
- [ ] Business framing slide/talk-track ready (cost contrast, rollout, 30/60/90)
