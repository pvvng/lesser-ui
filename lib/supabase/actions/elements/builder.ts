"use server";

import { Element } from "@/types/core";
import { createClient } from "../../server";
import { cookies as defaultCookies } from "next/headers";

// =======================
// Types
// =======================

interface ErrorResult {
  data: null;
  error: string;
  count: null;
}

interface SuccessResult {
  data: Element[];
  error: null;
  count: number;
}

type PromiseReturnType = Promise<ErrorResult | SuccessResult>;

// =======================
// Constant
// =======================

const PAGE_SIZE = 20;

// =======================
// Query Builder
// =======================

/**
 * Supabase 'elements' 테이블을 대상으로 조건부 쿼리를 체이닝 방식으로 생성하는 빌더 함수
 *
 * 서버 컴포넌트 전용이며, fetch() 호출 전까지는 쿼리가 실행되지 않음
 */
export async function createElementQuery(
  cookieOverride?: ReturnType<typeof defaultCookies>
) {
  const supabase = await createClient(cookieOverride);

  // 내부 상태 변수
  let isRandom: boolean = false;
  let randomCount: number | null = null;

  // 초기 쿼리 객체 (카운트 포함)
  let query = supabase.from("elements").select("*", {
    count: "exact",
  });

  return {
    /**
     * 특정 element ID로 필터링
     */
    byId(elementId: string) {
      query = query.eq("id", elementId);
      return this;
    },

    /**
     * 작성자(user_id) 기준으로 필터링
     */
    byAuthor(authorId: string) {
      query = query.eq("user_id", authorId);
      return this;
    },

    /**
     * 태그(tag) 기준으로 필터링 (null일 경우 필터링 생략)
     */
    byTag(tag: string | null) {
      if (tag) {
        query = query.eq("tag", tag);
      }
      return this;
    },

    /**
     * 이름(name)을 포함하는 항목 필터링 (대소문자 구분 없이 검색)
     */
    byName(name: string | null) {
      if (name) {
        query = query.ilike("name", `%${name}%`);
      }
      return this;
    },

    /**
     * 페이지네이션 범위 설정
     *
     * @param size - 페이지당 아이템 수 (기본값: 20)
     * @param page - 현재 페이지 인덱스 (기본값: 0)
     */
    range({ size = PAGE_SIZE, page = 0 }: { size?: number; page?: number }) {
      const from = page * size;
      const to = from + size - 1;

      query = query.range(from, to);
      return this;
    },

    /**
     * 정렬 조건 설정
     *
     * @param field - 정렬 기준 필드명 (기본값: created_at)
     * @param ascending - 오름차순 여부 (기본값: false)
     */
    order({
      field = "created_at",
      ascending = false,
    }: {
      field?: keyof Element;
      ascending?: boolean;
    }) {
      query = query.order(field, { ascending });
      return this;
    },

    /**
     * 랜덤한 요소를 일정 개수 반환하도록 설정
     * 내부적으로 먼저 최대 limitCount까지 불러온 뒤 JS에서 셔플
     *
     * @param options.count - 최종 반환할 랜덤 항목 개수 (기본값: 15)
     * @param options.limitCount - Supabase 쿼리 시 limit 설정 (기본값: 100)
     */
    random({
      count = 15,
      limitCount = 100,
    }: { count?: number; limitCount?: number } = {}) {
      query = query.limit(limitCount);
      isRandom = true;
      randomCount = count;
      return this;
    },

    /**
     * 현재까지 체이닝된 조건을 바탕으로 Supabase에서 데이터를 실제로 불러옴
     *
     * @returns 성공 시 data, count 반환 / 실패 시 error 포함
     */
    async fetch(): PromiseReturnType {
      const { data, error, count } = await query;

      if (error || !Array.isArray(data) || !data) {
        console.error(error?.message);
        return {
          data: null,
          error: "UI 블럭을 불러오는 중 에러가 발생했습니다.",
          count: null,
        };
      }

      // 랜덤 옵션이 설정된 경우 배열 셔플 처리
      if (isRandom && data) {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        return {
          data: shuffled.slice(0, randomCount ?? 15),
          error: null,
          count: count ?? 0,
        };
      }

      return {
        data,
        error: null,
        count: count ?? 0,
      };
    },
  };
}
