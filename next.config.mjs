/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Keep Vite-style imports (`import img from './a.png'`) as URL strings.
    disableStaticImages: true,
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
