"use client";

import { insertComment } from "@/app/element/[id]/actions";
import { faComment, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startTransition, useActionState } from "react";

interface CommentFormProps {
  userId: string | null;
  elementId: string;
}

export default function CommentForm({ userId, elementId }: CommentFormProps) {
  const [state, action] = useActionState(insertComment, null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!userId) return alert("로그인이 필요합니다.");
    if (!elementId) return alert("UI 요소 ID가 필요합니다.");

    event.preventDefault();

    const formdata = new FormData(event.currentTarget);
    formdata.append("userId", userId);
    formdata.append("elementId", elementId);

    startTransition(() => {
      action(formdata);
    });

    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="font-semibold text-lg flex items-center gap-2">
        <FontAwesomeIcon icon={faComment} />
        Comments
      </p>
      {state &&
        state.length > 0 &&
        state.map((error, index) => (
          <p key={index} className="text-red-400 text-xs mt-2">
            {error}
          </p>
        ))}
      <div className="flex gap-3 items-center mt-3 p-3 rounded bg-neutral-800">
        <input
          name="payload"
          className="w-full h-8 ring ring-neutral-600 rounded px-3 transition-all flex justify-center items-center
          placeholder:text-neutral-600 placeholder:text-sm focus:outline-none focus:ring-2"
          placeholder="Send Comment"
          minLength={1}
          maxLength={50}
        />
        <button
          className="rounded ring transition shrink-0 w-24 h-8 cursor-pointer font-semibold text-sm 
          ring-green-500 bg-green-500 hover:bg-green-600 hover:ring-green-600 
          flex justify-center items-center gap-1"
        >
          <FontAwesomeIcon icon={faPaperPlane} /> Send
        </button>
      </div>
    </form>
  );
}
