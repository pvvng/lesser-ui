"use server";

import { createClient } from "@/lib/supabase/server";
import { UserDetail } from "@/types/core";

const selecteField = `
  id, avatar, nickname, provider, email,
  elements:elements!elements_user_id_fkey (
    id, name, bio, view, marked, type, tag, created_at, html, css
  ),
  comments (
    id, payload, element_id, created_at,
    element:elements (
      id, name, bio, view, marked, type, tag, created_at, html, css
    )
  ),
  favorites (
    element:elements (
      id, name, bio, view, marked, type, tag, created_at, html, css
    )
  )
`;

export async function getUserDetail({
  userId,
}: {
  userId: string;
}): Promise<{ data: UserDetail | null; error: string | null }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select(selecteField)
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error(error);
    return {
      data: null,
      error: "Failed to fetch user data",
    };
  }

  const processedData = {
    ...data,
    favorites: (data.favorites || []).map((f: any) => f.element),
  };

  return {
    data: processedData,
    error: null,
  };
}
