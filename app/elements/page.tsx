import SearchInputButton from "@/app/elements/components/search-input-button";
import ElementsView from "@/app/elements/components/view";
import { getValidSearchParam } from "@/lib/utils/get-valid-search-params";
import { getBySearch } from "@/lib/supabase/actions/elements";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function ElementsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const search = getValidSearchParam(searchParams.search);
  const tag = getValidSearchParam(searchParams.tag);

  const {
    data: elements,
    count,
    error,
  } = await getBySearch({
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
        initialElements={elements || []}
        count={count || 0}
        search={search}
        tag={tag}
      />
    </div>
  );
}
