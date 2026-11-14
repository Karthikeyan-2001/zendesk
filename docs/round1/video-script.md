# Round 1 video script: OpsDesk (Team 404 Error)

- **Target length:** 3:00 (hard cap 4:00). **Format:** MP4 (H.264 + AAC), 1920×1080.
- **Speakers:** **K** = Karthikeyan · **N** = Nandhini. Every spoken line is tagged.
- **Pace:** ~140 words per minute. Short sentences. Smile on the hook and the close.
- What's on screen: the deck in presentation mode (Cover → Slide 1 → Slide 2 → Thank You), optional small face-cam bubble bottom-right.

## Word count and timing (computed)

| Version | Spoken words | Est. time @ 140 wpm | Est. @ 130 wpm | Est. @ 150 wpm |
|---|---|---|---|---|
| Main two-speaker script | 405 | 2:54 | 3:07 | 2:42 |
| Single-narrator variant | 397 | 2:50 | 3:03 | 2:39 |
| 60-second backup cut | 133 | 0:57 | 1:01 | 0:53 |

Counts produced by `python3 docs/round1/wordcount.py` (counts only the quoted spoken lines). The main script lands at ~2:54 at 140 wpm, inside the 3:00 target and well under the 4:00 cap. If your read runs long, drop the lines marked *(trim)*. Split: **K 196 words over 5 turns · N 207 words over 4 turns · both say "Thank you"**.

---

## Main script (two speakers, ~3:00)

| Time | On-screen visual | Speaker + voiceover |
|---|---|---|
| 0:00–0:15 | **Cover slide.** Face-cam: both visible if together, else K. | **K:** "Imagine an agency chasing the same refund three times, and TBO's ticketing treats it as three strangers. That's the gap OpsDesk closes. I'm Karthikeyan." <br>**N:** "And I'm Nandhini. We're team 404 Error." |
| 0:15–0:45 | **Slide 1**, zoom/highlight the **TODAY** column of the Potential Impact table. | **K:** "TBO's ops team runs on a helpdesk built for isolated tickets. Routing is hardcoded FIFO or LIFO, mostly by country. Side conversations break when a ticket moves. One SLA fits every case, whether check-in is next month or tonight. Insights stay locked inside tickets, and exports stop at about three thousand rows. Every fix means another paid add-on, or another API to glue on. So the real question is: can it handle TBO's complexity efficiently and economically?" |
| 0:45–1:25 | **Slide 1**, highlight **INNOVATION** cards 1 → 4 as each is named. | **N:** "OpsDesk turns tickets into connected operations cases. First, a case graph. Every contact is linked by agency, TBOH booking ID and intent, so a repeat refund request joins its history instead of starting over. Second, explainable routing. We score region, time window, ranking and availability, and every assignment stores a plain 'why routed' reason. Third, a travel-aware SLA clock. Priority plus check-in or LCD proximity decides what's at risk, and one click escalates to the Escalation Manager, changing owner and queue on the timeline. Fourth, side conversations keep an explicit recipient list that survives transfer, and conversations roll up into weekly themes, with no paid AI add-on." |
| 1:25–1:35 | **Slide 1**, highlight the **TARGETS WE WILL MEASURE** chips. | **K:** "And we'll prove the impact with targets we measure in the prototype: repeat contacts linked, time to the correct owner, SLA risks caught before LCD, and exports beyond the three-thousand-row cap." |
| 1:35–2:00 | **Slide 2**, highlight the **architecture diagram**, left to right. | **K:** "Here's how we build it. An Angular web app talks to a role-checked REST API on NestJS. Behind it sit focused services: linkage, routing, SLA, side conversations, insights and export, all on PostgreSQL. An outbox feeds realtime updates, and exports stream with no row cap." |
| 2:00–2:25 | **Slide 2**, highlight **MVP map**, then the **Team of 2** strip. | **N:** "I own the rules engines and data. Routing and SLA rules are config, not code, so they're versioned and testable. Every decision writes an audit reason. Roles keep each agency's data isolated, and secrets stay out of code. We're a team of two, so we're shipping one focused vertical slice, not a full helpdesk clone." |
| 2:25–2:50 | **Slide 2**, highlight **ADOPTION RISK/FEASIBILITY** table, then the **rollout** steps. | **N:** "Adoption is the real risk, so we lower it. Pilot one region or queue. Shadow-run beside Zendesk. Show agents why each case was routed, let them override it, and keep an audit trail. Then expand, queue by queue." |
| 2:50–3:00 | **Thank You slide.** Both on face-cam if possible. | **K:** "OpsDesk: linked by agency and TBOH, routed by reality, escalated on purpose. See the working prototype in Round 2." <br>**Both:** "Thank you!" |

