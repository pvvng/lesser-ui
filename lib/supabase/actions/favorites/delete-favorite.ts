"use server";

import { revalidateTag } from "next/cache";
import { createClient } from "../../server";

/** element에 대한 북마크 delete 함수 */
export async function deleteFavorite({
  elementId,
  userId,
}: {
  elementId: string;
  userId: string | null;
}) {
  if (!elementId || !userId) {
    return {
      data: null,
      error: "UI 블럭 ID와 사용자 ID가 필요합니다.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("element_id", elementId)
    .eq("user_id", userId);

  if (error) {
    return {
      data: null,
      error: "즐겨찾기 삭제에 실패했습니다.",
    };
  }

  revalidateTag(`element-detail-${elementId}`);
  revalidateTag(`user-favorites-${userId}`);
  revalidateTag(`elements`);

  return {
    data,
    error: null,
  };
}
