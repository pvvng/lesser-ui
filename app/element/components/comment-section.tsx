// actions
import { getElementComments } from "@/lib/supabase/actions/comments/get-element-comments";
// components
import CommentCard from "@/components/comment-card";
import CommentForm from "./comment-form";
// svg
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

interface CommentSectionProps {
  userId: string | null;
  elementId: string;
}

export default async function CommentSection({
  userId,
  elementId,
}: CommentSectionProps) {
  const {
    data: comments,
    error,
    count,
  } = await getElementComments({ elementId });

  if (error) {
    return (
      <p className="text-sm text-neutral-400">
        댓글 데이터를 불러오는데 실패했습니다.
      </p>
    );
  }

  return (
    <section>
      <p className="font-semibold text-lg flex items-center gap-2">
        <FontAwesomeIcon icon={faComment} />
        Comments ({count})
      </p>
      <div className="space-y-3 mt-3 max-h-120 overflow-scroll">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            id={comment.id}
            currentUserId={userId}
            authorId={comment.users?.id || null}
            avatar={comment.users?.avatar || null}
            nickname={comment.users?.nickname || null}
            createdAt={comment.created_at}
            payload={comment.payload}
            // deleteComment={() => {}}
          />
        ))}
      </div>
      <CommentForm
        elementId={elementId}
        userId={userId}
        // addComment={() => {}}
      />
    </section>
  );
}
