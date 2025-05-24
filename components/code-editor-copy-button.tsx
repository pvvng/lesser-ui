import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CodeCopyButton({
  handleCopy,
}: {
  handleCopy: () => void;
}) {
  return (
    <button
      onClick={handleCopy}
      className="absolute top-4 right-4 z-10 bg-neutral-900/80 text-white text-sm rounded px-3 py-1 font-mono font-semibold hover:bg-neutral-700 transition"
    >
      <FontAwesomeIcon icon={faClipboard} className="mr-2" />
      Copy
    </button>
  );
}
