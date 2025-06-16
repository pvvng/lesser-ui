import checkUserLogin from "@/lib/supabase/actions/users/check-user-login";
import { notFound, unauthorized } from "next/navigation";
import { getElement } from "../actions";
import EditElementView from "@/components/element-edit/view";

interface ElementDetailProps {
  params: Promise<{ id: string }>;
}

export default async function EditElementDetail({
  params,
}: ElementDetailProps) {
  const elementId = (await params).id;
  const currentUserId = await checkUserLogin();

  const { data: element, error } = await getElement({ elementId });

  if (error || !element) return notFound();

  if (!currentUserId || currentUserId !== element.user_id)
    return unauthorized();

  return <EditElementView element={element} />;
}
