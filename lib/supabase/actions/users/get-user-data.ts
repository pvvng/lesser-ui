"use server";

import { Users } from "@/types/core";
import { createClient } from "../../server";

interface PromiseReturnType {
  data: Users | null;
  error: string | null;
}

export async function getUserdata({
  userId,
}: {
  userId: string;
}): Promise<PromiseReturnType> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error(error);
    return {
      data: null,
      error: "사용자 정보를 불러오는 중 에러가 발생했습니다.",
    };
  }

  return {
    data,
    error: null,
  };
}
