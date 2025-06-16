"use server";

import { Element } from "@/types/core";
import { createElementQuery } from "./builder";

interface GetElementsBySearchTagProps {
  search: string | null;
  tag: string | null;
  page: number;
}

interface PromiseReturnType {
  data: Element[];
  count: number;
  error: string | null;
}

/**
 * 검색어와 태그를 기준으로 요소(Element) 목록을 페이지 단위로 조회하는 어댑터 함수
 *
 * - 클라이언트 컴포넌트에서 직접 Supabase 쿼리를 실행할 수 없기 때문에 서버에서 실행
 * - createElementQuery 체이닝 방식으로 조건 구성
 * - 결과는 페이지네이션 처리된 데이터와 전체 개수, 에러 메시지를 포함
 *
 * @param search - 요소 이름 검색어 (부분 일치)
 * @param tag - 태그 필터 (정확 일치)
 * @param page - 페이지 번호 (0부터 시작)
 *
 * @returns Element 목록, 전체 개수, 에러 메시지(null이면 성공)
 */
export async function getBySearch({
  search,
  tag,
  page,
}: GetElementsBySearchTagProps): Promise<PromiseReturnType> {
  const elementQuery = await createElementQuery();
  const {
    data: elements,
    count,
    error,
  } = await elementQuery
    .byTag(tag)
    .byName(search)
    .range({ page })
    .order({ field: "created_at", ascending: false })
    .fetch();

  if (error) {
    console.error("Fetch error:", error);
    return {
      data: [] as Element[],
      count: 0,
      error,
    };
  }

  return {
    data: elements as Element[],
    count: count ?? 0,
    error: null,
  };
}
