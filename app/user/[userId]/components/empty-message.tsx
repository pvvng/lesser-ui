import { faPlus, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface EmptyMessageProps {
  type: "favorites" | "elements" | "comments";
}

const messageMap = {
  favorites: {
    message:
      "🤔 즐겨찾기 저장소가 아직 비었어요. 마음에 드는 UI 블럭을 저장해보세요!",
    icon: faRocket,
    link: "/elements",
    linkLabel: "모든 UI 블럭 둘러보기",
  },
  elements: {
    message: "제작한 UI 블럭이 없어요. 이제 하나 만들어볼까요? 🚀",
    icon: faPlus,
    link: "/element/create",
    linkLabel: "UI 블럭 새로 제작하기",
  },
  comments: {
    message: "💬 아직 남긴 댓글이 없어요.",
    icon: faRocket,
    link: "/elements",
    linkLabel: "모든 UI 블럭 둘러보기",
  },
};

export default function EmptyMessage({ type }: EmptyMessageProps) {
  return (
    <div className="my-20 space-y-5">
      <p className="text-center text-lg font-semibold">
        {messageMap[type].message}
      </p>
      <Link
        href={messageMap[type].link}
        className="w-fit mx-auto fancy-fill-btn flex items-center"
      >
        <FontAwesomeIcon icon={messageMap[type].icon} className="mr-2" />
        <span>{messageMap[type].linkLabel}</span>
      </Link>
    </div>
  );
}
