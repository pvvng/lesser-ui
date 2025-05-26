"use client";

import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CommentForm() {
  return (
    <form>
      <p className="font-semibold text-lg flex items-center gap-2">
        <FontAwesomeIcon icon={faComment} />
        Comments
      </p>
      <div className="flex gap-3 items-center mt-3 p-5 rounded bg-neutral-800">
        <input
          className="w-full h-10 ring ring-neutral-700 rounded px-3 transition-all 
          placeholder:text-neutral-600 focus:outline-none focus:ring-2"
          placeholder="Send Comment"
        />
        <button className="rounded ring ring-green-500 bg-green-500 w-28 h-10 flex justify-center items-center cursor-pointer font-semibold">
          Send
        </button>
      </div>
    </form>
  );
}
