import checkUserLogin from "@/lib/supabase/action/check-user-login";
import { getUserdata } from "./actions";
import { notFound, unauthorized } from "next/navigation";
import EditUserdataView from "@/components/user-page/edit-page-view";

interface UserDashBoardProps {
  params: Promise<{ userId: string }>;
}

export default async function EditUserDetailPage({
  params,
}: UserDashBoardProps) {
  const [currentUserId, { userId }] = await Promise.all([
    checkUserLogin(),
    params,
  ]);

  const isOwner = currentUserId === userId;

  if (!isOwner) return unauthorized();

  const { data: userdata, error } = await getUserdata({ userId });

  if (error || !userdata) return notFound();

  return (
    <EditUserdataView
      nickname={userdata.nickname}
      avatar={userdata.avatar}
      userId={userdata.id}
    />
  );
}
