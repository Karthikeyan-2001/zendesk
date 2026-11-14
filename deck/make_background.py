#!/usr/bin/env python3
"""Draw the deck background: royal-navy field with a subtle hexagon tessellation.

Original artwork (no template assets copied). Output: assets/bg-hex.png (1920x1080).
Usage: python3 deck/make_background.py
"""
import math
from pathlib import Path
from PIL import Image, ImageDraw

W, H = 1920, 1080
BASE = (7, 52, 111)      # #07346F
SHADE = (6, 46, 101)     # slightly darker hex edges
R = 120                  # hex radius (px)
STROKE = 16

img = Image.new("RGB", (W, H), BASE)
d = ImageDraw.Draw(img)
dx, dy = 1.5 * R, math.sqrt(3) * R
for col in range(-1, int(W / dx) + 2):
    for row in range(-1, int(H / dy) + 2):
        cx = col * dx
        cy = row * dy + (dy / 2 if col % 2 else 0)
        pts = [(cx + R * math.cos(math.radians(a)), cy + R * math.sin(math.radians(a))) for a in range(0, 360, 60)]
        d.line(pts + [pts[0]], fill=SHADE, width=STROKE, joint="curve")

out = Path(__file__).resolve().parent.parent / "assets" / "bg-hex.png"
img.save(out, optimize=True)
print("Wrote", out, out.stat().st_size // 1024, "KB")
