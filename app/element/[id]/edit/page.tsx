// components
import ElementWorkspace from "@/components/element-workspace";
// actions
import { getElementDetail } from "@/lib/supabase/actions/elements";
import { checkUserLogin } from "@/lib/supabase/actions/users";
// etc
import { notFound, unauthorized } from "next/navigation";
import { editElementAction } from "./actions";

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

  if (!currentUserId || currentUserId !== element.user_id) {
    return unauthorized();
  }

  return (
    <ElementWorkspace
      element={element}
      type="edit"
      action={editElementAction}
    />
  );
}
