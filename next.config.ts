import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // 깃허브
      { hostname: "avatars.githubusercontent.com" },
      // 구글
      { hostname: "imagedelivery.net" },
      // CF
      { hostname: "lh3.googleusercontent.com" },
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
