import ElementsView from "@/app/elements/components/view";
import { getValidSearchParam } from "@/lib/utils/get-valid-search-params";
import { getBySearch } from "@/lib/supabase/actions/elements";
import { Metadata } from "next";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export const metadata: Metadata = {
  title: "전체 UI 블록",
  description:
    "Lesser UI에 등록된 오픈소스 UI 블록을 한눈에 확인하고, 원하는 UI 디자인을 찾아보세요.",
};

export default async function ElementsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const search = getValidSearchParam(searchParams.search);
  const tag = getValidSearchParam(searchParams.tag);
  const orderBy = getValidSearchParam(searchParams.orderBy);

  const {
    data: elements,
    count,
    error,
  } = await getBySearch({
    search,
    tag,
    page: 0,
    orderBy,
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
    <ElementsView
      initialElements={elements}
      count={count || 0}
      search={search}
      tag={tag}
      orderBy={orderBy}
    />
  );
}
