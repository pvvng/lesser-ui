import { createClient } from "@/lib/supabase/server";

interface GetElementsBySearchTagProps {
  search: string | string[] | undefined;
  tag: string | string[] | undefined;
}

export async function getElementsBySearchTag({
  search,
  tag,
}: GetElementsBySearchTagProps) {
  const supabase = await createClient();
  let query = supabase.from("elements").select("*");

  // 이름 기반 검색
  if (typeof search === "string" && search.trim() !== "") {
    query = query.ilike("name", `%${search}%`);
  }

  // 일치 태그 검색
  if (typeof tag === "string" && tag.trim() !== "") {
    query = query.eq("tag", tag);
  }

  query = query.order("created_at", { ascending: false });

  const { data: elements, error } = await query;

  if (error) {
    console.error("Fetch error:", error);
    return {
      data: null,
      error,
    };
  }

  return {
    data: elements,
    error: null,
  };
}
