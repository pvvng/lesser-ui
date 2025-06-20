"use server";

import { cookies } from "next/headers";
import { createClient } from "../../server";
import { unstable_cache } from "next/cache";

const PAGE_SIZE = 20;

export async function _getFavoriteElements({
  userId,
  page,
  cookieStore,
}: {
  userId: string;
  page: number;
  cookieStore: ReturnType<typeof cookies>;
}) {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient(cookieStore);

  const { data, error, count } = await supabase
    .from("favorites")
    .select("elements(*)", { count: "exact" })
    .eq("user_id", userId)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Fetch error: ", error);
    return {
      data: [],
      count: 0,
      error: "데이터를 불러오는 중 오류가 발생했습니다.",
    };
  }

  const processedData = data.map(({ elements }) => elements);

  return {
    data: processedData,
    count: count ?? 0,
    error: null,
  };
}

export async function getFavoriteElements({
  userId,
  page,
}: {
  userId: string;
  page: number;
}): ReturnType<typeof _getFavoriteElements> {
  const cookieStore = cookies();

  return unstable_cache(
    () => _getFavoriteElements({ userId, page, cookieStore }),
    [`user-favorites-${userId}-${page}`],
    { tags: [`user-favorites-${userId}`] }
  )();
}
