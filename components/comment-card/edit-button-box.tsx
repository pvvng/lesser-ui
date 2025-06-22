"use client";

import {
  faBackspace,
  faEdit,
  faSave,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EditButtonBoxProps {
  editButtonId: string;
  isAuthor: boolean;
  isEditMode: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  cancelEditMode: () => void;
  toggleEditButton: () => void;
  toggleDeleteModal: () => void;
  handleEdit: () => Promise<void>;
}

export default function EditButtonBox({
  editButtonId,
  isAuthor,
  isEditMode,
  isDisabled,
  isLoading,
  cancelEditMode,
  toggleDeleteModal,
  toggleEditButton,
  handleEdit,
}: EditButtonBoxProps) {
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
          onClick={cancelEditMode}
        >
          <span>취소</span> <FontAwesomeIcon icon={faBackspace} />
        </button>
        <button
          id={editButtonId}
          className="cursor-pointer px-2 py-1 font-semibold text-sm 
          disabled:cursor-not-allowed disabled:text-neutral-500 disabled:hover:bg-transparent 
          transition-colors hover:bg-neutral-600 rounded text-neutral-300 hover:text-neutral-100"
          onClick={handleEdit}
          disabled={isDisabled}
        >
          <span>저장</span> <FontAwesomeIcon icon={faSave} />
        </button>
        <button
          className="cursor-pointer px-2 py-1 font-semibold text-sm
          transition-colors hover:bg-neutral-600 rounded text-neutral-300 hover:text-neutral-100"
          onClick={toggleDeleteModal}
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
