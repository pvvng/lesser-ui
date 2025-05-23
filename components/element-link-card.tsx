"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef } from "react";
import useScrollReveal from "@/lib/hooks/gsap/use-scroll-reveal";

gsap.registerPlugin(ScrollTrigger);

export default function ElementLinkCard({ item }: { item: any }) {
  const cardRef = useScrollReveal();

  return (
    <Link
      href={"#"}
      ref={cardRef}
      className="relative w-full aspect-square bg-neutral-700 
      flex justify-center items-center rounded-2xl group shadow-lg"
    >
      <div
        className="bg-neutral-900 px-2 py-1 rounded absolute bottom-2 right-2 cursor-pointer 
        transition-opacity duration-500 opacity-0 group-hover:opacity-100 font-sans font-semibold"
      >
        <FontAwesomeIcon icon={faCode} /> get code
      </div>
    </Link>
  );
}
