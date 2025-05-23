"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef } from "react";
import { chunkArray } from "@/lib/utils/chunk-array";

gsap.registerPlugin(ScrollTrigger);

interface MultiRowHorizontalScrollerProps {
  items: any[];
  itemsPerRow?: number;
  renderItem: (item: any, index: number) => React.ReactNode;
}

/**
 * array를 itemsPerRow의 matrix로 변경하여 multi row 스크롤을 지원하는 컴포넌트
 * @param items - matrix로 변경할 아이템 배열
 * @param itemsPerRow - 한 열 당 요소 갯수 (default 8)
 * @param renderItem - 컴포넌트 렌더링 함수 (원하는 컴포넌트로 대체 가능)
 * @returns
 */
export default function MultiRowHorizontalScroller({
  items,
  itemsPerRow = 10,
  /** 아이템 렌더링 함수 */
  renderItem,
}: MultiRowHorizontalScrollerProps) {
  // 아이템 리스트 청크로 만들어서 memo
  const chunkedItems = useMemo(
    () => chunkArray(items, itemsPerRow),
    [items, itemsPerRow]
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = gsap.utils.toArray<HTMLDivElement>(".row-wrapper");

    rows.forEach((row) => {
      // 각 row item마다 쿼리 셀렉터 부착
      const inner = row.querySelector(".row-inner");
      if (!inner) return;

      const scrollWidth = inner.scrollWidth - row.clientWidth;

      // 쿼리 셀렉터 부착된 요소에 gsap 가로 스크롤 애니메이션 적용
      gsap.to(inner, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: row,
          // 스크롤 해당 위치 도달 시 트리거
          // 64(nav height h-16) + 20(pading size p-5) = 84
          start: "top-=84 top",
          end: () => `+=${scrollWidth}`,
          scrub: true,
          // 요소 간 간격
          pin: true,
          pinSpacing: true,
          snap: 1 / itemsPerRow,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div ref={containerRef} className="space-y-5">
      {chunkedItems.map((chunk, idx) => (
        <section key={idx} className="row-wrapper w-full overflow-hidden">
          <div className="row-inner flex gap-5 w-full">
            {chunk.map((item, i) => (
              <div key={i} className="w-64 shrink-0">
                {renderItem(item, i)}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
