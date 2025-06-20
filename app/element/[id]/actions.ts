"use server";

import { createClient } from "@/lib/supabase/server";
import { commentSchema } from "@/lib/zod-schema/comment";
import { revalidateTag } from "next/cache";

/** 코멘트 insert 함수 */
export async function insertComment(formdata: FormData) {
  const data = {
    userId: formdata.get("userId"),
    elementId: formdata.get("elementId"),
    payload: formdata.get("payload"),
  };

  const result = await commentSchema.spa(data);

  if (!result.success) {
    // fieldErrors와 formErrors를 문자열로 합치기
    const flat = result.error.flatten();
    const fieldMessages = Object.values(flat.fieldErrors)
      .flat()
      .filter(Boolean);
    const formMessages = flat.formErrors || [];

    const allMessages = [...fieldMessages, ...formMessages];

    return { data: null, error: allMessages ?? "입력값에 오류가 있습니다." };
  }

  const commentSelectFields = `*,
  users (
    id,
    nickname,
    avatar
  )
`;

  const supabase = await createClient();
  const { data: commentData, error } = await supabase
    .from("comments")
    .insert({
      user_id: result.data.userId,
      element_id: result.data.elementId,
      payload: result.data.payload,
    })
    .select(commentSelectFields)
    .maybeSingle();

  if (!commentData || error) {
    console.error("댓글 작성 실패:", error);
    return { data: null, error: ["댓글 작성에 실패했습니다."] };
  }

  revalidateTag(`element-comments-${result.data.elementId}`);
  revalidateTag(`user-tab-comments-${result.data.userId}`);

  return { data: commentData, error: null };
}
