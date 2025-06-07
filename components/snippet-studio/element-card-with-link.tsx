"use client";

import Preview from "../snippet-studio/preview";
import useEditor from "@/lib/hooks/use-editor";
import useScrollReveal from "@/lib/hooks/gsap/use-scroll-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface ElementCardProps {
  elementId: string;
  htmlCode: string;
  cssCode: string;
  revealAnimation?: boolean;
}

export default function ElementCard({
  elementId,
  htmlCode,
  cssCode,
  revealAnimation = false,
}: ElementCardProps) {
  const { previewCode } = useEditor({
    userHtml: htmlCode,
    userCss: cssCode,
  });
  const cardRef = revealAnimation ? useScrollReveal() : null;

  return (
    <div
      className="bg-neutral-800 rounded-2xl aspect-square relative group"
      ref={cardRef}
    >
      <Preview previewCode={previewCode} />
      <Link
        href={`/element/${elementId}`}
        className="bg-neutral-900 px-2 py-1 rounded absolute bottom-2 right-2 cursor-pointer
        transition-opacity duration-500 opacity-0 group-hover:opacity-100 font-sans font-semibold"
      >
        <FontAwesomeIcon icon={faCode} /> get code
      </Link>
    </div>
  );
}
