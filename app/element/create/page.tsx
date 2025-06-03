"use client";

// component
import SnippetStudio from "@/components/snippet-studio";
import TagSelector from "@/components/element-create/tag-selector";
import AdditionalInfoForm from "@/components/element-create/additional-info-form";
// custom hook
import useWarnOnUnload from "@/lib/hooks/use-warn-on-unload";
// constant
import { exampleCode, menuItems } from "@/lib/constants";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Preview from "@/components/snippet-studio/preview";

export default function CreateElement() {
  const codeRef = useRef<{ html: string; css: string }>({ html: "", css: "" });
  // tag state
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  // form open flag state
  const [openForm, setOpenForm] = useState(false);

  const handleFormContainer = () => {
    console.log(codeRef.current);
    setOpenForm(true);
  };

  const action = (formdata: FormData) => {
    console.log(codeRef.current);
    console.log(formdata);
  };

  useWarnOnUnload();

  return (
    <div className="p-5 space-y-5">
      {!selectedTag && (
        <TagSelector confirmChoice={(tag) => setSelectedTag(tag)} />
      )}
      {openForm && <AdditionalInfoForm codeRef={codeRef} />}
      {/* code editor */}
      <SnippetStudio {...exampleCode} codeRef={codeRef} />
      <div className="w-full p-2 bg-neutral-800 rounded flex justify-between items-center">
        <div
          className="px-4 py-2 hover:bg-neutral-900 rounded transition-colors cursor-pointer"
          onClick={() => setSelectedTag(null)}
        >
          <input
            name="tag"
            defaultValue={selectedTag || ""}
            disabled
            className="hidden"
          />
          {selectedTag}
        </div>
        <button
          className="rounded px-4 py-2 font-semibold cursor-pointer
         flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-colors"
          onClick={handleFormContainer}
        >
          <FontAwesomeIcon icon={faRocket} /> Submit
        </button>
      </div>
    </div>
  );
}
