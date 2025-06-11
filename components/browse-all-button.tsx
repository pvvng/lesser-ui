"use client";

import gsap from "gsap";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRef } from "react";

export default function BrowseAllLinkButton() {
  const iconRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleEnter = () => {
    // 기존 애니메이션 있으면 정지
    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline();
    tl.to(iconRef.current, {
      y: -12,
      rotate: -20,
      duration: 0.3,
      ease: "power2.out",
    }).to(iconRef.current, {
      y: 0,
      rotate: 0,
      duration: 0.4,
      ease: "bounce.out",
    });

    tlRef.current = tl;
  };

  const handleLeave = () => {
    // 떠나면 즉시 원위치
    if (tlRef.current) tlRef.current.kill();

    gsap.to(iconRef.current, {
      y: 0,
      rotate: 0,
      duration: 0.2,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      className="w-full absolute h-52 bottom-0 bg-gradient-to-b from-transparent 
     to-neutral-900 p-5 flex justify-center items-end pointer-events-none"
    >
      <Link
        href="/elements"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="px-4 py-2 text-lg font-semibold font-sans rounded-2xl pointer-events-auto
        transition-colors bg-green-500 hover:bg-green-600 flex items-center"
      >
        <FontAwesomeIcon icon={faRocket} className="mr-2" ref={iconRef} />
        Browse All Element
      </Link>
    </div>
  );
}
