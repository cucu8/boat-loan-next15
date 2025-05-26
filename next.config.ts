import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "7229",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
