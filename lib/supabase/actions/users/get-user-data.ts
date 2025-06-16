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
      error: "Failed to fetch user data",
    };
  }

  return {
    data,
    error: null,
  };
}
