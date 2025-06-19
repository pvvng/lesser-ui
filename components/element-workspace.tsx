"use client";

// components
import TagSelector from "./tag-selector";
import SnippetStudio from "./snippet-studio";
import SubmitModalContainer from "./submit-modal";
import AdditionalInfoForm from "./additional-info-form";
// util
import { generatePreviewCode } from "@/lib/utils/generate-preview-code";
// hooks
import useWarnOnUnload from "@/lib/hooks/use-warn-on-unload";
// constant
import { tagItems } from "@/lib/constants";
// type
import { ElementDetail, WorkspaceActionResult } from "@/types/core";
// etc
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRocket } from "@fortawesome/free-solid-svg-icons";

interface ElementWorkspaceProps {
  element?: ElementDetail;
  type: "create" | "edit";
  action: (_: unknown, formData: FormData) => Promise<WorkspaceActionResult>;
}

type CodeRef = { html: string; css: string };

/** element create 시 사용하는 예제 코드 */
const exampleCode = {
  userHtml: `<!-- This is just an example. Feel free to delete and create your own element! -->
<button class="clover-button">
  🍀 Lesser UI
</button>
`,
  userCss: `/* This is just an example. Feel free to delete and create your own element! */
.clover-button {
  color: #22c55e;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.clover-button:hover {
  color: white;
  transform: scale(1.05);
  background-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.3);
}
`,
};

export default function ElementWorkspace({
  element,
  type,
  action,
}: ElementWorkspaceProps) {
  // code 저장할 ref
  const codeRef = useRef<CodeRef>({
    html: element?.html || "",
    css: element?.css || "",
  });

  // 프리뷰 코드 생성
  const previewCode = generatePreviewCode({
    html: codeRef.current.html,
    css: codeRef.current.css,
  });

  // tag state
  const [selectedTag, setSelectedTag] = useState<string | null>(
    element?.tag || null
  );
  // form open flag state
  const [isFormOpen, setIsFormOpen] = useState(false);
  // toggle form
  const toggleForm = () => setIsFormOpen((prev) => !prev);

  // 현재 선택된 tag에 대한 icon
  const selectedIcon = tagItems.find((item) => item.tag === selectedTag)?.icon;

  // 현재 모드 확인
  const isCreateMode = type === "create";

  // 새로고침 경고 훅
  useWarnOnUnload();

  return (
    <div className="p-5 space-y-5">
      {!selectedTag && (
        <TagSelector confirmChoice={(tag) => setSelectedTag(tag)} />
      )}
      {isFormOpen && (
        <SubmitModalContainer previewCode={previewCode} closeForm={toggleForm}>
          <AdditionalInfoForm
            selectedTag={selectedTag}
            isCreateMode={isCreateMode}
            userHtml={codeRef.current.html}
            userCss={codeRef.current.css}
            name={element?.name}
            bio={element?.bio}
            elementId={element?.id}
            action={action}
          />
        </SubmitModalContainer>
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
