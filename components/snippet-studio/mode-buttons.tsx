import { LanguageMode } from "@/types/core";
import Image from "next/image";

interface EditorModeButtonsProps {
  nowMode: LanguageMode;
  changeLangaugeMode: (mode: LanguageMode) => void;
}

export default function ModeButtons({
  nowMode,
  changeLangaugeMode,
}: EditorModeButtonsProps) {
  const getModeColor = (mode: LanguageMode) => {
    return nowMode === mode ? "bg-neutral-800" : "bg-neutral-600";
  };

  return (
    <section className="pt-2 px-4 h-10 bg-neutral-600">
      <div className="flex items-center h-full">
        <button
          className={`${getModeColor(
            "HTML"
          )} flex gap-1 items-center font-sans font-semibold transition-colors 
          px-3 py-1 min-w-[170px] h-full cursor-pointer rounded-t`}
          onClick={() => changeLangaugeMode("HTML")}
        >
          <Image
            src="/html.svg"
            alt="html-icon"
            width={20}
            height={20}
            priority
          />
          <span>HTML</span>
        </button>
        <button
          className={`${getModeColor(
            "CSS"
          )} flex gap-1 items-center font-sans font-semibold transition-colors 
          px-3 py-1 min-w-[170px] h-full cursor-pointer rounded-t`}
          onClick={() => changeLangaugeMode("CSS")}
        >
          <Image
            src="/css.svg"
            alt="css-icon"
            width={20}
            height={20}
            priority
          />
          <span>CSS</span>
        </button>
      </div>
    </section>
  );
}
