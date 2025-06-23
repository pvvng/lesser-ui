"use server";

import { Element } from "@/types/core";
import { createElementQuery } from "./builder";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

interface GetElementsBySearchTagProps {
  page: number;
  search: string | null;
  tag: string | null;
  orderBy?: string | null;
}

const orderMap: Record<string, { field: keyof Element; ascending: boolean }> = {
  recent: { field: "created_at", ascending: false },
  oldest: { field: "created_at", ascending: true },
  view: { field: "view", ascending: false },
  marked: { field: "marked", ascending: false },
};

// orderBy를 즉시 사용 가능한 object 형태로 변경
function generateOrderObject(orderBy: string | null) {
  return orderBy ? orderMap[orderBy] : undefined;
}

export async function _getBySearch({
  search,
  tag,
  page,
  orderBy = "created_at",
  cookieStore,
}: GetElementsBySearchTagProps & {
  cookieStore: ReturnType<typeof cookies>;
}) {
  const elementQuery = await createElementQuery(cookieStore);
  const {
    data: elements,
    count,
    error,
  } = await elementQuery
    .byTag(tag)
    .byName(search)
    .range({ page })
    .order(generateOrderObject(orderBy) ?? {})
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

// 캐싱된 함수
export async function getBySearch({
  search,
  tag,
  page,
  orderBy,
}: GetElementsBySearchTagProps): ReturnType<typeof _getBySearch> {
  const cookieStore = cookies();

  return unstable_cache(
    () =>
      _getBySearch({
        search,
        tag,
        page,
        orderBy,
        cookieStore,
      }),
    [
      `search-elements-${search ?? "none"}-${tag ?? "none"}-${
        orderBy ?? "none"
      }-${page}`,
    ],
    { tags: ["elements"] }
  )();
}
