"use server";

import { createClient } from "../../server";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

export async function _getUserdata({
  userId,
  cookieStore,
}: {
  userId: string;
  cookieStore: ReturnType<typeof cookies>;
}) {
  console.log("🔥 fetch from Supabase", new Date());

  const supabase = await createClient(cookieStore);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error(error);
    return {
      data: null,
      error: "사용자 정보를 불러오는 중 에러가 발생했습니다.",
    };
  }

  return {
    data,
    error: null,
  };
}

// unstable_cache 래퍼
export async function getUserdata({
  userId,
}: {
  userId: string;
}): ReturnType<typeof _getUserdata> {
  const cookieStore = cookies();

  return unstable_cache(
    () => _getUserdata({ userId, cookieStore }),
    [`user-data-${userId}`],
    { tags: [`user-data-${userId}`] }
  )();
}
