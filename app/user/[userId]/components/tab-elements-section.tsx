import UserCodePreviewSection from "./code-preview-section";
import { getUserElements } from "@/lib/supabase/actions/elements";

export default async function TabElementsSection({
  userId,
}: {
  userId: string;
}) {
  const { data, error, count } = await getUserElements({ userId, page: 0 });

  if (error) {
    return <p className="text-sm text-neutral-400">{error}</p>;
  }

  return (
    <UserCodePreviewSection
      elements={data}
      type="elements"
      count={count}
      userId={userId}
      action={getUserElements}
    />
  );
}
