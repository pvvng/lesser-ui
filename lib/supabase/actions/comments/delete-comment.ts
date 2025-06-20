"use server";

import { revalidateTag } from "next/cache";
import { createClient } from "../../server";
import { checkUserLogin } from "../users";

export async function deleteComment({
  commentId,
}: {
  commentId: string;
}): Promise<string | null> {
  const userId = await checkUserLogin();

  if (!userId) return "로그인 후 이용 가능합니다.";

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select("user_id, element_id")
    .eq("id", commentId)
    .maybeSingle();

  if (!data || error) {
    return "데이터를 불러오는 중 오류가 발생했습니다";
  }

  if (data?.user_id !== userId) {
    return "승인되지 않은 사용자입니다.";
  }

  const { error: deleteCommentError } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (deleteCommentError) {
    return "댓글 삭제 중 오류가 발생했습니다.";
  }

  revalidateTag(`element-comments-${data.element_id}`);
  revalidateTag(`user-tab-comments-${userId}`);

  return null;
}
