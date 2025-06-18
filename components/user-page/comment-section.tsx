"use client";

// components
import ElementLinkCard from "../element-card-with-link";
import EmptyMessage from "./empty-message";
import CommentCard from "../element-detail/comment-card";
// utils
import { groupCommentsByElementId } from "@/lib/utils/group-comments-by-element-id";
// types
import { UserComment } from "@/types/core";
import { useRouter } from "next/navigation";

interface UserCommentSectionProps {
  comments: UserComment[];
  nickname: string;
}

export default function UserCommentSection({
  comments,
  nickname,
}: UserCommentSectionProps) {
  const router = useRouter();
  if (comments.length === 0) return <EmptyMessage type="comments" />;

  const { groupedComments, elements } = groupCommentsByElementId(comments);

  return Object.entries(elements).map(([key, element]) => (
    <div
      key={key}
      className="flex gap-5 border-b border-neutral-600 last:border-none py-5 first:pt-0 last:pb-0"
    >
      <div className="relative size-72 shrink-0">
        <ElementLinkCard
          elementId={element.id}
          htmlCode={element.html}
          cssCode={element.css}
        />
      </div>
      <div className="w-full h-72 overflow-auto space-y-3">
        {groupedComments[key].map((comment) => (
          <CommentCard
            key={comment.id}
            id={comment.id}
            currentUserId={comment.user_id}
            payload={comment.payload}
            createdAt={comment.created_at}
            authorId={comment.user_id}
            nickname={nickname}
            avatar={null}
            deleteComment={() => router.refresh()}
            type="userDetail"
          />
        ))}
      </div>
    </div>
  ));
}
