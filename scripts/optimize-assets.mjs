/**
 * Compress bloated assets without changing import paths:
 * - Huge "SVG" files that embed rasters → compact SVG + compressed PNG
 * - Large PNG/JPEG → recompressed same format (in place)
 * - Videos → copied to public/videos for URL loading (not webpack-bundled)
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetsDir = path.join(root, "src", "assets");
const publicVideosDir = path.join(root, "public", "videos");

const SVG_MIN_BYTES = 180 * 1024;
const RASTER_MIN_BYTES = 250 * 1024;
const MAX_LOGO_EDGE = 384;
const MAX_DEFAULT_EDGE = 1400;
const MAX_BANNER_EDGE = 1800;

function maxEdgeFor(filePath) {
  const lower = filePath.toLowerCase().replace(/\\/g, "/");
  if (
    lower.includes("/logo/") ||
    lower.includes("_logo.") ||
    lower.includes("home/love") ||
    lower.includes("home/marriage") ||
    lower.includes("home/career") ||
    lower.includes("home/money") ||
    lower.includes("home/education") ||
    lower.includes("home/family")
  ) {
    return MAX_LOGO_EDGE;
  }
  if (lower.includes("banner") || lower.includes("background")) {
    return MAX_BANNER_EDGE;
  }
  return MAX_DEFAULT_EDGE;
}

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function extractEmbeddedRaster(svgText) {
  // Figma/export tools sometimes emit non-standard `data:img/png` instead of `data:image/png`.
  const match = svgText.match(
    /data:(?:image|img)\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=\s]+)/i
  );
  if (!match) return null;
  const mime = match[1].toLowerCase();
  const b64 = match[2].replace(/\s+/g, "");
  return {
    buffer: Buffer.from(b64, "base64"),
    format: mime === "jpg" ? "jpeg" : mime,
  };
}

async function rasterToCompactSvg(inputBuffer, edge) {
  const pngBuffer = await sharp(inputBuffer, { limitInputPixels: false })
    .rotate()
    .resize({
      width: edge,
      height: edge,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png({ compressionLevel: 9, quality: 82, effort: 8 })
    .toBuffer();

  const meta = await sharp(pngBuffer).metadata();
  const w = meta.width || edge;
  const h = meta.height || edge;

  // Guard against blank/near-blank rasterizations (single-color placeholders).
  if (!w || !h || pngBuffer.length < 8 * 1024) {
    throw new Error("raster output too small / likely blank");
  }
  const stats = await sharp(pngBuffer).stats();
  const channels = stats.channels || [];
  const mostlyFlat = channels.every((ch) => (ch.stdev ?? 0) < 2.5);
  if (mostlyFlat) {
    throw new Error("raster output is flat/blank");
  }

  const b64 = pngBuffer.toString("base64");
  return {
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <image width="${w}" height="${h}" href="data:image/png;base64,${b64}" xlink:href="data:image/png;base64,${b64}"/>
</svg>
`,
    bytes: pngBuffer.length,
  };
}

async function optimizeSvg(filePath) {
  const before = (await fs.stat(filePath)).size;
  if (before < SVG_MIN_BYTES) return null;

  const edge = maxEdgeFor(filePath);
  const raw = await fs.readFile(filePath, "utf8");
  const embedded = extractEmbeddedRaster(raw);

  // Never rasterize raw SVG via sharp when embeds are missing/non-standard —
  // that previously produced blank gray placeholders.
  if (!embedded) return null;

  let compact;
  try {
    compact = await rasterToCompactSvg(embedded.buffer, edge);
  } catch (err) {
    console.warn(`skip svg ${path.relative(root, filePath)}: ${err.message}`);
    return null;
  }

  const after = Buffer.byteLength(compact.svg);
  if (after >= before * 0.92) return null;

  await fs.writeFile(filePath, compact.svg, "utf8");
  return { file: path.relative(root, filePath), before, after };
}

async function optimizeRaster(filePath) {
  const before = (await fs.stat(filePath)).size;
  if (before < RASTER_MIN_BYTES) return null;

  const ext = path.extname(filePath).toLowerCase();
  const edge = maxEdgeFor(filePath);
  let pipeline = sharp(filePath, { limitInputPixels: false })
    .rotate()
    .resize({
      width: edge,
      height: edge,
      fit: "inside",
      withoutEnlargement: true,
    });

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 80, effort: 8 });
  } else {
    pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
  }

  const out = await pipeline.toBuffer();
  if (out.length >= before * 0.92) return null;

  await fs.writeFile(filePath, out);
  return { file: path.relative(root, filePath), before, after: out.length };
}

async function copyVideos() {
  const videoSrc = path.join(assetsDir, "videos");
  await fs.mkdir(publicVideosDir, { recursive: true });
  const files = await fs.readdir(videoSrc);
  const copied = [];
  for (const name of files) {
    if (!/\.(mp4|webm)$/i.test(name)) continue;
    const from = path.join(videoSrc, name);
    const to = path.join(publicVideosDir, name);
    await fs.copyFile(from, to);
    copied.push(name);
  }

  const matchVideo = path.join(
    assetsDir,
    "home",
    "reports",
    "life partner in horizontal frame.mp4"
  );
  try {
    await fs.access(matchVideo);
    const destName = "life-partner.mp4";
    await fs.copyFile(matchVideo, path.join(publicVideosDir, destName));
    copied.push(destName);
  } catch {
    /* optional */
  }

  return copied;
}

function fmt(n) {
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  const files = await walk(assetsDir);
  const results = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    try {
      if (ext === ".svg") {
        const r = await optimizeSvg(file);
        if (r) results.push(r);
      } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
        const r = await optimizeRaster(file);
        if (r) results.push(r);
      }
    } catch (err) {
      console.warn(`skip ${path.relative(root, file)}: ${err.message}`);
    }
  }

  const videos = await copyVideos();

  let saved = 0;
  for (const r of results) {
    saved += r.before - r.after;
    console.log(
      `✓ ${r.file}: ${fmt(r.before)} → ${fmt(r.after)} (−${fmt(r.before - r.after)})`
    );
  }

  console.log("\n---");
  console.log(`Optimized ${results.length} images, saved ${fmt(saved)}`);
  console.log(`Copied ${videos.length} videos → public/videos/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
