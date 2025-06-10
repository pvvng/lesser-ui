"use client";

// components
import Preview from "../snippet-studio/preview";
import AdditionalInfoForm from "./additional-info-form";
// lib
import { generatePreviewCode } from "@/lib/utils/generate-preview-code";
// hooks
import useSlideBoxes from "@/lib/hooks/gsap/use-slide-boxes";
import useStopScoll from "@/lib/hooks/use-stop-scroll";
// types
import { ElementDetail } from "@/types/core";
// etc
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface SubmitModalProps {
  codeRef: React.RefObject<{
    html: string;
    css: string;
  }>;
  selectedTag: string | null;
  element: ElementDetail;
  closeForm: () => void;
}

export default function SubmitModal({
  codeRef,
  selectedTag,
  element,
  closeForm,
}: SubmitModalProps) {
  const previewCode = generatePreviewCode({
    html: codeRef.current.html,
    css: codeRef.current.css,
  });
  // gsap rendering animation
  const { containerRef, backdropRef } = useSlideBoxes();

  useStopScoll();

  return (
    <div
      ref={backdropRef}
      className="inset-0 fixed w-full h-screen bg-black/80 z-10000
      flex justify-center items-center"
      onClick={closeForm}
    >
      <div
        ref={containerRef}
        className="max-w-screen-lg p-5 grid grid-cols-2 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* preview */}
        <div className="aspect-square bg-neutral-800 rounded-l-2xl relative">
          <Preview previewCode={previewCode} />
          {/* close button */}
          <button
            onClick={closeForm}
            className="absolute top-2 left-2 cursor-pointer flex gap-2 items-center text-sm 
            px-3 py-2 rounded transition-colors hover:bg-neutral-700"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Go Back
          </button>
        </div>
        {/* form */}
        <AdditionalInfoForm
          selectedTag={selectedTag}
          userHtml={codeRef.current.html}
          userCss={codeRef.current.css}
          name={element.name}
          bio={element.bio}
          elementId={element.id}
        />
      </div>
    </div>
  );
}
