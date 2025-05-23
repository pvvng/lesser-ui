"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PANEL_LENTH = 3;

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray<HTMLElement>(".panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        start: "top-=84 top", // navbar 높이 (h-16/64px + p-5/20px)만큼 내려서 시작
        end: () => "+=" + container!.offsetWidth,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative h-[calc(100vh-104px)] flex overflow-hidden`}
      style={{ width: `${PANEL_LENTH}00%` }}
    >
      {[...Array(PANEL_LENTH)].map((_, i) => (
        <div
          key={i}
          className="panel w-screen h-full flex items-center justify-center text-4xl font-bold"
          style={{ backgroundColor: `hsl(${i * 36}, 70%, 50%)` }}
        >
          Panel {i + 1}
        </div>
      ))}
    </section>
  );
}
