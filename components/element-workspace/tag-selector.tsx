import TagCard from "./tag-card";
import useStopScoll from "@/lib/hooks/use-stop-scroll";
import { tagItems } from "@/lib/constants";
import { useState } from "react";
import Image from "next/image";

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
      className="inset-0 fixed w-full h-screen z-10000 bg-black/80 p-5 
      flex justify-center items-center"
    >
      <div className="max-w-screen-lg bg-neutral-900 rounded-2xl p-8 space-y-5">
        <p className="font-bold text-3xl text-center">What are you making?</p>
        <div className="grid grid-cols-4 gap-5">
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
