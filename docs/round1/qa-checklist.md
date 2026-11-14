# Round 1 pre-submission QA checklist

✅ = verified by build/QA run on 2026-11-14 · ☐ = you must do / re-check by hand.

## Deck
- ✅ Exactly **4 slides**: Cover, Slide 1, Slide 2, Thank You (content slides = 2).
- ✅ All four official themes visibly labelled with exact names: **Potential Impact** · **Innovation** (Slide 1) · **Implementation and Technical Feasibility** · **Adoption Risk/Feasibility** (Slide 2). Rendered in caps inside coloured theme pills.
- ✅ Every slide rendered to PNG (`deck/render.sh`) and visually inspected: no overflow, no overlaps, contrast OK, one font family (Calibri), body text ≥ 12 pt; only footer, column headers and footnote are 10 pt.
- ✅ No fabricated statistics (impact = "targets we will measure"; likelihoods marked as our estimate); no TBO/Zendesk logos; no third-party imagery.
- ✅ PDF and PPTX both exported. PDF fonts embedded (Carlito = metric-compatible Calibri). Sizes: PPTX ~35 KB, PDF ~160 KB.
- ✅ PPTX passes OOXML validation (`validate.py`: all validations passed).
- ✅ Every claim maps to a Round 2 deliverable: traceability table in `docs/ROADMAP.md` §2 (C1–C20).
- ☐ Fill `CONFIG.contactK` / `CONFIG.contactN` in `deck/build_deck.js` (Thank You slide currently shows `[email / LinkedIn]`), run `deck/render.sh`, re-check slide 4.
- ☐ Open the PPTX once in PowerPoint (or Google Slides) to confirm it looks identical to the PDF.
- ☐ Decide which file to upload (portal accepts `pdf, pptx`, one submission per team): **recommend the PDF** (fonts locked).

## Video
- ✅ Script 405 words; ≈ 2:54 at 140 wpm (3:07 at 130, 2:42 at 150). Run `python3 docs/round1/wordcount.py` after edits.
- ✅ 60-second backup cut (133 words ≈ 0:57) and single-narrator variant (397 words ≈ 2:50) included.
- ✅ Every line tagged K or N; K has 5 turns, N has 4; hand-offs on slide changes/highlights.
- ✅ Both names appear on the cover, the Slide 2 team strip, the Thank You slide (contacts) and the video intro. Footer on content slides also names both.
- ✅ Export notes: MP4 / H.264 / 1080p / AAC, ffmpeg compression command included.
- ☐ **Check Unstop's video size and length limit on the submission form** (not confirmed from public pages). Expected export ≈ 20–90 MB for 3 min.
- ☐ Record, edit, watch once fully with sound, export as `.mp4`.

## Repo
- ✅ Folder structure created (README, docs/ROADMAP, DECISIONS, ASSUMPTIONS, docs/round1/*, deck/*, assets/*).
- ✅ README shows round status table.
- ☐ Fill the Round 1 deadline in `docs/ROADMAP.md` §1.
- ☐ Confirm stack (D-002) and role split (D-003) in `docs/DECISIONS.md`.

## Unstop submission
- ☐ Topic dropdown: **Zendesk Automation**.
- ☐ Upload deck (PDF or PPTX) + MP4. Only one submission per team: upload once everything above is ticked.
- ☐ Screenshot the submission confirmation.
