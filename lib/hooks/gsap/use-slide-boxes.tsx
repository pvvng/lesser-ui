import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/** 배경(부모), 컨텐츠(자식) 컨테이너를 아래에서 위로 스르륵 하는 애니메이션 */
export default function useSlideBoxes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    tl.fromTo(
      containerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.2" // 살짝 겹쳐지게
    );
  }, []);

  return { containerRef, backdropRef };
}
