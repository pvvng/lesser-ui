"use client";

// components
import UserCommentSection from "./comment-section";
import UserCodePreviewSection from "./code-preview-section";
import UserPageTabs from "./tabs";
// hooks
import useSliceUp from "@/lib/hooks/gsap/use-slide-up";
// types
import { UserComment, UserElement } from "@/types/core";
// etc
import { useState } from "react";
import { userPageTabItems } from "@/lib/constants";

interface TabSectionProps {
  favorites: UserElement[];
  elements: UserElement[];
  comments: UserComment[];
}

export default function TabSection({
  favorites,
  elements,
  comments,
}: TabSectionProps) {
  const [activeTab, setActiveTab] = useState(userPageTabItems[0].label);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Favorites":
        return <UserCodePreviewSection elements={favorites} type="favorites" />;
      case "Elements":
        return <UserCodePreviewSection elements={elements} type="elements" />;
      case "Comments":
        return <UserCommentSection comments={comments} />;
      case "Activites":
        return <div className="text-neutral-400">준비 중...</div>;
      default:
        return null;
    }
  };

  const contentRef = useSliceUp({ deps: activeTab });

  return (
    <div className="mt-15">
      <UserPageTabs
        activeTab={activeTab}
        handleTab={(label: string) => setActiveTab(label)}
      />
      <section
        className="w-full py-5 max-h-[500px] overflow-auto  rounded-2xl rounded-tl-none"
        ref={contentRef}
      >
        {renderTabContent()}
      </section>
    </div>
  );
}
