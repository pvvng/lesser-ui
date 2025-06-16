// supabase lib func
import checkUserLogin from "@/lib/supabase/actions/users/check-user-login";
// actions
import { getUserDetail } from "@/lib/supabase/actions/users/get-user-detail";
// component
import LogoutButton from "@/components/auth/logout-button";
import TabSection from "@/components/user-page/tab-section";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// next
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface UserDashBoardProps {
  params: Promise<{ userId: string }>;
}

export default async function UserDashBoard({ params }: UserDashBoardProps) {
  const [currentUserId, { userId }] = await Promise.all([
    checkUserLogin(),
    params,
  ]);

  const isOwner = currentUserId === userId;

  if (!userId) return notFound();

  const { data: userdata, error } = await getUserDetail({ userId });

  if (error || !userdata) return notFound();

  return (
    <div className="space-y-5 p-5">
      {/* background */}
      <section className="w-full h-72 bg-neutral-800"></section>
      {/* avatar */}
      <div className="size-36 rounded-full relative overflow-hidden -mt-12">
        <Image
          src={userdata.avatar || ""}
          alt={userdata.nickname}
          fill
          className="object-cover bg-neutral-200"
          sizes="144px"
          priority
          draggable={false}
          unoptimized
        />
      </div>
      {/* name */}
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-3xl font-semibold">{userdata.nickname}</p>
        </div>
        {isOwner && (
          <div className="flex items-center gap-1">
            <EditProfileLinkButton userId={userdata.id} />
            <LogoutButton />
          </div>
        )}
      </section>
      {/* tabs */}
      <TabSection
        favorites={userdata.favorites}
        elements={userdata.elements}
        comments={userdata.comments}
      />
    </div>
  );
}

function EditProfileLinkButton({ userId }: { userId: string }) {
  return (
    <Link
      href={`/user/${userId}/edit`}
      className="px-3 py-2 rounded font-semibold cursor-pointer flex gap-1 items-center
      transition-colors bg-neutral-800 hover:bg-neutral-700"
    >
      <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
    </Link>
  );
}
