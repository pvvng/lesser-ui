"use client";

// components
import Preview from "./snippet-studio/preview";
// hooks
import useScrollReveal from "@/lib/hooks/gsap/use-scroll-reveal";
import useEditor from "@/lib/hooks/use-editor";
// type
import { Element } from "@/types/core";
// etc
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ElementLinkCard({ element }: { element: Element }) {
  const cardRef = useScrollReveal();

  const { previewCode } = useEditor({
    userHtml: element.html,
    userCss: element.css,
  });

  return (
    <div
      ref={cardRef}
      className="relative w-full aspect-square bg-neutral-800 
      flex justify-center items-center rounded-2xl group shadow-lg overflow-hidden"
    >
      <Preview previewCode={previewCode} />
      <Link
        href={`/element/${element.id}`}
        className="bg-neutral-900 px-2 py-1 rounded absolute bottom-2 right-2 cursor-pointer z-10000
        transition-opacity duration-500 opacity-0 group-hover:opacity-100 font-sans font-semibold"
      >
        <FontAwesomeIcon icon={faCode} /> get code
      </Link>
    </div>
  );
}
