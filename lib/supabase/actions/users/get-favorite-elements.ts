"use server";

import { Element } from "@/types/core";
import { createClient } from "../../server";

interface PromiseReturnType {
  data: Element[];
  count: number;
  error: string | null;
}

const PAGE_SIZE = 20;

export async function getFavoriteElements({
  userId,
  page,
}: {
  userId: string;
  page: number;
}): Promise<PromiseReturnType> {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();

  const { data, error, count } = await supabase
    .from("favorites")
    .select("elements(*)", { count: "exact" })
    .eq("user_id", userId)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Fetch error: ", error);
    return {
      data: [],
      count: 0,
      error: "데이터를 불러오는 중 오류가 발생했습니다.",
    };
  }

  const processedData = data.map(({ elements }) => elements);

  return {
    data: processedData,
    count: count ?? 0,
    error: null,
  };
}
