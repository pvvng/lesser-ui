import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RandomElementLoading() {
  return (
    <section className="relative">
      <div className="grid grid-cols-5 gap-5">
        {[...Array(15)].map((_, idx) => (
          <div
            key={idx}
            className="relative w-full aspect-square bg-neutral-800 
            flex justify-center items-center rounded-2xl group shadow-lg overflow-hidden"
          >
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          </div>
        ))}
      </div>
    </section>
  );
}
