"use server";

import { Element } from "@/types/core";
import { createElementQuery } from "../elements";

interface PromiseReturnType {
  data: Element[];
  count: number;
  error: string | null;
}

export async function getUserElements({
  userId,
  page,
}: {
  userId: string;
  page: number;
}): Promise<PromiseReturnType> {
  const elementQuery = await createElementQuery();
  const { data, error, count } = await elementQuery
    .byAuthor(userId)
    .range({ page })
    .order({ field: "created_at", ascending: false })
    .fetch();

  if (error || !data) {
    console.error("Fetch error: ", error);
    return {
      data: [],
      count: 0,
      error: "데이터를 불러오는 중 오류가 발생했습니다.",
    };
  }

  return {
    data,
    count: count ?? 0,
    error: null,
  };
}
