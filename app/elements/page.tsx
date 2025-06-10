import ElementLinkCard from "@/components/element-card-with-link";
import { getElementsBySearchTag } from "./actions";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function Element(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const search = searchParams.search;
  const tag = searchParams.tag;

  const { data: elements, error } = await getElementsBySearchTag({
    search,
    tag,
  });

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
    <div className="grid grid-cols-3 gap-5 mt-10 p-5">
      {elements.map((element) => (
        <ElementLinkCard
          key={element.id}
          elementId={element.id}
          htmlCode={element.html}
          cssCode={element.css}
        />
      ))}
    </div>
  );
}
