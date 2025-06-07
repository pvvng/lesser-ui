"use client";

import { insertComment } from "@/app/element/[id]/actions";
import { Comment } from "@/types/core";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startTransition, useActionState, useEffect } from "react";

interface CommentFormProps {
  userId: string | null;
  elementId: string;
  addComment?: (newComment: Comment) => void;
}

export default function CommentForm({
  userId,
  elementId,
  addComment,
}: CommentFormProps) {
  const [state, action] = useActionState(insertComment, null);

  // TODO: 지금 useActionState를 사용하고 있는데, 이게 서버 액션을 사용하기 위한 최적의 방법인지 확인 필요
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

  useEffect(() => {
    if (state?.data) {
      addComment?.(state.data);
    }
  }, [state?.data]);

  return (
    <>
      {state &&
        state.error &&
        state.error?.length > 0 &&
        state.error.map((error, index) => (
          <p key={index} className="text-red-400 text-xs mt-2">
            {error}
          </p>
        ))}
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 items-center mt-3 p-3 rounded-2xl bg-neutral-800"
      >
        <input
          name="payload"
          className="w-full h-10 ring ring-neutral-600 rounded-2xl px-3 transition-all flex justify-center items-center
          placeholder:text-neutral-600 placeholder:text-sm focus:outline-none focus:ring-2"
          placeholder="Send Comment"
          minLength={1}
          maxLength={50}
        />
        <button
          className="rounded-2xl ring transition shrink-0 w-24 h-10 cursor-pointer font-semibold text-sm 
          ring-green-500 bg-green-500 hover:bg-green-600 hover:ring-green-600 
          flex justify-center items-center gap-1"
        >
          <FontAwesomeIcon icon={faPaperPlane} /> Send
        </button>
      </form>
    </>
  );
}
