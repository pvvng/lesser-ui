"use server";

import { createClient } from "@/lib/supabase/server";

const selectFields = `*,
  users!elements_user_id_fkey (
    id,
    nickname,
    avatar
  ),
  favorites:favorites (
    user_id,
    element_id
  )      
`;

export async function getElement({ elementId }: { elementId: string }) {
  const supabase = await createClient();

  // 1. 현재 view 가져오기
  const { data: current, error: fetchError } = await supabase
    .from("elements")
    .select("view")
    .eq("id", elementId)
    .single();

  if (!current || fetchError) {
    return {
      data: null,
      error: "요소 조회 실패",
    };
  }

  // 2. view 수동으로 1 증가시켜서 update
  const { error: updateError } = await supabase
    .from("elements")
    .update({ view: current.view + 1 })
    .eq("id", elementId);

  if (updateError) console.error("조회수 증가 실패:", updateError);

  // 3. 전체 element 정보 다시 조회
  const { data: element, error: selectError } = await supabase
    .from("elements")
    .select(selectFields)
    .eq("id", elementId)
    .maybeSingle();

  console.log(element);
  if (!element || selectError) {
    return {
      data: null,
      error: "요소 불러오기 실패",
    };
  }

  return {
    data: element,
    error: null,
  };
}

export async function insertFavorite({
  elementId,
  userId,
}: {
  elementId: string;
  userId: string | null;
}) {
  if (!elementId || !userId) {
    return {
      data: null,
      error: "UI 요소 ID와 사용자 ID가 필요합니다.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("favorites").insert({
    element_id: elementId,
    user_id: userId,
  });

  if (error) {
    return {
      data: null,
      error: "즐겨찾기 추가에 실패했습니다.",
    };
  }

  return {
    data,
    error: null,
  };
}

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
      error: "UI 요소 ID와 사용자 ID가 필요합니다.",
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

  return {
    data,
    error: null,
  };
}
