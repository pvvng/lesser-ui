"use client";

import { normalizeSortOption } from "@/lib/utils/normalize-sort-option";
import useAccordionOpen from "@/lib/hooks/gsap/use-accordion-open";
import { SortOptions } from "@/types/core";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";

const sortOptions: SortOptions[] = ["Recent", "Oldest", "View", "Marked"];

export default function SortDropdown() {
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");

  const [currentSort, setCurrentSort] = useState(normalizeSortOption(orderBy));
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const buttonRef = useRef<HTMLDivElement>(null);
  // reveal animation
  const { menuRef, optionRefs } = useAccordionOpen({ deps: isOpen });

  const onChange = (option: SortOptions) => {
    // params set
    const params = new URLSearchParams(window.location.search);
    params.set("orderBy", option.toLowerCase());
    const newQuery = params.toString();
    router.push(`?${newQuery}`);

    // state 변경
    setCurrentSort(option);
    setIsOpen(false);
  };

  // orderBy가 바뀌면 state 갱신
  useEffect(() => {
    setCurrentSort(normalizeSortOption(orderBy));
  }, [orderBy]);

  // 외부 클릭 감지해서 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, menuRef]);

  return (
    <div className="relative inline-block text-white">
      {/* 버튼 */}
      <div
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 flex justify-center items-center gap-2 font-semibold 
        cursor-pointer text-sm hover:bg-neutral-600 rounded-2xl transition"
      >
        <FontAwesomeIcon icon={faFilter} />
        <span>Sort:</span>
        <span>{currentSort}</span>
        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
      </div>

      {/* 아코디언 */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute mt-2 right-0 bg-neutral-800 border border-neutral-600 
          rounded-xl py-2 shadow-lg z-50 min-w-[120px] text-sm overflow-hidden"
        >
          {sortOptions.map((option, idx) => (
            <div
              key={option}
              ref={(el) => {
                optionRefs.current[idx] = el!;
              }}
              className={`${
                currentSort === option && "bg-neutral-700"
              } option-item px-4 py-2 opacity-0 translate-y-[-8px]
              hover:bg-neutral-700 transition-colors cursor-pointer`}
              onClick={() => onChange(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
