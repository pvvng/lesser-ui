"use server";

import { createClient } from "@/lib/supabase/server";

export async function getElement({ elementId }: { elementId: string }) {
  const supabase = await createClient();
  const { data: element, error } = await supabase
    .from("elements")
    .select(
      `
        *,
        users!elements_user_id_fkey (
          id,
          nickname,
          avatar
        )
      `
    )
    .eq("id", elementId)
    .maybeSingle();

  if (!element || error) {
    return {
      data: null,
      error: "UI 요소를 찾지 못했습니다.",
    };
  }

  return {
    data: element,
    error: null,
  };
}
