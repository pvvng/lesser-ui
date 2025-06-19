import { createClient } from "@/lib/supabase/server";
import UserCodePreviewSection from "./code-preview-section";

export default async function TabFavoritesSection({
  userId,
}: {
  userId: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("favorites")
    .select("elements(*)")
    .eq("user_id", userId);

  if (error || !data) {
    return null;
  }

  const processedData = data.map(({ elements }) => elements);

  return <UserCodePreviewSection elements={processedData} type="favorites" />;
}
