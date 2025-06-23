"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

/** 아코디언 오픈 애니메이션 커스텀 훅 */
export default function useAccordionOpen({ deps }: { deps: boolean }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (deps && menuRef.current) {
      // 전체 메뉴 박스 등장
      gsap.fromTo(
        menuRef.current,
        {
          opacity: 0,
          y: -10,
          scale: 0.95,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.5)",
        }
      );

      // 개별 옵션들 뽀짝뽀짝 등장
      gsap.fromTo(
        optionRefs.current,
        {
          opacity: 0,
          y: -8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.05, // 💡 하나씩 순차적으로
          ease: "back.out(1.7)",
          delay: 0.1,
        }
      );
    }
  }, [deps]);

  return { menuRef, optionRefs };
}
