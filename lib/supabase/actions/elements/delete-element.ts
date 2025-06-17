"use server";

import { createClient } from "../../server";
import { checkUserLogin } from "../users";

/** elementId와 현재 로그인한 user id를 사용하여 element 삭제하는 함수 */
export async function deleteElement({
  elementId,
  userId,
}: {
  elementId: string;
  userId: string | null;
}): Promise<{ error: string | null }> {
  if (!userId) {
    return { error: "사용자 ID가 필요합니다." };
  }

  if (!elementId) {
    return { error: "컴포넌트 ID가 필요합니다." };
  }

  const supabase = await createClient();
  const currentUserId = await checkUserLogin();

  if (currentUserId !== userId) {
    return { error: "사용자 인증에 실패했습니다." };
  }

  const { data, error } = await supabase
    .from("elements")
    .delete()
    .eq("id", elementId)
    .eq("user_id", userId);

  if (error) {
    return { error: "컴포넌트 삭제에 실패했습니다." };
  }

  return { error: null };
}
