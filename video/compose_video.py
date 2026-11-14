#!/usr/bin/env python3
"""Compose the Round 1 pitch video: deck slides + face-cam picture-in-picture (bottom right).

Layout (1920x1080):
  - deck slide scaled to 1500x844 at top-left, on the deck's hex background
  - right rail: OpsDesk title + chapter list (active chapter highlighted)
  - bottom bar: name/role of whoever is speaking
  - bottom-right: the face-cam recording, rounded, with a periwinkle frame
  - the slide region being talked about gets an amber highlight box

Usage:
  python3 video/compose_video.py <facecam.mp4> [out.mp4]

Needs: ffmpeg, pdftoppm, Pillow, the built deck PDF, the Ubuntu Condensed font.
Slide timings below were synced to the 2026-11-14 recording (speaker cuts + the pause before
"Under the hood"). If you re-record, update TIMELINE.
"""
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "deck" / "OpsDesk_VoyageHack_Round1.pdf"
BG = ROOT / "assets" / "bg-hex.png"

W, H = 1920, 1080
SX, SY, SW, SH = 30, 30, 1500, 844          # slide placement
PPI = SW / 13.333                            # px per slide inch
PIP = (1470, 814, 420, 236)                  # x, y, w, h of face-cam
RAIL_X = 1562

NAVY, PANEL, PERI, PERI_FILL = "#07346F", "#0A3E80", "#5271FF", "#4361EE"
SOFT, WHITE, AMBER, MINT = "#C9D3FF", "#FFFFFF", "#FBBF24", "#5EEAD4"

def font(name, size):
    paths = {
        "head": [Path.home() / ".fonts/UbuntuCondensed-Regular.ttf"],
        "body": [Path("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf")],
        "bold": [Path("/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf")],
    }[name]
    for p in paths:
        if p.exists():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()

PEOPLE = {
    "K": ("Karthikeyan J", "Frontend & architecture"),
    "N": ("Nandhini M", "Backend, rules engines & data"),
}

CHAPTERS = ["Intro", "The problem", "Innovation", "Impact targets", "Architecture", "Adoption risk", "Close"]

# (start, end, slide_no 1-4, speaker, chapter, highlight box in slide inches or None)
TIMELINE = [
    (0.00, 6.83, 1, "K", "Intro", None),
    (6.83, 10.77, 1, "N", "Intro", None),
    (10.77, 27.50, 2, "K", "The problem", (0.40, 1.12, 6.75, 5.02)),
    (27.50, 56.87, 2, "N", "Innovation", (6.85, 1.12, 12.93, 6.36)),
    (56.87, 64.90, 2, "K", "Impact targets", (0.40, 4.95, 6.75, 6.36)),
    (64.90, 74.77, 3, "K", "Architecture", (0.40, 1.12, 7.60, 4.52)),
    (74.77, 92.80, 3, "N", "Adoption risk", (7.65, 1.12, 12.93, 6.36)),
    (92.80, None, 4, "K", "Close", None),
]


def render_slides(tmp: Path):
    subprocess.run(["pdftoppm", "-png", "-scale-to-x", str(SW), "-scale-to-y", str(SH), str(PDF), str(tmp / "s")], check=True)
    files = sorted(tmp.glob("s-*.png"))
    return [Image.open(f).convert("RGB").resize((SW, SH), Image.LANCZOS) for f in files]


def base_canvas():
    bg = Image.open(BG).convert("RGB").resize((W, H))
    return bg


def rounded(draw, box, r, **kw):
    draw.rounded_rectangle(box, radius=r, **kw)


