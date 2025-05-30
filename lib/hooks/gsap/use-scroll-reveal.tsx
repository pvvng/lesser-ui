import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * gsap 위에서 아래로 요소 떨어지는 애니메이션
 * @returns containerRef: 애니메이션 사용할 요소에 부착
 */
export default function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: -100,
        scale: 0.8,
        rotate: -15,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // 살짝 더 아래에서 트리거
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return containerRef;
}
