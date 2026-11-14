# Round 1 video script: OpsDesk (Team 404 Error)

- **Target length:** 2:00. **Format:** MP4 (H.264 + AAC), 1920×1080.
- **Speakers:** **K** = Karthikeyan · **N** = Nandhini. Every spoken line is tagged.
- **Pace:** ~140 words per minute. Short sentences. Smile on the hook and the close.
- What's on screen: the deck in presentation mode (Cover → Slide 1 → Slide 2 → Thank You), optional small face-cam bubble bottom-right.

## Word count and timing (computed)

| Version | Spoken words | Est. time @ 140 wpm | Est. @ 130 wpm | Est. @ 150 wpm |
|---|---|---|---|---|
| Main two-speaker script | 269 | 1:55 | 2:04 | 1:48 |
| Single-narrator variant | 267 | 1:54 | 2:03 | 1:47 |
| 60-second backup cut | 133 | 0:57 | 1:01 | 0:53 |

Counts produced by `python3 docs/round1/wordcount.py` (counts only the quoted spoken lines). The main script lands at ~1:55 at 140 wpm. Split: **K 137 words over 5 turns · N 130 words over 3 turns · both say "Thank you"**. The few seconds of slack under 2:00 cover pauses and slide changes. If your read runs long, drop the lines marked *(trim)*.

---

## Main script (two speakers, ~2:00)

| Time | On-screen visual | Speaker + voiceover |
|---|---|---|
| 0:00–0:10 | **Cover slide.** Face-cam: both visible if together, else K. | **K:** "Imagine an agency chasing the same refund three times, and TBO's ticketing treats it as three strangers. I'm Karthikeyan." <br>**N:** "And I'm Nandhini, team 404 Error. This is OpsDesk." |
| 0:10–0:32 | **Slide 1**, zoom/highlight the **TODAY** column of the Potential Impact table. | **K:** "TBO's ops team runs on isolated tickets. Routing is hardcoded, mostly by country. Side conversations break on transfer. One SLA fits every case, whatever the check-in date. And exports stop at about three thousand rows. Every fix is another paid add-on. So, can it handle TBO's complexity efficiently and economically?" |
| 0:32–1:04 | **Slide 1**, highlight **INNOVATION** cards 1 → 4 as each is named. | **N:** "OpsDesk turns tickets into connected cases. A case graph links every contact by agency, TBOH and intent, so a repeat refund joins its history. Routing scores region, time, ranking and availability, and always shows why. A travel-aware SLA clock watches check-in and LCD, and one click escalates to the Escalation Manager, changing owner and queue on the timeline. Side-conversation recipients survive transfer, and conversations roll up into weekly themes, with no paid AI add-on." |
| 1:04–1:15 | **Slide 1**, highlight the **TARGETS WE WILL MEASURE** chips. | **K:** "We'll prove it with targets we measure in the prototype: repeat contacts linked, time to the correct owner, and exports beyond the three-thousand-row cap." |
| 1:15–1:30 | **Slide 2**, pan the **architecture diagram** left to right. | **K:** "Under the hood: an Angular app, a role-checked NestJS API, focused services, and PostgreSQL. Exports stream with no row cap, and an outbox drives realtime updates." |
| 1:30–1:50 | **Slide 2**, highlight the **risk table**, the **rollout** steps, then the **Team of 2** strip. | **N:** "Rules are config, not code, and every decision writes an audit reason. Each agency only sees its own data. To adopt safely, we pilot one queue, shadow-run beside Zendesk, then expand. We're a team of two, so we're shipping one focused vertical slice, not a helpdesk clone." |
| 1:50–2:00 | **Thank You slide.** Both on face-cam if possible. | **K:** "OpsDesk: linked by agency and TBOH, routed by reality, escalated on purpose. See it working in Round 2." <br>**Both:** "Thank you!" |

*(trim)* candidates if you run long: in K's problem beat drop "Every fix is another paid add-on." (−6 words); in N's solution beat drop "changing owner and queue on the timeline" (−7 words).

### Hand-off map

K (hook) → N (intro) → K (problem) → N (solution + innovation) → K (impact targets + architecture) → N (rules, security, adoption, scope) → K (close) → Both. Each hand-off happens at a slide change or a new highlight, never mid-sentence.

---

## Single-narrator variant (one person records alone, ~2:00)

Same visuals and timings as above. Whoever records says all lines; the intro names both.

| Time | Voiceover |
|---|---|
| 0:00–0:10 | "Imagine an agency chasing the same refund three times, and TBO's ticketing treats it as three strangers. I'm Karthikeyan, and with Nandhini I'm team 404 Error." *(Nandhini recording: "I'm Nandhini, and with Karthikeyan I'm team 404 Error.")* |
| 0:10–0:32 | "TBO's ops team runs on isolated tickets. Routing is hardcoded, mostly by country. Side conversations break on transfer. One SLA fits every case, whatever the check-in date. And exports stop at about three thousand rows. Every fix is another paid add-on. So, can it handle TBO's complexity efficiently and economically?" |
| 0:32–1:15 | "OpsDesk turns tickets into connected cases. A case graph links every contact by agency, TBOH and intent, so a repeat refund joins its history. Routing scores region, time, ranking and availability, and always shows why. A travel-aware SLA clock watches check-in and LCD, and one click escalates to the Escalation Manager, changing owner and queue on the timeline. Side-conversation recipients survive transfer, and conversations roll up into weekly themes, with no paid AI add-on. We'll prove it with targets we measure in the prototype: repeat contacts linked, time to the correct owner, and exports beyond the three-thousand-row cap." |
| 1:15–1:50 | "Under the hood: an Angular app, a role-checked NestJS API, focused services, and PostgreSQL. Exports stream with no row cap, and an outbox drives realtime updates. Rules are config, not code, and every decision writes an audit reason. Each agency only sees its own data. To adopt safely, we pilot one queue, shadow-run beside Zendesk, then expand. We're a team of two, so we're shipping one focused vertical slice, not a helpdesk clone." |
| 1:50–2:00 | "OpsDesk: linked by agency and TBOH, routed by reality, escalated on purpose. See it working in Round 2. Thank you!" |

