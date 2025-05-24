"use client";

import Prism from "prismjs";
// editor theme
import "prism-themes/themes/prism-one-dark.css";
// editor highlight
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";

import Editor from "react-simple-code-editor";
import { LanguageMode } from "@/types/core";

interface CodeEditorProps {
  nowMode: LanguageMode;
  getCurrentCode: () => string;
  setCurrentCode: (value: string) => void;
}

export default function CodeEditor({
  nowMode,
  getCurrentCode,
  setCurrentCode,
}: CodeEditorProps) {
  return (
    <div className="h-full w-full overflow-auto pr-4">
      <div className="flex w-full font-mono font-semibold overflow-x-auto min-w-max">
        {/* 줄 번호 */}
        <div className="text-right px-3 py-2.5 select-none text-neutral-400 shrink-0">
          {getCurrentCode()
            .split("\n")
            .map((_, i) => (
              <div key={i} className="w-[2.5rem] h-[1.5em] leading-[1.5em]">
                {i + 1}
              </div>
            ))}
        </div>

        {/* 코드 에디터 */}
        <Editor
          value={getCurrentCode()}
          onValueChange={setCurrentCode}
          highlight={(code) =>
            nowMode === "HTML"
              ? Prism.highlight(code, Prism.languages.markup, "markup")
              : Prism.highlight(code, Prism.languages.css, "css")
          }
          padding={10}
          className="outline-none min-w-max"
          textareaClassName="focus:outline-none"
        />
      </div>
    </div>
  );
}
