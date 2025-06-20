"use server";

import { revalidateTag } from "next/cache";
import { createClient } from "../../server";
import { checkUserLogin } from "../users";
import { redirect } from "next/navigation";

/** elementId와 현재 로그인한 user id를 사용하여 element 삭제하는 함수 */
export async function deleteElement({
  elementId,
  userId,
}: {
  elementId: string;
  userId: string | null;
}): Promise<{ error: string | null }> {
  if (!userId || !elementId) {
    return { error: "인증 정보가 누락되었습니다." };
  }

  const supabase = await createClient();
  const currentUserId = await checkUserLogin();

  if (currentUserId !== userId) {
    return { error: "사용자 인증에 실패했습니다." };
  }

  const { error } = await supabase
    .from("elements")
    .delete()
    .eq("id", elementId)
    .eq("user_id", userId);

  if (error) {
    return { error: "컴포넌트 삭제에 실패했습니다." };
  }

  revalidateTag(`elements`);
  revalidateTag(`element-detail-${elementId}`);

  return redirect("/elements");
}
