import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "public", "Reels");
// Must NOT be "reels" — on Windows that collides with "Reels" and overwrites masters.
const outDir = path.join(root, "public", "reel-media");
const ffmpeg =
  process.env.FFMPEG_PATH ||
  "C:\\Users\\Sumit Mishra\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe";

const MAP = [
  { file: "7 mukhi rudraksh.mp4", out: "7-mukhi-rudraksha.mp4" },
  { file: "amethyst.mp4", out: "amethyst.mp4" },
  { file: "Green Aventurine.mp4", out: "green-aventurine.mp4" },
  { file: "Libra.mp4", out: "libra.mp4" },
  { file: "Money Magnet Pyramid.mp4", out: "money-magnet-pyramid.mp4" },
  { file: "Replace of annupurna pyramid- Clear Quartz.mp4", out: "clear-quartz.mp4" },
  { file: "Replace of lapis lazuli- Sulemani Hakik.mp4", out: "sulemani-hakik.mp4" },
  { file: "Tiger Eye.mp4", out: "tiger-eye.mp4" },
  { file: "virgo.mp4", out: "virgo.mp4" },
];

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpeg, args, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    child.stderr.on("data", (d) => {
      err += d.toString();
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(err.slice(-400) || `ffmpeg exit ${code}`));
    });
  });
}

async function main() {
  if (!fs.existsSync(ffmpeg)) {
    console.error("ffmpeg missing");
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });

  for (const item of MAP) {
    const input = path.join(srcDir, item.file);
    const output = path.join(outDir, item.out);
    if (!fs.existsSync(input)) {
      console.log("missing", item.file);
      continue;
    }
    const before = fs.statSync(input).size;
    if (before < 500 * 1024) {
      console.log("skip-too-small (restore original first)", item.file, `${(before / 1e6).toFixed(2)} MB`);
      continue;
    }
    // Never write into the source folder / same path
    if (path.resolve(input) === path.resolve(output)) {
      console.log("skip-same-path", item.file);
      continue;
    }
    await run([
      "-y",
      "-i",
      input,
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
      output,
    ]);
    const after = fs.statSync(output).size;
    console.log(
      `ok ${item.out}: ${(before / 1e6).toFixed(2)} → ${(after / 1e6).toFixed(2)} MB`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
