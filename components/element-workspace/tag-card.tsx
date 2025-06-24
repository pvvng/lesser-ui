"use client";

import useScrollReveal from "@/lib/hooks/gsap/use-scroll-reveal";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TagCardProps {
  selected: string | null;
  tag: string;
  icon: IconDefinition;
  handleSelect: (tag: string | null) => void;
}

export default function TagCard({
  selected,
  tag,
  icon,
  handleSelect,
}: TagCardProps) {
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
