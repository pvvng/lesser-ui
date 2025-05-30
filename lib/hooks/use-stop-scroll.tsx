"use client";

import { useEffect } from "react";

export default function useStopScoll() {
  // 배경 스크롤 정지
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
}
