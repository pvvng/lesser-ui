"use server";

import { createClient } from "@/lib/supabase/server";
import createActionResponse from "@/lib/utils/create-action-response";

export async function findUserById({ userId }: { userId: string }) {
  const supabase = await createClient();
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Find User Error:", error);
    return createActionResponse(
      null,
      "유저 정보를 찾는 중 오류가 발생했습니다."
    );
  }

  return createActionResponse(user, null);
}
