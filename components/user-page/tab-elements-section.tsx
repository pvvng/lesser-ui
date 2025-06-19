import { createElementQuery } from "@/lib/supabase/actions/elements";
import UserCodePreviewSection from "./code-preview-section";

export default async function TabElementsSection({
  userId,
}: {
  userId: string;
}) {
  const elementQuery = await createElementQuery();
  const { data, error } = await elementQuery.byAuthor(userId).fetch();

  if (!data || error) {
    return null;
  }

  return <UserCodePreviewSection elements={data} type="elements" />;
}
