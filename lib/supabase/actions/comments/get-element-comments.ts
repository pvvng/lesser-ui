"use server";

import { cookies } from "next/headers";
import { createClient } from "../../server";
import { unstable_cache } from "next/cache";
import { CommentWithUser } from "@/types/core";

async function _getElementComments({
  elementId,
  cookieStore,
}: {
  elementId: string;
  cookieStore: ReturnType<typeof cookies>;
}) {
  const supabase = await createClient(cookieStore);
  const { data, error, count } = await supabase
    .from("comments")
    .select("*, users(id, nickname, avatar)", {
      count: "exact",
    })
    .eq("element_id", elementId)
    .order("created_at");

  if (error || !data) {
    console.error("Fetch error:", error);
    return {
      data: [] as CommentWithUser[],
      count: 0,
      error,
    };
  }

  return {
    data: data as CommentWithUser[],
    count: count ?? 0,
    error: null,
  };
}

export async function getElementComments({
  elementId,
}: {
  elementId: string;
}): ReturnType<typeof _getElementComments> {
  const cookieStore = cookies();

  return unstable_cache(
    () => _getElementComments({ elementId, cookieStore }),
    [`element-comments-${elementId}`],
    { tags: [`element-comments-${elementId}`] }
  )();
}
