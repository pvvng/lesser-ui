import checkUserLogin from "@/lib/supabase/action/check-user-login";
import { notFound, redirect } from "next/navigation";
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

  if (error || !element) {
    console.error("UI 컴포넌트를 찾을 수 없습니다.");
    return notFound();
  }
  const v = element.comments;

  if (!currentUserId || currentUserId !== element.user_id) {
    console.error("접근 권한이 없습니다.");
    return redirect("/element/" + elementId);
  }

  return <EditElementView element={element} />;
}
