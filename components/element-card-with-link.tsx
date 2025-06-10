"use client";

import Preview from "./snippet-studio/preview";
import { generatePreviewCode } from "@/lib/utils/generate-preview-code";
import useScrollReveal from "@/lib/hooks/gsap/use-scroll-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface ElementLinkCardProps {
  elementId: string;
  htmlCode: string;
  cssCode: string;
  revealAnimation?: boolean;
}

export default function ElementLinkCard({
  elementId,
  htmlCode: html,
  cssCode: css,
  revealAnimation = false,
}: ElementLinkCardProps) {
  const previewCode = generatePreviewCode({ html, css });
  const cardRef = revealAnimation ? useScrollReveal() : null;

  return (
    <div
      className="relative w-full aspect-square bg-neutral-800
      flex justify-center items-center rounded-2xl group shadow-lg overflow-hidden"
      ref={cardRef}
    >
      <Preview previewCode={previewCode} />
      <Link
        href={`/element/${elementId}`}
        className="bg-neutral-900 px-2 py-1 rounded absolute bottom-2 right-2 cursor-pointer z-8888
        transition-opacity duration-500 opacity-0 group-hover:opacity-100 font-sans font-semibold"
      >
        <FontAwesomeIcon icon={faCode} /> get code
      </Link>
    </div>
  );
}
