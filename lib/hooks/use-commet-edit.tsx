"use client";

import { useState } from "react";

interface UseCommentEditProps {
  commentId: string;
  initialPayload: string;
  deleteComment?: (commentId: string) => void;
  editAction: (args: {
    commentId: string;
    payload: string;
  }) => Promise<string | null>;
  deleteAction: (args: { commentId: string }) => Promise<string | null>;
}

/**
 * 댓글 수정/삭제 관련 상태 및 로직을 캡슐화한 커스텀 훅
 */
export default function useCommentEdit({
  commentId,
  initialPayload,
  /** 댓글 삭제시 실행될 콜백 함수 */
  deleteComment,
  editAction,
  deleteAction,
}: UseCommentEditProps) {
  // 저장 버튼 ID (엔터키 트리거용)
  const editButtonId = `edit-btn-${commentId}`;

  // 수정 모드 여부
  const [isEditMode, setisEditMode] = useState(false);

  // 현재 댓글 내용 상태
  const [payload, setPayload] = useState(initialPayload);

  // 로딩 상태 (편집 or 삭제 처리 중)
  const [isLoading, setIsLoading] = useState(false);

  /** 인풋 필드 값 변경 핸들러 */
  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload(e.target.value);
  };

  /** 수정 모드 토글 (on/off) */
  const toggleEditButton = () => {
    setisEditMode((prev) => !prev);
  };

  /** 현재 입력값을 초기값으로 되돌림 */
  const resetPayload = () => {
    setPayload(initialPayload);
  };

  /** 수정 모드 취소 (값 초기화 + 모드 종료) */
  const cancelEditMode = () => {
    resetPayload();
    toggleEditButton();
  };

  /** Enter 키 입력 시 저장 버튼 클릭 트리거 */
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      document.getElementById(editButtonId)?.click();
    }
  };

  /** 댓글 편집 요청 처리 */
  const handleEdit = async () => {
    if (initialPayload === payload) {
      return alert("댓글 내용이 변하지 않았습니다.");
    }

    setIsLoading(true);
    const error = await editAction({ commentId, payload });
    setIsLoading(false);

    if (error) {
      resetPayload();
      return alert(error);
    }

    toggleEditButton();
  };

  /** 댓글 삭제 요청 처리 */
  const handleDelete = async () => {
    if (!confirm("정말 이 댓글을 삭제하시겠습니까?")) return;

    setIsLoading(true);
    const error = await deleteAction({ commentId });
    setIsLoading(false);

    if (error) return alert(error);

    deleteComment?.(commentId);
  };

  return {
    /** 현재 수정 모드 여부 (true면 input 필드가 나타남) */
    isEditMode,
    /** 편집/삭제 요청 중 여부 (로딩 상태) */
    isLoading,
    /** 현재 입력 중인 댓글 내용 */
    payload,
    /** 저장 버튼의 고유 ID (엔터 키로 버튼 클릭 유도할 때 사용) */
    editButtonId,
    /** 인풋 필드의 onKeyDown 핸들러 (Enter로 저장) */
    onKeyDownHandler,
    /** 인풋 필드의 onChange 핸들러 (입력값 변경) */
    onInputValueChange,
    /** 수정 모드 토글 함수 */
    toggleEditButton,
    /** 댓글 내용을 초기값으로 리셋 */
    resetPayload,
    /** 수정 모드 취소 (초기화 + 종료) */
    cancelEditMode,
    /** 댓글 저장 요청 실행 */
    handleEdit,
    /** 댓글 삭제 요청 실행 */
    handleDelete,
  };
}
