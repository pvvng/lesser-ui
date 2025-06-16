"use server";

import { createClient } from "@/lib/supabase/server";

/** elementId에 해당하는 데이터의 조회수(view)를 1 증가시키는 함수 */
export async function incrementViewCount({
  elementId,
}: {
  elementId: string;
}): Promise<{ error: string | null }> {
  const supabase = await createClient();

  // 1. 현재 view 가져오기
  const { data: current, error: fetchError } = await supabase
    .from("elements")
    .select("view")
    .eq("id", elementId)
    .single();

  if (!current || fetchError) {
    console.error("컴포넌트 조회 실패:", fetchError);
    return { error: "컴포넌트 조회 실패" };
  }

  // 2. view 수동으로 1 증가시켜서 update
  const { error: updateError } = await supabase
    .from("elements")
    .update({ view: current.view + 1 })
    .eq("id", elementId);

  if (updateError) {
    console.error("조회수 증가 실패:", updateError);
    return { error: "조회수 증가 실패" };
  }

  return { error: null };
}