*(trim)* candidates if you run long: in K's problem beat drop "Every fix means another paid add-on, or another API to glue on." (−12 words); in N's solution beat drop "changing owner and queue on the timeline" (−7 words).

### Hand-off map

K (hook) → N (intro) → K (problem) → N (solution + innovation) → K (impact targets) → K (architecture) → N (rules engines, data, scope) → N (adoption) → K (close) → Both. Each hand-off happens at a slide change or a new highlight, never mid-sentence.

---

## Single-narrator variant (one person records alone, ~3:00)

Same visuals and timings as above. Whoever records says all lines; the intro names both.

| Time | Voiceover |
|---|---|
| 0:00–0:15 | "Imagine an agency chasing the same refund three times, and TBO's ticketing treats it as three strangers. That's the gap OpsDesk closes. I'm Karthikeyan, and with Nandhini I'm team 404 Error." *(Nandhini recording: "I'm Nandhini, and with Karthikeyan I'm team 404 Error.")* |
| 0:15–0:45 | "TBO's ops team runs on a helpdesk built for isolated tickets. Routing is hardcoded FIFO or LIFO, mostly by country. Side conversations break when a ticket moves. One SLA fits every case, whether check-in is next month or tonight. Insights stay locked inside tickets, and exports stop at about three thousand rows. Every fix means another paid add-on, or another API to glue on. So the real question is: can it handle TBO's complexity efficiently and economically?" |
| 0:45–1:35 | "OpsDesk turns tickets into connected operations cases. First, a case graph. Every contact is linked by agency, TBOH booking ID and intent, so a repeat refund request joins its history instead of starting over. Second, explainable routing. We score region, time window, ranking and availability, and every assignment stores a plain 'why routed' reason. Third, a travel-aware SLA clock. Priority plus check-in or LCD proximity decides what's at risk, and one click escalates to the Escalation Manager, changing owner and queue on the timeline. Fourth, side conversations keep an explicit recipient list that survives transfer, and conversations roll up into weekly themes, with no paid AI add-on. We'll prove the impact with targets we measure in the prototype: repeat contacts linked, time to the correct owner, SLA risks caught before LCD, and exports beyond the three-thousand-row cap." |
| 1:35–2:25 | "Here's how we build it. An Angular web app talks to a role-checked REST API on NestJS. Behind it sit focused services: linkage, routing, SLA, side conversations, insights and export, all on PostgreSQL. An outbox feeds realtime updates, and exports stream with no row cap. Routing and SLA rules are config, not code, so they're versioned and testable. Every decision writes an audit reason. Roles keep each agency's data isolated, and secrets stay out of code. We're a team of two, so we're shipping one focused vertical slice, not a full helpdesk clone." |
| 2:25–2:50 | "Adoption is the real risk, so we lower it. Pilot one region or queue. Shadow-run beside Zendesk. Show agents why each case was routed, let them override it, and keep an audit trail. Then expand, queue by queue." |
| 2:50–3:00 | "OpsDesk: linked by agency and TBOH, routed by reality, escalated on purpose. See the working prototype in Round 2. Thank you!" |

---

## 60-second backup cut (if Unstop's limit is short)

