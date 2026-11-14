# Assumptions

What we assume for the hackathon build, and what would change in production. Judges should be able to see each boundary clearly.

| # | Assumption (hackathon) | Why | Production path |
|---|---|---|---|
| A1 | **Demo login instead of a real IdP.** Four seeded users (Requester per agency, Agent, Escalation Manager, Lead) with a login picker; JWTs signed with a secret from env. | Production SSO is out of scope per the brief. | OIDC/SAML SSO (TBO's IdP); same role claims feed the same guards. |
| A2 | **Agent availability is simulated** (a seeded roster with shifts per region). | No access to TBO's workforce data. | Read availability from the WFM/HR roster or agent presence status. |
| A3 | **Regional calendars are simulated** (a small seeded holiday/working-hours table per region, used as an optional SLA flag). | No access to TBO's calendars. | Sync from a maintained holiday calendar per region. |
| A4 | **Intent = rules first** (keyword/pattern rules over a fixed intent taxonomy, each suggestion with a reason). Lightweight ML (TF-IDF + logistic regression) is a documented upgrade. | Explainable, testable, no training data or paid AI needed. | Train on labelled history once available; keep rules as a fallback and for transparency. |
| A5 | **Single-tenant TBO org.** Agencies are customers inside one TBO tenant; isolation is per agency, not per tenant. | Matches the problem statement. | Same model; add tenant id only if OpsDesk is ever offered beyond TBO. |
| A6 | **TBO systems (agencies, bookings/TBOH) are seed/mock data** behind the API boundary. | No integration access. | Read-only integration to agency and booking services; CSV/API import from Zendesk for history. |
| A7 | **Email/supplier delivery is stubbed**: side-conversation messages to external recipients are stored and shown, not actually emailed. | Avoid sending real email in a demo. | SMTP/transactional mail provider with inbound parsing. |
| A8 | **Large-volume demo data is generated** (50K+ synthetic tickets) to prove uncapped streamed export. | Show export beyond the ~3K cap without real data. | Real data volume; same streaming code path. |
| A9 | **No real customer data, names or statistics** anywhere in deck, seed or docs. | Privacy and honesty. | n/a |
| A10 | Problem facts (3K export cap vs ~50K need, FIFO/LIFO routing, side-conversation behaviour, add-on costs) are **as stated in the OpsDesk problem statement**; we did not independently verify them. | Ground truth for this hackathon. | Validate with TBO ops during a pilot. |
