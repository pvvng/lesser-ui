import { cookies } from "next/headers";
import { createElementQuery } from "./builder";
import { unstable_cache } from "next/cache";

export async function _getRandomElements({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) {
  const elementQuery = await createElementQuery(cookieStore);
  const { data: elements, error } = await elementQuery.random().fetch();

  if (error) {
    console.error(error);
    return [];
  }

  return elements ?? [];
}

export async function getRandomElements(): ReturnType<
  typeof _getRandomElements
> {
  const cookieStore = cookies();

  return unstable_cache(
    () => _getRandomElements({ cookieStore }),
    ["random-elements"],
    {
      tags: ["random-elements"],
      revalidate: 60 * 60 * 24, // 매일 캐시 갱신
    }
  )();
}
