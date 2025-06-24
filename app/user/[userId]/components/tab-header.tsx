import { UserTab } from "@/types/core";
import Link from "next/link";

interface TabHeaderProps {
  selectedTab: UserTab;
  userId: string;
}

/** 유저 페이지 tab items */
const userPageTabItems = [
  "favorites",
  "elements",
  "comments",
  "activites",
] as const;

const koreanTabItems = {
  favorites: "북마크한 UI 블럭",
  elements: "제작한 UI 블럭",
  comments: "작성한 댓글",
  activites: "내 활동",
};

export default function TabHeader({ selectedTab, userId }: TabHeaderProps) {
  return (
    <ul className="flex items-center">
      {userPageTabItems.map((tab) => {
        const isActive = selectedTab === tab;

        // 배경 효과 클래스
        const bgClassName = isActive
          ? "bg-gradient-to-r from-neutral-700 to-neutral-600 right-0 w-full"
          : "right-full w-0";

        // 텍스트 색상 클래스
        const textClassName = isActive ? "text-white" : "text-neutral-400";

        return (
          <Link key={tab} href={`/user/${userId}?tab=${tab}`} scroll={false}>
            <li
              className="px-3 py-2 font-semibold cursor-pointer rounded-t relative overflow-hidden"
              data-active={isActive}
            >
              <span className={`relative z-10 ${textClassName}`}>
                {koreanTabItems[tab]}
              </span>
              {/* 배경 효과 */}
              <span
                className={`absolute inset-0 transition-all duration-500 ease-out z-0 ${bgClassName}`}
              />
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
