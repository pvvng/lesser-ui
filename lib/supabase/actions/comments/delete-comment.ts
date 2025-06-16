"use server";

import { createClient } from "../../server";
import checkUserLogin from "../users/check-user-login";

export async function deleteComment({
  commentId,
}: {
  commentId: string;
}): Promise<string | null> {
  const userId = await checkUserLogin();

  if (!userId) return "로그인 후 이용 가능합니다.";

  const supabase = await createClient();

  const { data: author, error } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", commentId)
    .maybeSingle();

  if (!author || error) {
    return "사용자 정보를 불러오는 중 오류가 발생했습니다";
  }

  if (author?.user_id !== userId) {
    return "승인되지 않은 사용자입니다.";
  }

  const { error: deleteCommentError } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (deleteCommentError) {
    return "댓글 삭제 중 오류가 발생했습니다.";
  }

  return null;
}
