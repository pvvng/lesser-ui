import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      // 깃허브
      "avatars.githubusercontent.com",
      // 구글
      "lh3.googleusercontent.com",
      // CF
      "imagedelivery.net",
    ],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
