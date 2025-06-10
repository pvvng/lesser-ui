"use client";

import ElementLinkCard from "../element-card-with-link";
import { UserComment, UserElement } from "@/types/core";
import { useState } from "react";
import Link from "next/link";
import { getKoreanDate } from "@/lib/utils/get-korean-date";

const tabItems = [
  { label: "Favorites" },
  { label: "Elements" },
  { label: "Comments" },
  { label: "Activites" },
];

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
  const [activeTab, setActiveTab] = useState(tabItems[0].label);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Favorites":
        return <UserCodePreviewSection elements={favorites} />;
      case "Elements":
        return <UserCodePreviewSection elements={elements} />;
      case "Comments":
        return <UserCommentSection comments={comments} />;
      case "Activities":
        return <div className="text-neutral-400">준비 중...</div>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-15">
      <ul className="flex items-center">
        {tabItems.map((tab, idx) => (
          <li
            key={tab.label}
            className={`px-3 py-2 font-semibold cursor-pointer transition-colors rounded-t ${
              activeTab === tab.label ? "bg-neutral-700" : ""
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <section className="w-full p-5 h-[500px] overflow-auto border-2 border-neutral-700 rounded-2xl rounded-tl-none">
        {renderTabContent()}
      </section>
    </div>
  );
}

function UserCodePreviewSection({ elements }: { elements: UserElement[] }) {
  return (
    <div className="grid grid-cols-5 gap-5">
      {elements.map((element) => (
        <ElementLinkCard
          key={element.id}
          elementId={element.id}
          htmlCode={element.html}
          cssCode={element.css}
        />
      ))}
    </div>
  );
}

function UserCommentSection({ comments }: { comments: UserComment[] }) {
  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <Link
          href={`/element/${comment.element_id}`}
          key={comment.id}
          className="block bg-neutral-700 rounded-2xl p-3"
        >
          <div className="col-span-3">
            <p className="text-neutral-400 text-xs">
              {getKoreanDate(comment.created_at)}
            </p>
            <p>{comment.payload}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
