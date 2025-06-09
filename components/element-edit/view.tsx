"use client";

// component
import SnippetStudio from "@/components/snippet-studio";
import TagSelector from "@/components/tag-selector";
import SubmitModal from "./submit-modal";
// custom hook
import useWarnOnUnload from "@/lib/hooks/use-warn-on-unload";
// constant
import { tagItems } from "@/lib/constants";
// actions
import { ElementDetail } from "@/app/element/[id]/actions";
// etc
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function EditElementView({
  element,
}: {
  element: ElementDetail;
}) {
  const codeRef = useRef<{ html: string; css: string }>({
    html: element.html,
    css: element.css,
  });
  // tag state
  const [selectedTag, setSelectedTag] = useState<string | null>(element.tag);
  // form open flag state
  const [isFormOpen, setIsFormOpen] = useState(false);
  // toggle form
  const toggleForm = () => setIsFormOpen((prev) => !prev);

  const selectedIcon = tagItems.find((item) => item.tag === selectedTag)?.icon;

  useWarnOnUnload();

  return (
    <div className="p-5 space-y-5">
      {!selectedTag && (
        <TagSelector confirmChoice={(tag) => setSelectedTag(tag)} />
      )}
      {isFormOpen && (
        <SubmitModal
          codeRef={codeRef}
          selectedTag={selectedTag}
          element={element}
          closeForm={toggleForm}
        />
      )}
      {/* code editor */}
      <SnippetStudio
        userHtml={element.html}
        userCss={element.css}
        codeRef={codeRef}
      />
      <div className="w-full p-2 bg-neutral-800 rounded flex justify-between items-center">
        <div
          className="font-semibold px-4 py-2 hover:bg-neutral-900 rounded transition-colors cursor-pointer"
          onClick={() => setSelectedTag(null)}
        >
          <input
            name="tag"
            defaultValue={selectedTag || ""}
            disabled
            className="hidden"
          />
          <span className="flex items-center gap-1">
            {selectedIcon && (
              <FontAwesomeIcon icon={selectedIcon} className="text-sm" />
            )}
            {selectedTag}
          </span>
        </div>
        <button
          className="rounded px-4 py-2 font-semibold cursor-pointer
         flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-colors"
          onClick={toggleForm}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
      </div>
    </div>
  );
}