def compose(slide, speaker, chapter, hl):
    img = base_canvas()
    d = ImageDraw.Draw(img)

    # slide with frame + soft shadow
    shadow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(shadow).rounded_rectangle((SX + 6, SY + 10, SX + SW + 6, SY + SH + 10), 14, fill=150)
    shadow = shadow.filter(ImageFilter.GaussianBlur(12))
    img.paste(Image.new("RGB", (W, H), "#000000"), mask=shadow)
    mask = Image.new("L", (SW, SH), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, SW - 1, SH - 1), 14, fill=255)
    s = slide.copy()
    if hl:
        sd = ImageDraw.Draw(s, "RGBA")
        x0, y0, x1, y1 = [v * PPI for v in hl]
        # dim the rest of the slide slightly so the highlight reads at a glance
        dim = Image.new("RGBA", (SW, SH), (0, 0, 0, 70))
        ImageDraw.Draw(dim).rounded_rectangle((x0, y0, x1, y1), 12, fill=(0, 0, 0, 0))
        s = Image.alpha_composite(s.convert("RGBA"), dim).convert("RGB")
        sd = ImageDraw.Draw(s)
        sd.rounded_rectangle((x0, y0, x1, y1), 12, outline=AMBER, width=5)
    img.paste(s, (SX, SY), mask)
    d.rounded_rectangle((SX - 2, SY - 2, SX + SW + 1, SY + SH + 1), 15, outline=PERI, width=3)

    # right rail: title + chapter list as a circuit line
    d.text((RAIL_X, SY + 4), "OpsDesk", font=font("head", 56), fill=WHITE)
    d.text((RAIL_X, SY + 78), "VOYAGEHACK 4.0 · Round 1", font=font("body", 19), fill=SOFT)
    d.text((RAIL_X, SY + 104), "Team 404 Error", font=font("bold", 19), fill=MINT)
    y0, step = 200, 76
    lx = RAIL_X + 14
    d.line((lx, y0, lx, y0 + step * (len(CHAPTERS) - 1)), fill=PERI, width=3)
    for i, c in enumerate(CHAPTERS):
        y = y0 + i * step
        active = c == chapter
        r = 11 if active else 8
        d.ellipse((lx - r, y - r, lx + r, y + r), fill=AMBER if active else PERI)
        if active:
            rounded(d, (lx + 24, y - 22, RAIL_X + 330, y + 22), 22, fill=PERI_FILL)
        d.text((lx + 40, y), c, font=font("bold" if active else "body", 24), fill=WHITE if active else SOFT, anchor="lm")

    # bottom bar: who is speaking
    bx0, by0, bx1, by1 = SX, 892, PIP[0] - 22, 1050
    rounded(d, (bx0, by0, bx1, by1), 16, fill=PANEL, outline=PERI, width=2)
    name, role = PEOPLE[speaker]
    d.ellipse((bx0 + 28, by0 + 56, bx0 + 50, by0 + 78), fill=MINT)
    d.text((bx0 + 70, by0 + 30), name, font=font("head", 52), fill=WHITE)
    d.text((bx0 + 72, by0 + 100), role, font=font("body", 24), fill=SOFT)
    d.text((bx1 - 30, by0 + 52), "Topic: Zendesk Automation", font=font("body", 22), fill=SOFT, anchor="rm")
    d.text((bx1 - 30, by0 + 92), "OpsDesk for TBO", font=font("bold", 24), fill=WHITE, anchor="rm")

    # face-cam frame (video is overlaid inside it by ffmpeg)
    px, py, pw, ph = PIP
    rounded(d, (px - 5, py - 5, px + pw + 4, py + ph + 4), 20, fill=PERI)
    return img


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    face = Path(sys.argv[1])
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "video" / "out" / "OpsDesk_Round1_404Error.mp4"
    out.parent.mkdir(parents=True, exist_ok=True)
    dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(face)]).decode())

    with tempfile.TemporaryDirectory() as t:
        tmp = Path(t)
        slides = render_slides(tmp)
        lines = []
        for i, (a, b, sno, spk, chap, hl) in enumerate(TIMELINE):
            b = dur if b is None else b
            p = tmp / f"frame{i}.png"
            compose(slides[sno - 1], spk, chap, hl).save(p)
            lines += [f"file '{p}'", f"duration {b - a:.3f}"]
        lines.append(f"file '{tmp / f'frame{len(TIMELINE) - 1}.png'}'")
        (tmp / "list.txt").write_text("\n".join(lines) + "\n")

        px, py, pw, ph = PIP
        m = Image.new("L", (pw, ph), 0)
        ImageDraw.Draw(m).rounded_rectangle((0, 0, pw - 1, ph - 1), 16, fill=255)
        m.save(tmp / "mask.png")

        fc = (
            f"[0:v]fps=30,format=yuv420p,setsar=1[bg];"
            f"[1:v]scale={pw}:{ph}:force_original_aspect_ratio=increase,crop={pw}:{ph},fps=30,format=rgba[face];"
            f"[2:v]format=gray,scale={pw}:{ph}[m];"
            f"[face][m]alphamerge[pip];"
            f"[bg][pip]overlay={px}:{py}:shortest=1,format=yuv420p[v];"
            f"[1:a]highpass=f=80,afftdn=nf=-25,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000[a]"
        )
        cmd = [
            "ffmpeg", "-y", "-v", "error",
            "-f", "concat", "-safe", "0", "-i", str(tmp / "list.txt"),
            "-i", str(face),
            "-loop", "1", "-i", str(tmp / "mask.png"),
            "-filter_complex", fc, "-map", "[v]", "-map", "[a]",
            "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-tune", "stillimage", "-pix_fmt", "yuv420p", "-r", "30",
            "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", "-t", f"{dur:.3f}", str(out),
        ]
        subprocess.run(cmd, check=True)
        # keep stills for QA
        for i in range(len(TIMELINE)):
            (tmp / f"frame{i}.png").replace(out.parent / f"frame{i}.png")
    print("Wrote", out)


if __name__ == "__main__":
    main()
