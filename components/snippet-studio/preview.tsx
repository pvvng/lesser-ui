"use client";

import { useEffect, useRef } from "react";

interface PreviewProps {
  previewCode: string;
}

export default function Preview({ previewCode }: PreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = containerRef.current!;
    // Shadow DOM이 이미 붙어 있으면 재사용
    const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });

    // Shadow DOM 내부에 안전하게 HTML + CSS 삽입
    shadow.innerHTML = previewCode;
  }, [previewCode]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden flex justify-center items-center p-5"
    />
  );
}
