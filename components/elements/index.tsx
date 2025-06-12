"use client";

import { Element } from "@/types/core";
import { useEffect, useRef, useState } from "react";
import ElementLinkCard from "../element-card-with-link";
import { getElementsBySearchTag } from "@/app/elements/actions";
import LoadingBounce from "../loading-bounce";

interface ElementsView {
  initialElements: Element[];
  count: number;
  search: string | string[] | undefined;
  tag: string | string[] | undefined;
}

export default function ElementsView({
  initialElements,
  count,
  search,
  tag,
}: ElementsView) {
  const [elements, setElements] = useState([...initialElements]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLDivElement>(null);

  // infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        // observer가 관측할 요소들
        entries: IntersectionObserverEntry[],
        // observer
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        // 사용자의 뷰에 트리거가 감지되면
        if (element.isIntersecting && trigger.current) {
          // 옵저버 감시 중지
          observer.unobserve(trigger.current);

          // 데이터 불러오기
          setIsLoading(true);
          const { data: newElement } = await getElementsBySearchTag({
            search,
            tag,
            page: page + 1,
          });

          // element 업데이트 및 last page check
          setElements((prev) => {
            const nextElements = [...prev, ...newElement];
            if (nextElements.length >= count) {
              setIsLastPage(true);
            }
            return nextElements;
          });

          // 더이상 가져올 데이터가 없을때에만 page 증가 금지
          setPage((pre) => pre + 1);

          setIsLoading(false);
        }
      },
      {
        // 트리거가 전부 다 보여야 화면에 있다고 표시하기
        threshold: 1.0,
      }
    );

    if (trigger.current) {
      // 트리거 span 감시 시작
      observer.observe(trigger.current);
    }

    // clean-up
    return () => observer.disconnect();
  }, [page]);

  useEffect(() => {
    setElements([...initialElements]);
    setPage(0);
    setIsLastPage(false);
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
