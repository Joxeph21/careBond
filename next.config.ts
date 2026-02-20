import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "195.15.222.27",
        port: "9000",
      },
      {
        protocol: "https",
        hostname: "upload.carebond.ch",
      },
    ],
  },
};

export default nextConfig;
