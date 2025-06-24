"use client";

import { faClover } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(SplitText);

export default function HeadingTextSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [animateEnd, setAnimateEnd] = useState(false);

  useLayoutEffect(() => {
    if (!headingRef.current) return;

    // 폰트가 로드될 때까지 기다림
    document.fonts.ready.then(() => {
      const split = new SplitText(headingRef.current, {
        type: "chars",
      });

      // 각 char 요소에 inline-block 적용
      split.chars.forEach((char) => {
        (char as HTMLElement).style.display = "inline-block";
      });

      const tl = gsap.timeline();

      // 각 char 요소에 애니메이션 적용
      tl.from(split.chars, {
        opacity: 0,
        y: 20,
        rotateX: 90,
        duration: 1,
        stagger: 0.04,
        ease: "back.out(1.7)",
      });

      // 타임라인의 "글자 애니 끝나는 시점"에 종료 플래그
      tl.call(() => setAnimateEnd(true));

      return () => split.revert();
    });
  }, []);

  return (
    <section className="my-20">
      <h1
        ref={headingRef}
        className="md:text-8xl text-4xl text-center font-partial leading-tight"
      >
        <span className="block">같이 만들고</span>
        <span className="block">같이 나누는</span>
        <span className="block text-green-500">오픈소스 UI</span>
        <HeadingIcon animateEnd={animateEnd} />
      </h1>
    </section>
  );
}

function HeadingIcon({ animateEnd }: { animateEnd: boolean }) {
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (animateEnd && iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [animateEnd]);

  return (
    <FontAwesomeIcon
      ref={iconRef}
      icon={faClover}
      className={`text-green-500 ${animateEnd ? "opacity-100" : "opacity-0"}`}
    />
  );
}
