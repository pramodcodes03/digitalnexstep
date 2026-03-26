import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mum-objectstore.e2enetworks.net",
        pathname: "/hdi-multi-tenant/**",
      },
      {
        protocol: "https",
        hostname: "objectstore.e2enetworks.net",
        pathname: "/digitalnexstep/**",
      },
    ],
  },
};

export default nextConfig;