---

## 60-second backup cut (if Unstop's limit is short)

| Time | Visual | Speaker + voiceover |
|---|---|---|
| 0:00–0:10 | Cover | **K:** "Same refund, raised three times, and today that's three unrelated tickets. I'm Karthikeyan." **N:** "I'm Nandhini, and this is OpsDesk, for TBO's operations team." |
| 0:10–0:35 | Slide 1 | **N:** "OpsDesk links every case by agency, TBOH and intent. It routes by region, time, ranking and availability, and shows why. Its SLA clock knows check-in and LCD, and one click escalates to the Escalation Manager. Side-conversation recipients survive transfer, and conversations roll up into weekly themes. No paid add-ons, no lost context." |
| 0:35–0:52 | Slide 2 | **K:** "We build it on Angular, NestJS and PostgreSQL, with streamed exports and no row cap. To adopt it safely, we pilot one queue, shadow-run beside Zendesk, and keep every decision auditable. We're two builders, shipping one focused slice." |
| 0:52–1:00 | Thank You | **K:** "OpsDesk: linked by agency and TBOH, routed by reality, escalated on purpose. See it working in Round 2." **Both:** "Thank you!" |

---

## Shot list (main 2:00 script)

| # | Shot | Duration | Notes |
|---|---|---|---|
| 1 | Cover slide, full screen | 0:10 | Optional: both faces in a small bubble bottom-right. Cursor hidden. |
| 2 | Slide 1, full, then zoom 130% on the Potential Impact table, TODAY column | 0:22 | Let judges read the headline for 2 s, then pan rows 1 → 6. |
| 3 | Slide 1, Innovation cards, highlight 1 → 2 → 3 → 4 | 0:32 | Highlight box or zoom per card in sync with N's lines. |
| 4 | Slide 1, target chips | 0:11 | Zoom on the "Targets we will measure" strip. |
| 5 | Slide 2, architecture diagram, pan left → right | 0:15 | Pause on the dashed amber "Simulated TBO" box. |
| 6 | Slide 2, risk table → rollout steps → Team of 2 strip | 0:20 | Highlight as named. |
| 7 | Thank You slide | 0:10 | Both faces if possible; end on a 1-second hold. |

## Recording instructions

1. **Open the PDF** (`deck/OpsDesk_VoyageHack_Round1.pdf`) full-screen, or the PPTX in Slideshow mode. The PDF is safest: fonts are embedded.
2. **Screen recorder:** OBS Studio (free) or the OS recorder (Win+Alt+R / macOS Cmd+Shift+5). Canvas and output 1920×1080, 30 fps.
3. **Audio:** wired earphones with mic or a USB mic, 15-20 cm from the mouth, slightly off-axis. Quiet room with soft furnishings. Turn off fans, AC and phone notifications. Record 5 seconds of silence first (for noise removal).
4. **Two people in different places:** each records their own lines as separate takes, over the same slide, with a 1-second pause before and after. Join in the editor (Clipchamp, DaVinci Resolve, Shotcut or CapCut) in the order of the hand-off map. Keep both voices at similar loudness (normalize to about -16 LUFS or "normalize audio" in the editor).
5. **Face-cam (optional):** a small circle bottom-right, never covering slide text. Plain background, light in front of you, camera at eye level.
6. **Rehearse twice with a stopwatch.** If over 2:05, use the *(trim)* cuts.
7. Watch the full export once with sound before uploading.

## Export settings

| Setting | Value |
|---|---|
| Container | **MP4** (the portal accepts mp4 only) |
| Video | H.264, 1920×1080, 30 fps, CRF 23 or VBR ~3-4 Mbps |
| Audio | AAC, 128-192 kbps, 48 kHz, mono or stereo |
| Expected size | ~2 min at 3-4 Mbps ≈ **45-60 MB**; slide videos at CRF 23 are often far smaller (15-35 MB) |

**File size check (do this before the deadline day):** I could not confirm Unstop's upload size limit for this event from public pages. Open the submission form on Unstop and read the limit next to the upload field. If the export is larger, compress it:

```bash
ffmpeg -i opsdesk_round1_raw.mp4 -c:v libx264 -preset slow -crf 26 -vf scale=1920:1080 -r 30 -c:a aac -b:a 128k -movflags +faststart OpsDesk_Round1_404Error.mp4
```

For a hard target, use a bitrate instead of CRF: `-b:v 2000k` keeps a 2-minute slide video near 30 MB.
