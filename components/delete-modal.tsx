"use client";

// hooks
import useStopScoll from "@/lib/hooks/use-stop-scroll";
import useBounceBoxes from "@/lib/hooks/gsap/use-bounce-boxes";
// etc
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

interface DeleteModalProps {
  type: "element" | "comment";
  toggleDeleteModal: () => void;
  deleteAction: () => Promise<void>;
}

export default function DeleteModal({
  type,
  toggleDeleteModal,
  deleteAction,
}: DeleteModalProps) {
  /** (한글) 받힘이 있는 글자인지 확인하는 함수 */
  const hasJongsung = (char: string): boolean => {
    const code = char.charCodeAt(0);
    if (code < 0xac00 || code > 0xd7a3) return false; // 한글이 아니면 false
    const jongsungIndex = (code - 0xac00) % 28;
    return jongsungIndex !== 0;
  };

  const content = {
    element: "UI 블럭",
    comment: "댓글",
  };

  // gsap 훅을 사용하여 모달 애니메이션 설정
  const { modalRef, backdropRef } = useBounceBoxes();

  // 모달이 열려있는 동안 스크롤 방지
  useStopScoll();

  return (
    <section
      ref={backdropRef}
      className="inset-0 fixed w-full h-screen bg-black/80 flex justify-center items-center p-5 z-10000"
      onClick={toggleDeleteModal}
    >
      <div
        ref={modalRef}
        className="min-w-xs bg-neutral-800 rounded-2xl p-5 *:text-center space-y-5"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
      >
        <div>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <p>
            삭제된 {content[type]}
            {hasJongsung(content[type]) ? "은" : "는"}{" "}
            <strong className="underline underline-offset-2">
              복구할 수 없습니다.
            </strong>
          </p>
          <p className="font-semibold">
            정말 이 {content[type]}
            {hasJongsung(content[type]) ? "을" : "를"} 삭제할까요?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="bg-red-500 hover:bg-red-600 transition-colors font-semibold py-1 rounded cursor-pointer"
            onClick={deleteAction}
          >
            네
          </button>
          <button
            className="bg-neutral-900 hover:bg-neutral-950 transition-colors font-semibold py-1 rounded cursor-pointer"
            onClick={toggleDeleteModal}
          >
            아니요
          </button>
        </div>
      </div>
    </section>
  );
}