| Time | Visual | Speaker + voiceover |
|---|---|---|
| 0:00–0:10 | Cover | **K:** "Same refund, raised three times, and today that's three unrelated tickets. I'm Karthikeyan." **N:** "I'm Nandhini, and this is OpsDesk, for TBO's operations team." |
| 0:10–0:35 | Slide 1 | **N:** "OpsDesk links every case by agency, TBOH and intent. It routes by region, time, ranking and availability, and shows why. Its SLA clock knows check-in and LCD, and one click escalates to the Escalation Manager. Side-conversation recipients survive transfer, and conversations roll up into weekly themes. No paid add-ons, no lost context." |
| 0:35–0:52 | Slide 2 | **K:** "We build it on Angular, NestJS and PostgreSQL, with streamed exports and no row cap. To adopt it safely, we pilot one queue, shadow-run beside Zendesk, and keep every decision auditable. We're two builders, shipping one focused slice." |
| 0:52–1:00 | Thank You | **K:** "OpsDesk: linked by agency and TBOH, routed by reality, escalated on purpose. See it working in Round 2." **Both:** "Thank you!" |

---

## Shot list

| # | Shot | Duration | Notes |
|---|---|---|---|
| 1 | Cover slide, full screen | 0:15 | Optional: both faces in a small bubble bottom-right. Cursor hidden. |
| 2 | Slide 1, full | 0:05 | Let judges read the headline first. |
| 3 | Slide 1, zoom 130% on Potential Impact table, TODAY column | 0:25 | Zoom with editor (pan from row 1 to row 6). |
| 4 | Slide 1, Innovation cards, highlight 1 → 2 → 3 → 4 | 0:40 | Simple highlight box or zoom per card in sync with N's "First / Second / Third / Fourth". |
| 5 | Slide 1, target chips | 0:10 | Zoom on the "Targets we will measure" strip. |
| 6 | Slide 2, architecture diagram, pan left → right | 0:25 | Pause on the dashed amber "Simulated TBO" box. |
| 7 | Slide 2, MVP map + Team of 2 strip | 0:25 | |
| 8 | Slide 2, risk table → rollout steps | 0:25 | Highlight rows as named. |
| 9 | Thank You slide | 0:10 | Both faces if possible; end on a 1-second hold. |

## Recording instructions

1. **Open the PDF** (`deck/OpsDesk_VoyageHack_Round1.pdf`) full-screen, or the PPTX in Slideshow mode. The PDF is safest: fonts are embedded.
2. **Screen recorder:** OBS Studio (free) or the OS recorder (Win+Alt+R / macOS Cmd+Shift+5). Canvas and output 1920×1080, 30 fps.
3. **Audio:** wired earphones with mic or a USB mic, 15-20 cm from the mouth, slightly off-axis. Quiet room with soft furnishings. Turn off fans, AC and phone notifications. Record 5 seconds of silence first (for noise removal).
4. **Two people in different places:** each records their own lines as separate takes, over the same slide, with a 1-second pause before and after. Join in the editor (Clipchamp, DaVinci Resolve, Shotcut or CapCut) in the order of the hand-off map. Keep both voices at similar loudness (normalize to about -16 LUFS or "normalize audio" in the editor).
5. **Face-cam (optional):** a small circle bottom-right, never covering slide text. Plain background, light in front of you, camera at eye level.
6. **Rehearse twice with a stopwatch.** If over 3:15, use the *(trim)* cuts. Never exceed 4:00.
7. Watch the full export once with sound before uploading.

## Export settings

| Setting | Value |
|---|---|
| Container | **MP4** (the portal accepts mp4 only) |
| Video | H.264, 1920×1080, 30 fps, CRF 23 or VBR ~3-4 Mbps |
| Audio | AAC, 128-192 kbps, 48 kHz, mono or stereo |
| Expected size | ~3 min at 3-4 Mbps ≈ **70-90 MB**; slide videos at CRF 23 are often far smaller (20-50 MB) |

**File size check (do this before the deadline day):** I could not confirm Unstop's upload size limit for this event from public pages. Open the submission form on Unstop and read the limit next to the upload field. If the export is larger, compress it:

```bash
ffmpeg -i opsdesk_round1_raw.mp4 -c:v libx264 -preset slow -crf 26 -vf scale=1920:1080 -r 30 -c:a aac -b:a 128k -movflags +faststart OpsDesk_Round1_404Error.mp4
```

For a hard target (e.g. under 50 MB for 3:00), use a bitrate instead of CRF: about `-b:v 2000k` keeps a 3-minute slide video near 45-50 MB.
