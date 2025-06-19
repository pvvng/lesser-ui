import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingSpinner({
  text,
  loadingDone = false,
  loadingDoneText,
}: {
  text: string;
  loadingDone?: boolean;
  loadingDoneText?: string;
}) {
  return (
    <div className="mt-30 mx-auto font-mono font-semibold text-sm text-center">
      <FontAwesomeIcon
        icon={loadingDone ? faCheck : faSpinner}
        className={loadingDone ? "" : "animate-spin"}
      />{" "}
      <span>{loadingDone ? loadingDoneText : text}</span>
    </div>
  );
}
