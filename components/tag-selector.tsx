import useScrollReveal from "@/lib/hooks/gsap/use-scroll-reveal";
import useStopScoll from "@/lib/hooks/use-stop-scroll";
import { tagItems } from "@/lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function TagSelector({
  defaultTag = null,
  confirmChoice,
}: {
  defaultTag?: string | null;
  confirmChoice?: (tag: string | null) => void;
}) {
  const [selected, setSelected] = useState<string | null>(defaultTag ?? null);

  const handleSelect = (tag: string | null) => setSelected(tag);

  useStopScoll();

  return (
    <section
      className="inset-0 fixed w-full h-screen z-100 bg-black/80 p-5 
      flex justify-center items-center"
    >
      <div className="max-w-screen-lg bg-neutral-900 rounded-2xl p-8 space-y-5">
        <p className="font-bold text-3xl text-center">What are you making?</p>
        <div className="grid grid-cols-5 gap-5">
          {tagItems.map((item) => (
            <TagCard
              key={item.tag}
              selected={selected}
              {...item}
              handleSelect={handleSelect}
            />
          ))}
        </div>
        <button
          className="w-full bg-green-500 px-4 py-2 font-semibold rounded cursor-pointer 
          disabled:cursor-not-allowed disabled:bg-neutral-700"
          disabled={!Boolean(selected)}
          onClick={() => confirmChoice?.(selected)}
        >
          Continue
        </button>
      </div>
    </section>
  );
}

interface TagCardProps {
  selected: string | null;
  tag: string;
  icon: IconDefinition;
  handleSelect: (tag: string | null) => void;
}

function TagCard({ selected, tag, icon, handleSelect }: TagCardProps) {
  const cardRef = useScrollReveal();

  const isSelected = selected === tag;
  const classname = isSelected
    ? "bg-green-500 text-white border-green-500"
    : "bg-neutral-800 text-neutral-300 border-neutral-600";

  return (
    <label
      ref={cardRef}
      className={
        "cursor-pointer aspect-square px-4 py-2 rounded-lg border-2 hover:border-green-500 transition-colors " +
        classname
      }
    >
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
        <input
          type="radio"
          name="tag"
          value={tag ?? ""}
          checked={isSelected}
          onChange={() => handleSelect(tag)}
          className="hidden"
        />
        <FontAwesomeIcon icon={icon} className="text-2xl" />
        <p className="font-semibold text-center">{tag}</p>
      </div>
    </label>
  );
}
