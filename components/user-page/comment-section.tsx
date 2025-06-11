// components
import ElementLinkCard from "../element-card-with-link";
// utils
import { groupCommentsByElementId } from "@/lib/utils/group-comments-by-element-id";
import { getKoreanDate } from "@/lib/utils/get-korean-date";
// types
import { UserComment } from "@/types/core";
import EmptyMessage from "./empty-message";

interface UserCommentSectionProps {
  comments: UserComment[];
}

export default function UserCommentSection({
  comments,
}: UserCommentSectionProps) {
  if (comments.length === 0) {
    return <EmptyMessage type="comments" />;
  }

  const { groupedComments, elements } = groupCommentsByElementId(comments);

  return Object.entries(elements).map(([key, element]) => (
    <div
      key={key}
      className="flex gap-5 border-b border-neutral-600 last:border-none py-5 first:pt-0 last:pb-0"
    >
      <div className="relative size-80 shrink-0">
        <ElementLinkCard
          elementId={element.id}
          htmlCode={element.html}
          cssCode={element.css}
        />
      </div>
      <div className="w-full h-80 overflow-auto space-y-3">
        {groupedComments[key].map((comment) => (
          <CommentCard key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  ));
}

interface CommentCardProps {
  id: string;
  created_at: string;
  payload: string;
}

function CommentCard({ id, created_at, payload }: CommentCardProps) {
  return (
    <div className="bg-neutral-700 rounded-2xl rounded-bl-none p-3 shadow space-y-1">
      <p className="text-xs text-neutral-400">{getKoreanDate(created_at)}</p>
      <p>{payload}</p>
    </div>
  );
}
