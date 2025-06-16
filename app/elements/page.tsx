import SearchInputButton from "@/components/search-input-button";
import ElementsView from "@/components/elements";
import { getElementsBySearchTag } from "@/lib/supabase/actions/elements/get-elements-by-search-tag";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function ElementsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.search;
  const tag = searchParams.tag;

  const {
    data: elements,
    count,
    error,
  } = await getElementsBySearchTag({
    search,
    tag,
    page: 0,
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
    <div className="mt-10 space-y-5">
      <div className="flex justify-end pr-5">
        <SearchInputButton />
      </div>
      <ElementsView
        initialElements={elements}
        count={count}
        search={search}
        tag={tag}
      />
    </div>
  );
}
