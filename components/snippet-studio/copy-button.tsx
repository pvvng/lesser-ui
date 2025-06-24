"use client";

import {
  faClipboard,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { useRef } from "react";

interface CodeCopyButtonProps {
  isCopied: boolean;
  handleCopy: () => void;
}

export default function CodeCopyButton({
  isCopied,
  handleCopy,
}: CodeCopyButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  const onClick = () => {
    handleCopy();

    // 버튼 전체 살짝 눌렸다가 튀기
    gsap.fromTo(
      buttonRef.current,
      { rotation: -5, scale: 0.95 },
      {
        rotation: 0,
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      }
    );

    // 아이콘 펄쩍
    gsap.fromTo(
      iconRef.current,
      { y: 0, rotate: 0 },
      {
        keyframes: [
          { y: -4, rotate: -10 },
          { y: 4, rotate: 10 },
          { y: -2, rotate: -5 },
          { y: 2, rotate: 5 },
          { y: 0, rotate: 0 },
        ],
        duration: 0.6,
        ease: "power1.out",
      }
    );
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="absolute top-4 right-4 z-10 bg-neutral-900/80 text-white 
      text-sm rounded px-3 py-1 font-mono cursor-pointer 
      font-semibold hover:bg-neutral-700"
    >
      <FontAwesomeIcon
        ref={iconRef}
        icon={isCopied ? faClipboardCheck : faClipboard}
        className="mr-2"
      />
      {isCopied ? "복사완료" : "복사"}
    </button>
  );
}
