"use client";

import {
  editComment,
  deleteComment as deleteCommentById,
} from "@/lib/supabase/actions/comments";
import { getKoreanDate } from "@/lib/utils/get-korean-date";
import {
  faBackspace,
  faEdit,
  faSave,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CommentCardProps {
  id: string;
  currentUserId: string | null;
  authorId: string | null;
  avatar: string | null;
  nickname: string | null;
  createdAt: string;
  payload: string;
  deleteComment: (commentId: string) => void;
}

export default function CommentCard({
  id: commentId,
  currentUserId,
  authorId,
  avatar,
  nickname,
  createdAt,
  payload: initialPayload,
  deleteComment,
}: CommentCardProps) {
  const [isEditMode, setisEditMode] = useState(false);
  const [payload, setPayload] = useState(initialPayload);

  const toggleEditButton = () => {
    setisEditMode((prev) => !prev);
  };

  const resetPayload = () => {
    setPayload(initialPayload);
  };

  const isAuthor = currentUserId === authorId;

  return (
    <div className="p-5 bg-neutral-800 rounded-2xl">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <Link
            href={`/user/${authorId}`}
            className="size-12 rounded-full overflow-hidden relative bg-neutral-200"
          >
            <Image
              src={avatar || "/unknown.png"}
              alt={nickname || "탈퇴한 사용자"}
              sizes="48px"
              fill
              className="object-cover"
              draggable={false}
              unoptimized
            />
          </Link>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{nickname || "탈퇴한 사용자"}</p>
            <p className="text-xs text-neutral-400">
              {getKoreanDate(createdAt)}
            </p>
          </div>
        </div>
        <EditButtonBox
          commentId={commentId}
          isAuthor={isAuthor}
          isEditMode={isEditMode}
          payload={payload}
          initialPayload={initialPayload}
          toggleEditButton={toggleEditButton}
          resetPayload={resetPayload}
          deleteComment={deleteComment}
        />
      </div>
      <hr className="border-neutral-600 my-3" />
      {!isEditMode ? (
        <p className="p-1">{payload}</p>
      ) : (
        <input
          className="bg-neutral-600 rounded p-1 focus:outline-none w-full placeholder:text-sm"
          placeholder="변경할 댓글 내용을 입력하세요."
          value={payload}
          required
          onChange={(e) => setPayload(e.target.value)}
          minLength={1}
          maxLength={50}
        />
      )}
    </div>
  );
}

function EditButtonBox({
  commentId,
  isAuthor,
  isEditMode,
  payload,
  initialPayload,
  toggleEditButton,
  resetPayload,
  deleteComment,
}: {
  commentId: string;
  isAuthor: boolean;
  isEditMode: boolean;
  payload: string;
  initialPayload: string;
  toggleEditButton: () => void;
  resetPayload: () => void;
  deleteComment: (commentId: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelEditMode = () => {
    resetPayload();
    toggleEditButton();
  };

  const handleEdit = async () => {
    console.log(initialPayload === payload);
    if (initialPayload === payload) {
      return alert("댓글 내용이 변하지 않았습니다.");
    }

    setIsLoading(true);
    const error = await editComment({ commentId, payload });
    setIsLoading(false);

    if (error) {
      resetPayload();
      return alert(error);
    }
    return toggleEditButton();
  };

  const handleDelete = async () => {
    if (!confirm("정말 이 댓글을 삭제하시겠습니까?")) return;

    setIsLoading(true);
    const error = await deleteCommentById({ commentId });
    setIsLoading(false);

    if (error) return alert(error);
    return deleteComment(commentId);
  };

  if (isLoading) {
    return (
      <p className="text-neutral-100 text-sm">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />{" "}
        <span>요청 처리 중...</span>
      </p>
    );
  }

  if (isAuthor && isEditMode) {
    return (
      <div>
        <button
          className="cursor-pointer px-2 py-1 font-semibold text-sm
          transition-colors hover:bg-neutral-600 rounded text-neutral-300 hover:text-neutral-100"
          onClick={handleCancelEditMode}
        >
          <span>취소</span> <FontAwesomeIcon icon={faBackspace} />
        </button>
        <button
          className="cursor-pointer px-2 py-1 font-semibold text-sm 
          disabled:cursor-not-allowed disabled:text-neutral-500 disabled:hover:bg-transparent 
          transition-colors hover:bg-neutral-600 rounded text-neutral-300 hover:text-neutral-100"
          onClick={handleEdit}
          disabled={initialPayload === payload}
        >
          <span>저장</span> <FontAwesomeIcon icon={faSave} />
        </button>
        <button
          className="cursor-pointer px-2 py-1 font-semibold text-sm
          transition-colors hover:bg-neutral-600 rounded text-neutral-300 hover:text-neutral-100"
          onClick={handleDelete}
        >
          <span>삭제</span> <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  }

  if (isAuthor) {
    return (
      <button
        className="cursor-pointer px-2 py-1 font-semibold text-sm
        transition-colors hover:bg-neutral-600 rounded text-neutral-300 hover:text-neutral-100"
        onClick={toggleEditButton}
      >
        <span>수정</span> <FontAwesomeIcon icon={faEdit} />
      </button>
    );
  }

  return null;
}
