"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CodeEditor } from "@/components/code-editor";
import { EditorModeButtons } from "@/components/code-editor-buttons";
import useEditor from "@/lib/hooks/use-editor";
import CodePreview from "@/components/code-editor-preview";

const test_html = `<input type="checkbox" id="checkboxInput"><label for="checkboxInput" class="toggleSwitch"></label>`;
const test_css = `
    #checkboxInput { display: none; }
    .toggleSwitch {
      width: 50px;
      height: 30px;
      background: #444;
      border-radius: 15px;
      position: relative;
      display: block;
      cursor: pointer;
    }
    .toggleSwitch::after {
      content: "";
      position: absolute;
      left: 5px;
      top: 5px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: white;
      transition: transform 0.2s ease;
    }
    #checkboxInput:checked + .toggleSwitch::after {
      transform: translateX(20px);
    }
    #checkboxInput:checked + .toggleSwitch {
      background: #7c3aed;
    }
  `;

export default function CodePlayground() {
  const {
    nowMode,
    previewCode,
    getCurrentCode,
    setCurrentCode,
    changeLangaugeMode,
  } = useEditor({
    userHtml: test_html,
    userCss: test_css,
  });

  return (
    <div className="p-5 grid grid-cols-2 mt-5">
      <div className="relative rounded-l-2xl bg-neutral-600 overflow-auto h-[540px] py-10">
        <CodePreview previewCode={previewCode} />
      </div>
      <div className="rounded-r-2xl overflow-hidden">
        <EditorModeButtons
          nowMode={nowMode}
          changeLangaugeMode={changeLangaugeMode}
        />
        <CodeEditor
          nowMode={nowMode}
          getCurrentCode={getCurrentCode}
          setCurrentCode={setCurrentCode}
        />
      </div>
    </div>
  );
}
