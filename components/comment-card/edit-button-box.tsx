import {
  editComment,
  deleteComment as deleteCommentById,
} from "@/lib/supabase/actions/comments";
import {
  faBackspace,
  faEdit,
  faSave,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function EditButtonBox({
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
  deleteComment?: (commentId: string) => void;
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
    return deleteComment?.(commentId);
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
