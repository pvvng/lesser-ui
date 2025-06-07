"use client";

import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentCard from "./comment-card";
import CommentForm from "./comment-form";
import { useState } from "react";
import { Comment } from "@/types/core";

interface CommentSectionProps {
  userId: string | null;
  elementId: string;
  comments: Comment[];
}

export default function CommentSection({
  userId,
  elementId,
  comments: initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const addComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <section>
      <p className="font-semibold text-lg flex items-center gap-2">
        <FontAwesomeIcon icon={faComment} />
        Comments ({comments.length})
      </p>
      <div className="space-y-3 mt-3">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            id={comment.id}
            avatar={comment.users?.avatar || null}
            nickname={comment.users?.nickname || null}
            createdAt={comment.created_at}
            payload={comment.payload}
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
