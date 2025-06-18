"use client";

// components
import CommentCard from "../comment-card";
import CommentForm from "../form/comment-form";
// types
import { CommentWithUser } from "@/types/core";
// etc
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface CommentSectionProps {
  userId: string | null;
  elementId: string;
  comments: CommentWithUser[];
}

export default function CommentSection({
  userId,
  elementId,
  comments: initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<CommentWithUser[]>(initialComments);

  const addComment = (newComment: CommentWithUser) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const deleteComment = (commentId: string) => {
    setComments([...comments.filter((comment) => comment.id !== commentId)]);
  };

  return (
    <section>
      <p className="font-semibold text-lg flex items-center gap-2">
        <FontAwesomeIcon icon={faComment} />
        Comments ({comments.length})
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
            deleteComment={deleteComment}
          />
        ))}
      </div>
      <CommentForm
        elementId={elementId}
        userId={userId}
        addComment={addComment}
      />
    </section>
  );
}
