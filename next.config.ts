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
  // 빌드 시 ESLint 오류 무시
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
