import EditUserdataView from "@/app/user/[userId]/edit/components/edit-page-view";
import { checkUserLogin } from "@/lib/supabase/actions/users";
import { getUserdata } from "@/lib/supabase/actions/users";
import { notFound, unauthorized } from "next/navigation";

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
