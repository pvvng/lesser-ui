import UserCodePreviewSection from "./code-preview-section";
import { getFavoriteElements } from "@/lib/supabase/actions/elements";

export default async function TabFavoritesSection({
  userId,
}: {
  userId: string;
}) {
  const { data, error, count } = await getFavoriteElements({
    userId,
    page: 0,
  });

  if (error) {
    return <p className="text-sm text-neutral-400">{error}</p>;
  }

  return (
    <UserCodePreviewSection
      elements={data}
      count={count}
      type="favorites"
      userId={userId}
      action={getFavoriteElements}
    />
  );
}
