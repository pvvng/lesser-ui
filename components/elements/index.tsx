"use client";

// component
import ElementLinkCard from "../element-card-with-link";
import LoadingBounce from "../loading-bounce";
// hooks
import useInfinityScroll from "@/lib/hooks/use-infinity-scroll";
// actions
import { getBySearch } from "@/lib/supabase/actions/elements";
// types
import { Element } from "@/types/core";
// etc
import { useEffect } from "react";

interface ElementsView {
  initialElements: Element[];
  count: number;
  search: string | null;
  tag: string | null;
}

export default function ElementsView({
  initialElements,
  count,
  search,
  tag,
}: ElementsView) {
  const {
    datas: elements,
    isLoading,
    isLastPage,
    trigger,
    reset,
  } = useInfinityScroll<Element>({
    initialData: initialElements,
    count,
    action: (page) => getBySearch({ search, tag, page }),
  });

  useEffect(() => {
    reset(initialElements);
  }, [initialElements, count, search, tag]);

  return (
    <>
      <section className="grid grid-cols-4 gap-5 p-5">
        {elements.map((element) => (
          <ElementLinkCard
            key={element.id}
            elementId={element.id}
            htmlCode={element.html}
            cssCode={element.css}
          />
        ))}
      </section>
      {!isLastPage && (
        <div ref={trigger} className="my-10">
          <LoadingBounce />
        </div>
      )}
    </>
  );
}
