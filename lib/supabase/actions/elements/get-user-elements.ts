"use server";

import { createElementQuery } from ".";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

export async function _getUserElements({
  userId,
  page,
  cookieStore,
}: {
  userId: string;
  page: number;
  cookieStore: ReturnType<typeof cookies>;
}) {
  const elementQuery = await createElementQuery(cookieStore);
  const { data, error, count } = await elementQuery
    .byAuthor(userId)
    .range({ page })
    .order({ field: "created_at", ascending: false })
    .fetch();

  if (error || !data) {
    console.error("Fetch error: ", error);
    return {
      data: [],
      count: 0,
      error: "데이터를 불러오는 중 오류가 발생했습니다.",
    };
  }

  return {
    data,
    count: count ?? 0,
    error: null,
  };
}

export async function getUserElements({
  userId,
  page,
}: {
  userId: string;
  page: number;
}): ReturnType<typeof _getUserElements> {
  const cookieStore = cookies();

  return unstable_cache(
    () => _getUserElements({ userId, page, cookieStore }),
    [`user-tab-elements-${userId}-${page}`],
    { tags: [`user-tab-elements-${userId}`] }
  )();
}
