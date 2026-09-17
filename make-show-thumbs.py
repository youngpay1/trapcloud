"""Generate <name>-thumb.webp (<=400px) and <name>-web.webp (<=1600px) next to every JPEG/PNG
in public/shows. src/pages/Archive.tsx maps the original path to these variants, so run this
after sync-media.ps1 (which wipes and recopies public/shows and does not create them).

    python make-show-thumbs.py public/shows

Requires Pillow (pip install pillow). Originals are left untouched.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

root = Path(sys.argv[1])
exts = {".jpg", ".jpeg", ".png"}
before = after_thumb = after_web = 0
rows = []
for p in sorted(root.rglob("*")):
    if p.suffix.lower() not in exts or p.stem.endswith(("-thumb", "-web")):
        continue
    im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
    out = {}
    for suffix, maxw, q in (("thumb", 400, 80), ("web", 1600, 82)):
        target = p.with_name(f"{p.stem}-{suffix}.webp")
        copy = im.copy()
        if copy.width > maxw:
            copy.thumbnail((maxw, maxw * 100), Image.LANCZOS)
        copy.save(target, "WEBP", quality=q, method=6)
        out[suffix] = target.stat().st_size
    orig = p.stat().st_size
    before += orig
    after_thumb += out["thumb"]
    after_web += out["web"]
    rows.append((str(p.relative_to(root)), orig, out["thumb"], out["web"], im.size))

for r in rows:
    print(f"{r[0]:45s} {r[1]/1e6:7.2f} MB -> thumb {r[2]/1e3:6.0f} KB, web {r[3]/1e3:6.0f} KB  ({r[4][0]}x{r[4][1]})")
print(f"\nORIGINALS {before/1e6:.1f} MB | THUMBS {after_thumb/1e6:.2f} MB | WEB {after_web/1e6:.2f} MB | files {len(rows)}")
