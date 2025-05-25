"use client";

import AuthShowcaseCard from "@/components/auth/auth-showcase-card";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function LoginModal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      router.back(); // 모달 닫기
    }
  };

  // 배경 스크롤 정지
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleBackgroundClick}
      className="w-full h-screen flex justify-center items-center fixed overflow-hidden z-100 inset-0 bg-neutral-600/80"
    >
      <div className="max-w-screen-sm">
        <AuthShowcaseCard />
      </div>
    </div>
  );
}
