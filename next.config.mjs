import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid picking a parent lockfile as the workspace root (slows tracing).
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Keep Vite-style imports (`import img from './a.png'`) as URL strings so
    // existing <img src={imported}> usage stays valid. Prefer compressing
    // assets (see scripts/optimize-assets.mjs) over switching every tag to next/image.
    disableStaticImages: true,
    formats: ["image/avif", "image/webp"],
  },
  // Smaller JS payloads when libraries support it
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|bmp|svg|mp4|webm)$/i,
      type: "asset/resource",
    });
    if (dev) {
      // Prevent browser ChunkLoadError timeout during compilation of large chunks
      config.output.chunkLoadTimeout = 120000;
    }
    return config;
  },
};

export default nextConfig;
