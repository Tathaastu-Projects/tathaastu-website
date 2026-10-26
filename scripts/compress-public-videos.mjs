import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const videosDir = path.join(root, "public", "videos");
const ffmpeg =
  process.env.FFMPEG_PATH ||
  "C:\\Users\\Sumit Mishra\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe";

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpeg, args, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    child.stderr.on("data", (d) => {
      err += d.toString();
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(err.slice(-500) || `ffmpeg exit ${code}`));
    });
  });
}

async function compressOne(filePath) {
  const before = fs.statSync(filePath).size;
  const tmp = `${filePath}.tmp.mp4`;
  // Muted UI loops: 720p, no audio, faststart for progressive play
  await run([
    "-y",
    "-i",
    filePath,
    "-vf",
    "scale=-2:720",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "28",
    "-an",
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    tmp,
  ]);
  const after = fs.statSync(tmp).size;
  if (after >= before * 0.95) {
    fs.unlinkSync(tmp);
    return { file: path.basename(filePath), before, after: before, skipped: true };
  }
  fs.renameSync(tmp, filePath);
  return { file: path.basename(filePath), before, after, skipped: false };
}

async function main() {
  if (!fs.existsSync(ffmpeg)) {
    console.error("ffmpeg not found:", ffmpeg);
    process.exit(1);
  }
  const files = fs
    .readdirSync(videosDir)
    .filter((n) => /\.mp4$/i.test(n))
    .map((n) => path.join(videosDir, n));

  let saved = 0;
  for (const file of files) {
    try {
      const r = await compressOne(file);
      const delta = r.before - r.after;
      saved += delta;
      console.log(
        `${r.skipped ? "skip" : "ok "} ${r.file}: ${(r.before / 1e6).toFixed(2)} → ${(r.after / 1e6).toFixed(2)} MB`
      );
    } catch (err) {
      console.warn("fail", path.basename(file), err.message);
    }
  }
  console.log(`Saved ${(saved / 1e6).toFixed(2)} MB in public/videos`);
}

main();
