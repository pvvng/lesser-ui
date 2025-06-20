"use client";

import ElementLinkCard from "@/components/element-card-with-link";
import EmptyMessage from "./empty-message";
import { Element } from "@/types/core";
import useInfinityScroll from "@/lib/hooks/use-infinity-scroll";
import { getFavoriteElements } from "@/lib/supabase/actions/users/get-favorite-elements";
import LoadingBounce from "@/components/loader/loading-bounce";
import { useEffect } from "react";

interface UserCodePreviewSectionProps {
  elements: Element[];
  type: "favorites" | "elements";
  count: number;
  userId: string;
  action: ({
    userId,
    page,
  }: {
    userId: string;
    page: number;
  }) => Promise<PromiseReturnType>;
}

interface PromiseReturnType {
  data: Element[];
  count: number;
  error: string | null;
}

export default function UserCodePreviewSection({
  elements: initialElements,
  type,
  count,
  userId,
  action,
}: UserCodePreviewSectionProps) {
  const {
    datas: elements,
    isLoading,
    isLastPage,
    trigger,
    reset,
  } = useInfinityScroll<Element>({
    initialData: initialElements,
    count,
    deps: [type],
    action: (page) => action({ userId, page }),
  });

  if (elements.length === 0) {
    return <EmptyMessage type={type} />;
  }

  useEffect(() => {
    reset(initialElements);
  }, [initialElements, count, type]);

  console.log(elements.length);

  return (
    <>
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
      {!isLastPage && (
        <div ref={trigger} className="my-10">
          <LoadingBounce />
        </div>
      )}
    </>
  );
}
