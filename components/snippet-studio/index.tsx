"use client";

// components
// hook
import useEditor from "@/lib/hooks/use-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Preview from "./preview";
import ModeButtons from "./mode-buttons";
import CodeCopyButton from "./copy-button";
import CodeEditor from "./code-editor";

interface SnippetStudioProps {
  userHtml?: string;
  userCss?: string;
}

export default function SnippetStudio({
  userHtml = "",
  userCss = "",
}: SnippetStudioProps) {
  const {
    nowMode,
    previewCode,
    isCopied,
    getCurrentCode,
    setCurrentCode,
    changeLangaugeMode,
    handleCopy,
  } = useEditor({
    userHtml,
    userCss,
  });

  return (
    <section className="grid grid-cols-2">
      <div className="relative rounded-l-2xl bg-neutral-600 overflow-auto h-[540px] py-10">
        <Preview previewCode={previewCode} />
      </div>
      <div className="rounded-r-2xl overflow-hidden">
        <ModeButtons
          nowMode={nowMode}
          changeLangaugeMode={changeLangaugeMode}
        />
        <div className="relative h-[500px] bg-neutral-800 rounded">
          <CodeCopyButton isCopied={isCopied} handleCopy={handleCopy} />
          <CodeEditor
            nowMode={nowMode}
            getCurrentCode={getCurrentCode}
            setCurrentCode={setCurrentCode}
          />
        </div>
      </div>
    </section>
  );
}
