"use server";

import { createClient } from "@/lib/supabase/server";
import { ElementDetail } from "@/types/core";

const selectFields = `*,
  users!elements_user_id_fkey (
    id,
    nickname,
    avatar
  ),
  favorites:favorites (
    user_id,
    element_id
  ),
  comments:comments (
    id,
    payload,
    created_at,
    user_id,
    users (
      id,
      nickname,
      avatar
    )
  )
`;

/** elementId에 따른 element value 불러오는 함수 */
export async function getElementDetail({ elementId }: { elementId: string }) {
  const supabase = await createClient();

  const { data: element, error: selectError } = await supabase
    .from("elements")
    .select(selectFields)
    .eq("id", elementId)
    .maybeSingle();

  if (!element || selectError) {
    return {
      data: null,
      error: "컴포넌트 불러오기 실패",
    };
  }

  return {
    data: element as ElementDetail,
    error: null,
  };
}
