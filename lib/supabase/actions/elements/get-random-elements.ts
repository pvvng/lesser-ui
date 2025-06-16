"use server";

import { createClient } from "@/lib/supabase/server";
import { Element } from "@/types/core";

export async function getRandomElements(count?: number): Promise<Element[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("elements")
    .select("*")
    .limit(100); // 충분히 큰 샘플

  if (error) {
    console.error("Error fetching elements:", error.message);
    return [];
  }

  // Fisher–Yates 셔플 후 15개 슬라이스
  const shuffled = data.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count ?? 15);
}
