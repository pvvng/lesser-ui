"use client";

// components
import ElementLinkCard from "@/components/element-card-with-link";
import CommentCard from "@/components/comment-card";
import EmptyMessage from "./empty-message";
// utils
import { groupCommentsByElementId } from "@/lib/utils/group-comments-by-element-id";
// types
import { CommentWithElement } from "@/types/core";
// etc
import { useRouter } from "next/navigation";

interface UserCommentSectionProps {
  comments: CommentWithElement[];
  nickname: string;
}

export default function UserCommentSection({
  comments,
  nickname,
}: UserCommentSectionProps) {
  const router = useRouter();
  if (comments.length === 0) return <EmptyMessage type="comments" />;

  const { elements, groupedComments } = groupCommentsByElementId(comments);

  return elements.map((element) => (
    <div
      key={element.id}
      className="flex gap-5 border-b border-neutral-600 last:border-none py-5 first:pt-0 last:pb-0"
    >
      <div className="size-72 shrink-0">
        <ElementLinkCard
          elementId={element.id}
          htmlCode={element.html}
          cssCode={element.css}
        />
      </div>
      <div className="w-full h-72 overflow-auto space-y-3">
        {groupedComments[element.id].map((comment) => (
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
