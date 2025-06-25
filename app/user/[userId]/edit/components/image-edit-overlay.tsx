import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** relative, group 걸린 부모에 edit overlay 씌우는 컴포넌트 */
export default function ImageEditOverlay() {
  return (
    <div
      className="absolute inset-0 bg-black/0 group-hover:bg-black/50
      flex justify-center items-center z-5 transition-colors duration-300"
      aria-hidden
    >
      <FontAwesomeIcon
        icon={faEdit}
        className="text-2xl text-neutral-200 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      />
    </div>
  );
}
