import { userPageTabItems } from "@/lib/constants";

interface UserPageTabsProps {
  activeTab: string;
  handleTab: (label: string) => void;
}

export default function UserPageTabs({
  activeTab,
  handleTab,
}: UserPageTabsProps) {
  return (
    <ul className="flex items-center">
      {userPageTabItems.map((tab) => {
        const isActive = activeTab === tab.label;

        // 배경 효과 클래스
        const bgClassName = isActive
          ? "bg-gradient-to-r from-neutral-700 to-neutral-600 right-0 w-full"
          : "right-full w-0";

        // 텍스트 색상 클래스
        const textClassName = isActive ? "text-white" : "text-neutral-400";

        return (
          <li
            key={tab.label}
            className="px-3 py-2 font-semibold cursor-pointer rounded-t relative overflow-hidden"
            data-active={isActive}
            onClick={() => handleTab(tab.label)}
          >
            <span className={`relative z-10 ${textClassName}`}>
              {tab.label}
            </span>

            {/* 배경 효과 */}
            <span
              className={`absolute inset-0 transition-all duration-500 ease-out z-0 ${bgClassName}`}
            />
          </li>
        );
      })}
    </ul>
  );
}
