"use client";

// hooks
import useStopScoll from "@/lib/hooks/use-stop-scroll";
import useBounceBoxes from "@/lib/hooks/gsap/use-bounce-boxes";
// actions
import { deleteElement } from "@/app/element/[id]/actions";
// etc
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface DeleteModalProps {
  userId: string | null;
  elementId: string;
  toggleDeleteModal: () => void;
}

export default function DeleteModal({
  userId,
  elementId,
  toggleDeleteModal,
}: DeleteModalProps) {
  const router = useRouter();

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
        className="bg-neutral-800 rounded-2xl p-5 *:text-center space-y-3"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
      >
        <div>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <p>
            Deleted elements{" "}
            <span className="underline underline-offset-2">
              cannot be restored.
            </span>
          </p>
          <p className="font-semibold">
            Are you sure you want to delete this element?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            className="bg-red-500 hover:bg-red-600 transition-colors font-semibold py-1 rounded cursor-pointer"
            onClick={async () => {
              const { error } = await deleteElement({ userId, elementId });
              if (error) return alert(error);
              alert("요소 삭제가 완료되었습니다.");
              return router.push("/elements");
            }}
          >
            Yes
          </button>
          <button
            className="bg-neutral-900 hover:bg-neutral-950 transition-colors font-semibold py-1 rounded cursor-pointer"
            onClick={toggleDeleteModal}
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
}
