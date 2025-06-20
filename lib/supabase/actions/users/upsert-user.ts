"use server";

import { createClient } from "@/lib/supabase/server";
import createActionResponse from "@/lib/utils/create-action-response";

interface InsertUserParams {
  id: string;
  email: string | null;
  nickname: string;
  avatar: string | null;
  provider: string | null;
}

export async function upsertUser(insertValue: InsertUserParams) {
  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("users")
    .upsert(
      [{ ...insertValue }],
      { onConflict: "id" } // upsert 시 기준이 되는 고유 제약 조건(column)
    )
    .select("id")
    .maybeSingle();

  if (error || !user) {
    console.error("Upsert Error:", error);
    return createActionResponse(
      null,
      "유저 정보를 저장하는 중 오류가 발생했습니다."
    );
  }

  console.error("upsert user:", user.id);

  return createActionResponse(user, null);
}
