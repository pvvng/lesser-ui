"use server";

import checkUserLogin from "@/lib/supabase/action/check-user-login";
import { createClient } from "@/lib/supabase/server";
import { commentSchema } from "@/lib/zod-schema/comment";
import { Database } from "@/types/supabase";

type SimpleUser = Pick<
  Database["public"]["Tables"]["users"]["Row"],
  "id" | "nickname" | "avatar"
>;

export type ElementDetail = Database["public"]["Tables"]["elements"]["Row"] & {
  users: SimpleUser | null;
  favorites: Pick<
    Database["public"]["Tables"]["favorites"]["Row"],
    "user_id" | "element_id"
  >[];
  comments: (Pick<
    Database["public"]["Tables"]["comments"]["Row"],
    "id" | "payload" | "created_at" | "user_id"
  > & {
    users: SimpleUser | null;
  })[];
};

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
export async function getElement({ elementId }: { elementId: string }) {
  const supabase = await createClient();

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
    data: element as ElementDetail,
    error: null,
  };
}

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
    console.error("요소 조회 실패:", fetchError);
    return { error: "요소 조회 실패" };
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

/** elementId와 현재 로그인한 user id를 사용하여 element 삭제하는 함수 */
export async function deleteElement({
  elementId,
  userId,
}: {
  elementId: string;
  userId: string | null;
}) {
  if (!userId) {
    return {
      data: null,
      error: "사용자 ID가 필요합니다.",
    };
  }

  if (!elementId) {
    return {
      data: null,
      error: "요소 ID가 필요합니다.",
    };
  }

  const supabase = await createClient();
  const currentUserId = await checkUserLogin();

  if (currentUserId !== userId) {
    return {
      data: null,
      error: "사용자 인증에 실패했습니다.",
    };
  }

  const { data, error } = await supabase
    .from("elements")
    .delete()
    .eq("id", elementId)
    .eq("user_id", userId);

  if (error) {
    return {
      data: null,
      error: "요소 삭제에 실패했습니다.",
    };
  }

  return {
    data,
    error: null,
  };
}

/** element에 대한 북마크 insert 함수 */
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

  return { data: commentData, error: null };
}
