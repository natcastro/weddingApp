import type { NextConfig } from "next";

// Proxy target (like DinoCamp's VITE_API_TARGET) - backend URL for /api/* rewrites
const apiTarget = process.env.API_TARGET ?? "http://localhost:5002";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${apiTarget}/api/:path*` },
    ];
  },
};

export default nextConfig;
