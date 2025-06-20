import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CommentSectionLoading() {
  return (
    <div>
      <p className="font-semibold text-lg flex items-center gap-2">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        Comments
      </p>
      <div className="space-y-3 mt-3 max-h-120 overflow-scroll">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-full h-36 bg-neutral-700 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
