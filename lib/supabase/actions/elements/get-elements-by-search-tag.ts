"use server";

import { createClient } from "@/lib/supabase/server";
import { Element } from "@/types/core";
import { PostgrestError } from "@supabase/supabase-js";

interface GetElementsBySearchTagProps {
  search: string | string[] | undefined;
  tag: string | string[] | undefined;
  page: number;
  pageSize?: number;
}

interface PromiseReturnType {
  data: Element[];
  count: number;
  error: PostgrestError | null;
}

const PAGE_SIZE = 20;

/** search, tag string으로 pagination용 elements를 20개씩 불러오는 함수 */
export async function getElementsBySearchTag({
  search,
  tag,
  page,
  pageSize = PAGE_SIZE,
}: GetElementsBySearchTagProps): Promise<PromiseReturnType> {
  const supabase = await createClient();
  let query = supabase.from("elements").select("*", {
    count: "exact",
  });

  const from = page * pageSize;
  const to = from + pageSize - 1;

  // 이름 기반 검색
  if (typeof search === "string" && search.trim() !== "") {
    query = query.ilike("name", `%${search}%`);
  }

  // 일치 태그 검색
  if (typeof tag === "string" && tag.trim() !== "") {
    query = query.eq("tag", tag);
  }

  query = query.range(from, to).order("created_at", { ascending: false });

  const { data: elements, count, error } = await query;

  if (error) {
    console.error("Fetch error:", error);
    return {
      data: [] as Element[],
      count: 0,
      error: error,
    };
  }

  return {
    data: elements as Element[],
    count: count ?? 0,
    error: null,
  };
}
