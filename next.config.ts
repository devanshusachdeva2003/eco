import type { NextConfig } from "next";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",  // 👈 ADD THIS
      },
    ],
  },
};

export default nextConfig;
