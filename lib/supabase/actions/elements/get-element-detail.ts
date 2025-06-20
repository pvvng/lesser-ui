"use server";

import { createClient } from "@/lib/supabase/server";
import { ElementDetail } from "@/types/core";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";

const selectFields = `*,
  favorites:favorites (
    user_id,
    element_id
  )
`;

/** elementId에 따른 element value 불러오는 함수 */
export async function _getElementDetail({
  elementId,
  cookieStore,
}: {
  elementId: string;
  cookieStore: ReturnType<typeof cookies>;
}) {
  const supabase = await createClient(cookieStore);

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

export async function getElementDetail({
  elementId,
}: {
  elementId: string;
}): ReturnType<typeof _getElementDetail> {
  const cookieStore = cookies();

  return unstable_cache(
    () => _getElementDetail({ elementId, cookieStore }),
    [`element-detail-${elementId}`],
    { tags: [`element-detail-${elementId}`] }
  )();
}
