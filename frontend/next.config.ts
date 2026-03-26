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
  allowedDevOrigins: [
    "ditrpindia.com",
    "www.ditrpindia.com",
    "ditrppro.com",
    "www.ditrppro.com",
    "ditrpindia.org",
    "www.ditrpindia.org",
  ],
};

export default nextConfig;
