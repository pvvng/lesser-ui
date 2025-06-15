"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

/**
 * DOM 요소를 슬라이드 업하는 애니메이션
 * @param deps - dependency
 * @returns contentRef
 */
export default function useSlideUp<T>(deps?: T) {
  const contentRef = useRef<HTMLDivElement>(null);

  /** DOM의 정확한 위치 계산시 사용하는 useLayoutEffect */
  useLayoutEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, [deps]);

  return contentRef;
}
