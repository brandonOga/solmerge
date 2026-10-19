import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the root to this folder; a lockfile higher up (C:\Projects) otherwise
  // makes Turbopack resolve packages from the wrong node_modules.
  turbopack: {
    root: __dirname,
  },
  // Let the dev server (HMR socket, dev assets) answer when the site is opened
  // by LAN/virtual-adapter IP rather than localhost.
  allowedDevOrigins: ["172.29.16.1"],
};

export default nextConfig;
