"use client";

import SnippetStudio from "@/components/snippet-studio";
import { menuItems } from "@/lib/constants";
import useScrollReveal from "@/lib/hooks/gsap/use-scroll-reveal";
import useStopScoll from "@/lib/hooks/use-stop-scroll";
import { useWarnOnUnload } from "@/lib/hooks/use-warn-on-unload";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const defaultCode = {
  userHtml: `<!-- This is just an example. Feel free to delete and create your own element! -->
<button class="clover-button">
  🍀 Lucky Clover
</button>
`,
  userCss: `/* This is just an example. Feel free to delete and create your own element! */
.clover-button {
  color: #22c55e;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.clover-button:hover {
  color: white;
  transform: scale(1.05);
  background-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.3);
}
  `,
};

export default function CreateElement() {
  const codeRef = useRef<{ html: string; css: string }>({ html: "", css: "" });
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const action = (formdata: FormData) => {
    console.log(codeRef.current);
    console.log(formdata);
  };

  useWarnOnUnload();

  return (
    <div className="p-5 space-y-5">
      {!selectedTag && (
        <TagSelector confirmChoice={(tag) => setSelectedTag(tag)} />
      )}
      <SnippetStudio {...defaultCode} codeRef={codeRef} />
      <form
        action={action}
        className="w-full p-2 bg-neutral-800 rounded flex justify-between items-center"
      >
        <div
          className="px-4 py-2 hover:bg-neutral-900 rounded transition-colors cursor-pointer"
          onClick={() => setSelectedTag(null)}
        >
          {selectedTag}
        </div>
        <button
          className="rounded px-4 py-2 font-semibold cursor-pointer
         bg-green-500 hover:bg-green-600 transition-colors"
        >
          <FontAwesomeIcon icon={faRocket} /> Submit
        </button>
      </form>
    </div>
  );
}

interface InputWithLabelProps {
  label: string;
  id: string;
  name: string;
}

function InputWithLabel({
  label,
  id,
  name,
  ...rest
}: InputWithLabelProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        id={id}
        className="w-full h-10 bg-neutral-800 ring ring-neutral-600 text-neutral-300 
        focus:ring-2 transition-all px-3 mt-2 rounded focus:outline-none placeholder:text-neutral-500"
        name={name}
        {...rest}
      />
    </div>
  );
}

function TagSelector({
  defaultTag = null,
  confirmChoice,
}: {
  defaultTag?: string | null;
  confirmChoice?: (tag: string | null) => void;
}) {
  const [selected, setSelected] = useState<string | null>(defaultTag ?? null);

  const tagItems = menuItems.filter(
    (item) => item.link !== null && item.link !== "favorites"
  );

  const handleSelect = (tag: string | null) => {
    setSelected(tag);
  };

  useStopScoll();

  return (
    <section
      className="inset-0 fixed w-full h-screen z-100 bg-black/80 p-5 
      flex justify-center items-center"
    >
      <div className="max-w-screen-lg bg-neutral-900 rounded-2xl p-8 space-y-5">
        <p className="font-bold text-3xl text-center">What are you making?</p>
        <div className="grid grid-cols-5 gap-5">
          {tagItems.map((item) => {
            const cardRef = useScrollReveal();

            const isSelected = selected === item.link;
            const classname = isSelected
              ? "bg-green-500 text-white border-green-500"
              : "bg-neutral-800 text-neutral-300 border-neutral-600";

            return (
              <label
                key={item.label}
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
                    value={item.link ?? ""}
                    checked={isSelected}
                    onChange={() => handleSelect(item.link)}
                    className="hidden"
                  />
                  <FontAwesomeIcon icon={item.icon} className="text-2xl" />
                  <p className="font-semibold">{item.label}</p>
                </div>
              </label>
            );
          })}
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
