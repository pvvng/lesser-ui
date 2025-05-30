"use client";

import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ElementExplainationProps {
  tag: string;
  elementName: string;
  username: string;
  createdAt: string;
  isFavorite: boolean;
}

export default function ElementExplaination({
  tag,
  elementName,
  username,
  createdAt,
  isFavorite,
}: ElementExplainationProps) {
  return (
    <section className="space-y-6 relative">
      {/* tag */}
      <div className="space-y-3">
        <p className="text-2xl font-semibold">{tag}</p>
        <p className="text-neutral-300">{elementName}</p>
      </div>
      <hr className="border-neutral-700" />
      {/* user datas */}
      <div className="flex gap-3 items-center">
        <div className="size-14 rounded bg-neutral-600"></div>
        <div>
          <p className="text-lg font-semibold">{username}</p>
          <p>{createdAt}</p>
        </div>
      </div>
      {/* favorite button */}
      <button
        className="w-full text-center py-2 flex justify-center items-center gap-2
        bg-neutral-800 hover:bg-neutral-700 transition-colors rounded font-semibold cursor-pointer text-sm"
      >
        <FontAwesomeIcon icon={faBookmark} /> Save to favorites
      </button>
    </section>
  );
}
