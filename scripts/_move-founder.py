from pathlib import Path

path = Path("src/components/Home/AstroHomePage.jsx")
text = path.read_text(encoding="utf-8")

start = text.index('      <section className="astro-section astro-founder"')
end = text.index("      {/* CUSTOMER VIDEOS", start)
founder = text[start:end]
without = text[:start] + text[end:]

# Insert after consult guidance block, before trusted astrologers carousel
marker = '          <div className="astro-experts">'
if marker not in without:
    raise SystemExit("experts marker not found")

# Close the services section before founder, reopen a wrapper for experts+services tiles
# Founder is a full-width section; keep it outside the nested inner cards area.
# Current structure has guidance + experts + AstroServicesSection inside one section.
# Place founder BETWEEN guidance and experts, still inside the inner div — layout uses
# .astro-section which is fine as a nested section.

inserted = without.replace(marker, founder + marker, 1)
path.write_text(inserted, encoding="utf-8")
print("ok moved founder before experts")
print("founder count", inserted.count('className="astro-section astro-founder"'))
