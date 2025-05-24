import {
  faClipboard,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CodeCopyButtonProps {
  isCopied: boolean;
  handleCopy: () => void;
}

export default function CodeCopyButton({
  isCopied,
  handleCopy,
}: CodeCopyButtonProps) {
  return (
    <button
      onClick={handleCopy}
      className="absolute top-4 right-4 z-10 bg-neutral-900/80 text-white 
      text-sm rounded px-3 py-1 font-mono cursor-pointer 
      font-semibold hover:bg-neutral-700 transition"
    >
      <FontAwesomeIcon
        icon={isCopied ? faClipboardCheck : faClipboard}
        className="mr-2"
      />
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
}
