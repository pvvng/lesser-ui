"use client";

// component
import SnippetStudio from "@/components/snippet-studio";
import TagSelector from "@/components/tag-selector";
import SubmitModal from "@/components/element-create/submit-modal";
// custom hook
import useWarnOnUnload from "@/lib/hooks/use-warn-on-unload";
// constant
import { exampleCode, tagItems } from "@/lib/constants";
// etc
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function CreateElement() {
  const codeRef = useRef<{ html: string; css: string }>({ html: "", css: "" });
  // tag state
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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
          closeForm={toggleForm}
        />
      )}
      {/* code editor */}
      <SnippetStudio {...exampleCode} codeRef={codeRef} />
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
          className="shrink-0 w-28 h-10 fancy-fill-btn 
          flex justify-center items-center gap-1 cursor-pointer"
          onClick={toggleForm}
        >
          <FontAwesomeIcon icon={faRocket} />
          <span>Submit</span>
        </button>
      </div>
    </div>
  );
}
