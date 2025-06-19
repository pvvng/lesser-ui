"use client";

import { useEffect, useRef, useState } from "react";

interface UseInfinityScrollProps<T> {
  /** 초기 데이터 배열 */
  initialData: T[];

  /** 전체 데이터 개수 (최대 개수 판단용) */
  count: number;

  /**
   * 페이지 단위로 데이터를 불러오는 비동기 함수
   * @param page 현재 페이지 (0부터 시작)
   * @returns data: 해당 페이지의 데이터 배열
   */

  deps?: unknown[];
  action: (page: number) => Promise<{ data: T[] }>;
}

/**
 * 무한 스크롤(infinity scroll) 커스텀 훅
 *
 * @template T - 데이터 타입
 * @param {T[]} initialData - 초기 데이터
 * @param {number} count - 전체 데이터 개수
 * @param {(page: number) => Promise<{ data: T[] }>} action - 페이지 단위 데이터 로더
 */
export default function useInfinityScroll<T>({
  initialData,
  count,
  deps = [],
  action,
}: UseInfinityScrollProps<T>) {
  const [datas, setDatas] = useState<T[]>([...initialData]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLDivElement>(null);

  /** 무한 스크롤 관련 상태 초기화 함수 */
  const reset = (newData: T[]) => {
    setDatas([...newData]);
    setPage(0);
    setIsLastPage(false);
    setIsLoading(false);
  };

  // infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];

        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);

          setIsLoading(true);
          const { data: newData } = await action(page + 1);

          setDatas((prev) => {
            const nextElements = [...prev, ...newData];
            if (nextElements.length >= count) {
              setIsLastPage(true);
            }
            return nextElements;
          });

          setPage((pre) => pre + 1);
          setIsLoading(false);
        }
      },
      { threshold: 1.0 }
    );

    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => observer.disconnect();
  }, [page, ...deps]);

  return {
    /** 현재까지 로드된 데이터 */
    datas,
    /** 더 이상 불러올 데이터가 없는 경우 true */
    isLastPage,
    /** 데이터 로딩 중 여부 */
    isLoading,
    /** intersection observer가 감지할 DOM ref */
    trigger,
    /** 무한스크롤 상태 초기화 함수 */
    reset,
  };
}
