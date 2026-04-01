import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Rewrites pour proxy les appels API vers ton back Render
        source: "/api/:path*",
        destination: "https://api-football-gfpz.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;