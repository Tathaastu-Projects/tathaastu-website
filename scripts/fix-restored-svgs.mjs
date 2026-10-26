/**
 * Safely re-compress the Guidance/report SVGs that were restored from git.
 * Uses data:img/png extraction (Figma export mime) + blank guards.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  "src/assets/home/Priyanka Mam.svg",
  "src/assets/home/reports/Numerlogy Report.svg",
  "src/assets/home/reports/Kundli Consultation.svg",
];

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.toLowerCase().endsWith(".svg")) out.push(full);
  }
  return out;
}

function extract(bufOrText) {
  const text = Buffer.isBuffer(bufOrText) ? bufOrText.toString("utf8") : bufOrText;
  const match = text.match(
    /data:(?:image|img)\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=\s]+)/i
  );
  if (!match) return null;
  return Buffer.from(match[2].replace(/\s+/g, ""), "base64");
}

async function optimizeOne(filePath, edge = 1200) {
  const before = (await fs.stat(filePath)).size;
  const raw = await fs.readFile(filePath, "utf8");
  const embedded = extract(raw);
  if (!embedded) {
    console.log("no-embed", path.relative(root, filePath));
    return;
  }

  const png = await sharp(embedded, { limitInputPixels: false })
    .rotate()
    .resize({ width: edge, height: edge, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 82, effort: 8 })
    .toBuffer();

  const meta = await sharp(png).metadata();
  const stats = await sharp(png).stats();
  const flat = (stats.channels || []).every((ch) => (ch.stdev ?? 0) < 2.5);
  if (flat || png.length < 8 * 1024) {
    console.log("reject-blank", path.relative(root, filePath));
    return;
  }

  const b64 = png.toString("base64");
  const w = meta.width;
  const h = meta.height;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <image width="${w}" height="${h}" href="data:image/png;base64,${b64}" xlink:href="data:image/png;base64,${b64}"/>
</svg>
`;
  const after = Buffer.byteLength(svg);
  if (after >= before * 0.98) {
    console.log("skip-gain", path.relative(root, filePath));
    return;
  }
  await fs.writeFile(filePath, svg, "utf8");
  console.log(
    "ok",
    path.relative(root, filePath),
    `${(before / 1e6).toFixed(2)} → ${(after / 1e6).toFixed(2)} MB`
  );
}

async function main() {
  const guidance = await walk(path.join(root, "src/assets/home/Guidance"));
  const files = [
    ...targets.map((t) => path.join(root, t)),
    ...guidance,
    ...(await walk(path.join(root, "src/assets/services/Service Banners"))),
  ];

  for (const file of files) {
    try {
      const edge = /reports|banner/i.test(file) ? 1600 : 900;
      await optimizeOne(file, edge);
    } catch (err) {
      console.log("fail", path.relative(root, file), err.message);
    }
  }
}

main();
