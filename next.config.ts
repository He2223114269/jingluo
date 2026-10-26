import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // public/monitor-app 目录没有 index 路由，直接访问目录会 404
      { source: "/monitor-app", destination: "/monitor-app/index.html", permanent: false },
    ];
  },
};

export default nextConfig;
