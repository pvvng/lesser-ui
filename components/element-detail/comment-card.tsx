"use client";

import { deleteComment, editComment } from "@/app/element/[id]/actions";
import { getKoreanDate } from "@/lib/utils/get-korean-date";
import {
  faBackspace,
  faEdit,
  faSave,
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

// TODO: 코멘트 변경 취소 시 기존 payload로 되돌리는 방법 생각하기
// form을 사용하지 않고 button의 ajax로만 edit과 delete 컨트롤하는게 맞는 방식인지 고민하기
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
          defaultValue={payload}
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
  toggleEditButton,
  resetPayload,
  deleteComment: handleDeleteComment,
}: {
  commentId: string;
  isAuthor: boolean;
  isEditMode: boolean;
  payload: string;
  toggleEditButton: () => void;
  resetPayload: () => void;
  deleteComment: (commentId: string) => void;
}) {
  const handleEdit = async () => {
    const error = await editComment({ commentId, payload });
    if (error) {
      resetPayload();
      return alert(error);
    }
    return toggleEditButton();
  };

  const handleDelete = async () => {
    const error = await deleteComment({ commentId });
    if (error) return alert(error);
    return handleDeleteComment(commentId);
  };

  if (isAuthor && isEditMode) {
    return (
      <div>
        <button
          className="cursor-pointer px-2 py-1 font-semibold text-sm
          transition-colors hover:bg-neutral-600 rounded text-neutral-300 hover:text-neutral-100"
          onClick={toggleEditButton}
        >
          <span>취소</span> <FontAwesomeIcon icon={faBackspace} />
        </button>
        <button
          className="cursor-pointer px-2 py-1 font-semibold text-sm
          transition-colors hover:bg-neutral-600 rounded text-neutral-300 hover:text-neutral-100"
          onClick={handleEdit}
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
