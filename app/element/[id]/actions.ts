"use server";

import { createClient } from "@/lib/supabase/server";
import { commentSchema } from "@/lib/zod-schema/comment";

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

export async function insertComment(_: unknown, formdata: FormData) {
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

    return allMessages ?? "입력값에 오류가 있습니다.";
  }

  const supabase = await createClient();
  const { error } = await supabase.from("comments").insert({
    user_id: result.data.userId,
    element_id: result.data.elementId,
    payload: result.data.payload,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return ["댓글 작성에 실패했습니다."];
  }

  return null;
}
