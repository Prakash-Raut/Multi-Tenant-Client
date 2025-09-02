import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mutli-tenant-app.s3.ap-south-1.amazonaws.com",
      }
    ]
  }
};
