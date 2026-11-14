#!/usr/bin/env python3
"""Count spoken words in video-script.md and estimate read time.

Counts only text inside double quotes in the script tables, per section.
Ignores italic parentheticals like *(...)* (alternate lines, trim notes).
Usage: python3 docs/round1/wordcount.py
"""
import re
from pathlib import Path

text = Path(__file__).with_name("video-script.md").read_text(encoding="utf-8")
sections = {
    "Main two-speaker script": "## Main script",
    "Single-narrator variant": "## Single-narrator variant",
    "60-second backup cut": "## 60-second backup cut",
}

def section(start):
    i = text.index(start)
    j = text.find("\n## ", i + 3)
    return text[i: j if j != -1 else None]

def words(s):
    return len(re.findall(r"[A-Za-z0-9][A-Za-z0-9'’\-]*", s))

for name, head in sections.items():
    body = re.sub(r"\*\([^)]*\)\*", "", section(head))
    # only table rows are spoken
    rows = [l for l in body.splitlines() if l.startswith("|") and '"' in l]
    total = 0
    per = {"K": 0, "N": 0, "Both": 0}
    turns = {"K": 0, "N": 0, "Both": 0}
    for row in rows:
        voice = row.rsplit("|", 2)[-2]
        for spk, quote in re.findall(r'\*\*(K|N|Both):\*\*\s*"([^"]+)"', voice):
            per[spk] += words(quote); turns[spk] += 1
        q = " ".join(re.findall(r'"([^"]+)"', voice))
        total += words(q)
    mins = lambda wpm: f"{int(total / wpm)}:{round(total / wpm % 1 * 60):02d}"
    line = f"{name}: {total} words · @130 {mins(130)} · @140 {mins(140)} · @150 {mins(150)}"
    if any(per.values()):
        line += f" · K {per['K']} words/{turns['K']} turns · N {per['N']} words/{turns['N']} turns · Both {per['Both']}"
    print(line)
