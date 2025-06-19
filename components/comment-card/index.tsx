"use client";

import { getKoreanDate } from "@/lib/utils/get-korean-date";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EditButtonBox from "./edit-button-box";

interface CommentCardProps {
  id: string;
  currentUserId: string | null;
  authorId: string | null;
  avatar: string | null;
  nickname: string | null;
  createdAt: string;
  payload: string;
  type?: "section" | "userDetail";
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
  type = "section",
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
          {type === "section" && (
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
          )}
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
