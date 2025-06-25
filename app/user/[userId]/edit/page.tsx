import EditUserdataView from "@/app/user/[userId]/edit/components/edit-page-view";
import { checkUserLogin } from "@/lib/supabase/actions/users";
import { getUserdata } from "@/lib/supabase/actions/users";
import { Metadata } from "next";
import { notFound, unauthorized } from "next/navigation";

interface UserDashBoardProps {
  params: Promise<{ userId: string }>;
}

export const metadata: Metadata = {
  title: "프로필 수정",
  description: "프로필 정보를 수정할 수 있는 페이지입니다.",
};

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
      background={userdata.background}
    />
  );
}
