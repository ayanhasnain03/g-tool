import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "8w23nzz55v.ufs.sh",
        port: "",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during build
  },
};

export default nextConfig;
