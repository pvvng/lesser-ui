import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      // 깃허브
      "avatars.githubusercontent.com",
      // 구글
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
