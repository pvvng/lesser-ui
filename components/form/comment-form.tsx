"use client";

import { insertComment } from "@/app/element/[id]/actions";
import { CommentWithUser } from "@/types/core";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface CommentFormProps {
  userId: string | null;
  elementId: string;
  addComment?: (newComment: CommentWithUser) => void;
}

export default function CommentForm({
  userId,
  elementId,
  addComment,
}: CommentFormProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentForm = event.currentTarget;
    if (!userId) return alert("로그인이 필요합니다.");
    if (!elementId) return alert("UI 컴포넌트 ID가 필요합니다.");

    const formdata = new FormData(currentForm);
    formdata.append("userId", userId);
    formdata.append("elementId", elementId);

    const { data, error } = await insertComment(formdata);

    if (error) return setErrors([...error]);

    if (!data) {
      return setErrors(["댓글 작성에 실패했습니다."]);
    }

    addComment?.({ ...data }); // 데이터가 성공적으로 삽입되었을 때, 새로운 댓글을 추가

    currentForm.reset();
    return setErrors([]); // 에러 초기화
  };

  return (
    <>
      {errors.map((error, index) => (
        <p key={index} className="ml-1 text-red-400 text-xs mt-2">
          {error}
        </p>
      ))}
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 items-center mt-3 p-3 rounded bg-neutral-800"
      >
        <input
          name="payload"
          className="w-full h-10 ring ring-neutral-600 rounded px-3 transition-all flex justify-center items-center
          placeholder:text-neutral-600 focus:outline-none focus:ring-2"
          placeholder="Send Comment"
          minLength={1}
          maxLength={50}
        />
        <button
          className="shrink-0 w-24 h-10 text-sm fancy-fill-btn 
          flex justify-center items-center gap-1 cursor-pointer"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
          <span>Send</span>
        </button>
      </form>
    </>
  );
}
