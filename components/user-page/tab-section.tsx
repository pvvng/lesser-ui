"use client";

import { useState } from "react";

const tabItems = [
  { label: "Favorites" },
  { label: "Elements" },
  { label: "Comments" },
  { label: "Activites" },
];

export default function TabSection() {
  const [nowTab, setNowTab] = useState(0);

  const setTab = (index: number) => {
    setNowTab(index);
  };

  return (
    <div className="mt-15">
      <ul className="flex items-center">
        {tabItems.map((item, idx) => (
          <li
            key={item.label}
            className={`px-3 py-2 font-semibold cursor-pointer transition-colors rounded-t ${
              nowTab === idx ? "bg-neutral-700" : ""
            }`}
            onClick={() => setTab(idx)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <section className="w-full p-5 min-h-[400px] border-2 border-neutral-700 rounded-2xl rounded-tl-none"></section>
    </div>
  );
}
