import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow opening dev site from phone/LAN (e.g. http://192.168.x.x:3000)
  allowedDevOrigins: ["192.168.0.101", "192.168.0.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/curriculum", destination: "/#curriculum", permanent: true },
      { source: "/policies", destination: "/#policies", permanent: true },
    ];
  },
};

export default nextConfig;
