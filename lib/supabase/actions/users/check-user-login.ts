"use server";

import { createClient } from "@/lib/supabase/server";

export default async function checkUserLogin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user !== null && user.id !== null) return user.id;

  return null;
}
