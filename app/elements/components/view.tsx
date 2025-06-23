"use client";

// component
import ElementLinkCard from "@/components/element-card-with-link";
import LoadingBounce from "@/components/loader/loading-bounce";
import SearchInputButton from "./search-input-button";
import SortDropdown from "./sort-dropdown";
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
  orderBy: string | null;
}

export default function ElementsView({
  initialElements,
  count,
  search,
  tag,
  orderBy,
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
    deps: [search, tag, orderBy],
    action: (page) => getBySearch({ search, tag, page, orderBy }),
  });

  useEffect(() => {
    reset(initialElements);
  }, [initialElements, count, search, tag, orderBy]);

  return (
    <div className="mt-10 space-y-5">
      <div className="flex justify-between px-5">
        <SortDropdown />
        <SearchInputButton />
      </div>
      {elements.length <= 0 ? (
        <p className="text-center mt-15 font-semibold">
          일치하는 UI를 찾을 수 없어요.
        </p>
      ) : (
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
      )}
      {!isLastPage && (
        <div ref={trigger} className="my-10">
          <LoadingBounce />
        </div>
      )}
    </div>
  );
}
