"use client";

import { useEffect } from "react";

/**
 * 새로고침하거나 탭 닫을 때 경고창 띄워주는 커스텀 훅
 */
export default function useWarnOnUnload() {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);
}
