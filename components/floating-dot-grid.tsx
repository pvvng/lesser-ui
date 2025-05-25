"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function FloatingDotsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dots = gridRef.current?.querySelectorAll("span");
    if (!dots) return;

    dots.forEach((dot) => {
      gsap.to(dot, {
        y: () => Math.random() * 100 - 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 3 + Math.random() * 2,
        delay: Math.random(),
      });
    });
  }, []);

  return (
    <div
      ref={gridRef}
      className="absolute w-full h-full grid grid-cols-[repeat(auto-fill,_minmax(24px,_1fr))] 
        grid-rows-[repeat(auto-fill,_24px)] pointer-events-none"
    >
      {Array.from({ length: 560 }).map((_, i) => (
        <span
          key={i}
          className="size-1 bg-green-500/10 rounded-full inline-block"
        />
      ))}
    </div>
  );
}
