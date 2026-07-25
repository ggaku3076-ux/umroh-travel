import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.208", "localhost:3000"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
