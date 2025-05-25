"use client";

import LoginButtons from "@/components/auth/oauth-login-button";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Modal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      router.back(); // 모달 닫기
    }
  };

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
      <LoginButtons />
    </div>
  );
}
