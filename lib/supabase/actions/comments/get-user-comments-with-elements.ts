"use server";

import { cookies } from "next/headers";
import { createClient } from "../../server";
import { unstable_cache } from "next/cache";

async function _getUserCommentsWithElements({
  userId,
  cookieStore,
}: {
  userId: string;
  cookieStore: ReturnType<typeof cookies>;
}) {
  const supabase = await createClient(cookieStore);
  const { data, error } = await supabase
    .from("comments")
    .select("*, element:elements(*)")
    .eq("user_id", userId);

  if (error || !data) {
    console.error("fetch error: ", error);
    return {
      data: [],
      error,
    };
  }

  return {
    data,
    error: null,
  };
}

export async function getUserCommentsWithElements({
  userId,
}: {
  userId: string;
}): ReturnType<typeof _getUserCommentsWithElements> {
  const cookieStore = cookies();

  return unstable_cache(
    () => _getUserCommentsWithElements({ userId, cookieStore }),
    [`user-tab-comments-${userId}`],
    { tags: [`user-tab-comments-${userId}`] }
  )();
}
