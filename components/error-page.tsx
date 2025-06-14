"use client";

import { useLayoutEffect, useRef } from "react";
import { faClover } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import Link from "next/link";

const errorMap = {
  404: "해당 페이지는 존재하지 않거나 이동되었습니다.",
  401: "해당 페이지에 대한 접근 권한이 없습니다.",
};

export default function ErrorPage({ errorCode }: { errorCode: 404 | 401 }) {
  const leftCloverRef = useRef(null);
  const rightCloverRef = useRef(null);
  const mainTextRef = useRef(null);
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [leftCloverRef.current, rightCloverRef.current],
        {
          y: -100,
          opacity: 0,
          rotate: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.2,
          duration: 1,
          ease: "back.out(1.7)",
        }
      );

      gsap.fromTo(
        mainTextRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "bounce.out",
          delay: 0.5,
        }
      );

      gsap.fromTo(
        buttonRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 1.2,
          ease: "power2.out",
        }
      );

      // fade-in 전체 wrapper
      gsap.to(wrapperRef.current, {
        opacity: 1,
        duration: 0.2,
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="mt-30 flex flex-col justify-center items-center gap-8 opacity-0"
    >
      <div className="flex items-center gap-3 font-bold">
        <FontAwesomeIcon
          icon={faClover}
          className="text-green-500 text-8xl -mt-1"
          ref={leftCloverRef}
        />
        <span
          ref={mainTextRef}
          className="text-white drop-shadow-lg text-8xl font-partial"
        >
          {errorCode}
        </span>
        <FontAwesomeIcon
          icon={faClover}
          className="text-green-500 text-8xl mt-9"
          ref={rightCloverRef}
        />
      </div>
      <p className="text-neutral-400 text-lg">{errorMap[errorCode]}</p>
      <Link
        href="/"
        ref={buttonRef}
        className="bg-neutral-500 hover:bg-neutral-600 px-4 py-2 text-white 
        font-semibold rounded-xl shadow-md transition opacity-0"
      >
        메인페이지로 이동
      </Link>
    </div>
  );
}
