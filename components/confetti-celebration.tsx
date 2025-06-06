"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiCelebration({ run }: { run: boolean }) {
  useEffect(() => {
    if (!run) return;

    // 1. confetti 실행
    confetti({
      particleCount: 250,
      spread: 150,
      origin: { y: 0.6 },
    });

    // 2. 1초 후 URL에서 celebration 제거
    const timeout = setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.delete("celebration");

      window.history.replaceState({}, "", url.toString());
    }, 1000);

    return () => clearTimeout(timeout);
  }, [run]);

  return null;
}
