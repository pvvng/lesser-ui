"use client";

import SnippetStudio from "@/components/snippet-studio";
import { useRef } from "react";

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

  const action = (formdata: FormData) => {
    console.log(codeRef.current);
    console.log(formdata);
  };

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-semibold">Create Element</h1>
      <SnippetStudio {...defaultCode} codeRef={codeRef} />
      <form action={action} className="space-y-5">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          id="name"
          className="w-full h-10 bg-neutral-200 text-black px-3 mt-2 rounded focus:outline-none"
          name="name"
          placeholder="element name"
          required
        />
        <label htmlFor="bio" className="font-semibold">
          Bio
        </label>
        <input
          id="bio"
          className="w-full h-10 bg-neutral-200 text-black px-3 mt-2 rounded focus:outline-none"
          name="bio"
          placeholder="element bio"
        />
        <button
          className="mt-3 w-full rounded px-3 py-2 font-semibold cursor-pointer
         bg-green-500 hover:bg-green-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
