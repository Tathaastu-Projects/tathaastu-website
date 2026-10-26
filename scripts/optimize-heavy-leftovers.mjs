import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  "src/assets/Number.jpeg",
  "src/assets/Asstrology.jpeg",
  "src/assets/Pet healing.jpeg",
  "src/assets/home_banner_3.jpeg",
  "src/assets/home_banner_1.png",
  "src/assets/about/dr_priyanka_singh.jpg",
  "src/assets/vaastu_course3.svg",
  "src/assets/vaastu_course9.svg",
  "src/assets/contact_us_banner.svg",
  "src/assets/AnkitImg.svg",
  "src/assets/service2.svg",
  "src/assets/Numerology.svg",
];

function extractEmbedded(svgText) {
  const match = svgText.match(
    /data:(?:image|img)\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=\s]+)/i
  );
  if (!match) return null;
  return Buffer.from(match[2].replace(/\s+/g, ""), "base64");
}

async function compactSvg(file, before) {
  const raw = fs.readFileSync(file, "utf8");
  const embedded = extractEmbedded(raw);
  const input = embedded || fs.readFileSync(file);
  const png = await sharp(input, { limitInputPixels: false })
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 70, effort: 8 })
    .toBuffer();
  const meta = await sharp(png).metadata();
  const b64 = png.toString("base64");
  const svg = `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${meta.width}" height="${meta.height}" viewBox="0 0 ${meta.width} ${meta.height}"><image width="${meta.width}" height="${meta.height}" href="data:image/png;base64,${b64}" xlink:href="data:image/png;base64,${b64}"/></svg>`;
  if (Buffer.byteLength(svg) >= before * 0.95) return null;
  fs.writeFileSync(file, svg);
  return Buffer.byteLength(svg);
}

async function main() {
  for (const rel of targets) {
    const file = path.join(root, rel);
    if (!fs.existsSync(file)) {
      console.log("missing", rel);
      continue;
    }
    const before = fs.statSync(file).size;
    const ext = path.extname(file).toLowerCase();
    try {
      let after = null;
      if (ext === ".svg") {
        after = await compactSvg(file, before);
      } else if (ext === ".png") {
        const out = await sharp(file)
          .rotate()
          .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
          .png({ compressionLevel: 9, palette: true, quality: 75, effort: 8 })
          .toBuffer();
        if (out.length < before * 0.95) {
          fs.writeFileSync(file, out);
          after = out.length;
        }
      } else {
        const out = await sharp(file)
          .rotate()
          .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 72, mozjpeg: true })
          .toBuffer();
        if (out.length < before * 0.95) {
          fs.writeFileSync(file, out);
          after = out.length;
        }
      }
      if (after == null) console.log("skip", rel);
      else
        console.log(
          "ok",
          rel,
          `${(before / 1e6).toFixed(2)} → ${(after / 1e6).toFixed(2)} MB`
        );
    } catch (err) {
      console.log("fail", rel, err.message);
    }
  }
}

main();
