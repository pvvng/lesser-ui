import ElementCard from "@/components/snippet-studio/element-card-with-link";
import { createClient } from "@/lib/supabase/server";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function Element(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const search = searchParams.search;
  const tag = searchParams.tag;

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

  const { data: elements, error } = await query;

  if (error) {
    console.error("Fetch error:", error);
    return (
      <div className="*:text-center mt-20">
        <p className="text-xl font-semibold">Error!</p>
        <p>에러가 발생했습니다. 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-5 mt-10 p-5">
      {elements.map((element) => (
        <ElementCard
          key={element.id}
          elementId={element.id}
          htmlCode={element.html}
          cssCode={element.css}
        />
      ))}
    </div>
  );
}
