#!/usr/bin/env bash
# Build the deck, export PDF via LibreOffice, rasterize pages to PNG for visual QA.
# Usage: ./render.sh [png_out_dir]   (default: deck/qa)
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:-qa}"
node build_deck.js
soffice --headless --convert-to pdf OpsDesk_VoyageHack_Round1.pptx >/dev/null
mkdir -p "$OUT"
rm -f "${OUT:?}"/slide-*.png
pdftoppm -png -r 110 OpsDesk_VoyageHack_Round1.pdf "$OUT/slide"
ls -1 "$OUT"
