"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { chunkArray } from "@/lib/utils/chunk-array";

gsap.registerPlugin(ScrollTrigger);

interface MultiRowHorizontalScrollerProps {
  items: any[];
  itemsPerRow?: number;
  renderItem?: (item: any, index: number) => React.ReactNode;
}

export default function MultiRowHorizontalScroller({
  items,
  itemsPerRow = 5,
  renderItem,
}: MultiRowHorizontalScrollerProps) {
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
              <div
                key={i}
                className="panel w-64 aspect-square shrink-0 relative"
              >
                {renderItem ? (
                  renderItem(item, i)
                ) : (
                  <div className="bg-neutral-700 flex justify-center items-center rounded-2xl w-full h-full">
                    <Link
                      href={"#"}
                      className="bg-neutral-900 px-2 py-1 rounded absolute bottom-2 right-2 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faCode} /> get code
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
