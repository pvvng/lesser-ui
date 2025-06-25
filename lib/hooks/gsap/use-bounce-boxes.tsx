import gsap from "gsap";
import { useEffect, useRef } from "react";

/** 모달 최초 렌더링 시 튕기는 애니메이션 */
export default function useBounceBoxes() {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRef.current || !backdropRef.current) return;

    // 배경 페이드인
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    // 모달 박스 줌-인 & 바운스
    gsap.fromTo(
      modalRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  return { modalRef, backdropRef };
}
