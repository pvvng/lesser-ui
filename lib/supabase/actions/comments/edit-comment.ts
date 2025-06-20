"use server";

import { commentRefineSchema } from "@/lib/zod-schema/comment";
import { createClient } from "../../server";
import { checkUserLogin } from "../users";
import { revalidateTag } from "next/cache";

export async function editComment({
  commentId,
  payload,
}: {
  commentId: string;
  payload: string;
}): Promise<string | null> {
  const result = commentRefineSchema.safeParse(payload);

  if (result.error) {
    return result.error.flatten().formErrors[0];
  }

  const userId = await checkUserLogin();

  if (!userId) return "로그인 후 이용 가능합니다.";

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select("user_id, element_id")
    .eq("id", commentId)
    .maybeSingle();

  if (!data || error) {
    return "사용자 정보를 불러오는 중 오류가 발생했습니다";
  }

  if (data?.user_id !== userId) {
    return "승인되지 않은 사용자입니다.";
  }

  const { error: updateCommentError } = await supabase
    .from("comments")
    .update({ payload })
    .eq("id", commentId);

  if (updateCommentError) {
    return "댓글 업데이트 중 오류가 발생했습니다.";
  }

  revalidateTag(`element-comments-${data.element_id}`);

  return null;
}
