"use client";

import { useEffect, useRef } from "react";

interface CodePreviewProps {
  previewCode: string;
}

export default function CodePreview({ previewCode }: CodePreviewProps) {
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
      className="w-full h-full overflow-auto flex justify-center items-center"
    />
  );
}
