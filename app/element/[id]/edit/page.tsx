import { getElementDetail } from "@/lib/supabase/actions/elements";
import { notFound, unauthorized } from "next/navigation";
import EditElementView from "@/components/element-edit/view";
import { checkUserLogin } from "@/lib/supabase/actions/users";

interface ElementDetailProps {
  params: Promise<{ id: string }>;
}

export default async function EditElementDetail({
  params,
}: ElementDetailProps) {
  const elementId = (await params).id;
  const currentUserId = await checkUserLogin();

  const { data: element, error } = await getElementDetail({ elementId });

  if (error || !element) return notFound();

  if (!currentUserId || currentUserId !== element.user_id)
    return unauthorized();

  return <EditElementView element={element} />;
}
