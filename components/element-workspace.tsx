"use client";

// components
import TagSelector from "./tag-selector";
import SnippetStudio from "./snippet-studio";
import SubmitModal from "./submit-modal";
// hooks
import useWarnOnUnload from "@/lib/hooks/use-warn-on-unload";
// constant
import { exampleCode, tagItems } from "@/lib/constants";
// type
import { ElementDetail } from "@/types/core";
// etc
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRocket } from "@fortawesome/free-solid-svg-icons";

interface ElementWorkspaceProps {
  element?: ElementDetail;
  type: "create" | "edit";
}

type CodeRef = { html: string; css: string };

export default function ElementWorkspace({
  element,
  type,
}: ElementWorkspaceProps) {
  const codeRef = useRef<CodeRef>({
    html: element?.html || "",
    css: element?.css || "",
  });

  // tag state
  const [selectedTag, setSelectedTag] = useState<string | null>(
    element?.tag || null
  );
  // form open flag state
  const [isFormOpen, setIsFormOpen] = useState(false);
  // toggle form
  const toggleForm = () => setIsFormOpen((prev) => !prev);

  const selectedIcon = tagItems.find((item) => item.tag === selectedTag)?.icon;

  const isCreateMode = type === "create";

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
          isCreateMode={isCreateMode}
          closeForm={toggleForm}
        />
      )}
      {/* code editor */}
      <SnippetStudio
        userHtml={element?.html || exampleCode.userHtml}
        userCss={element?.css || exampleCode.userCss}
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
          <FontAwesomeIcon icon={isCreateMode ? faRocket : faEdit} />{" "}
          {isCreateMode ? "Submit" : "Edit"}
        </button>
      </div>
    </div>
  );
}
