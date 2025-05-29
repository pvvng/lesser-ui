// supabase lib func
import checkUserLogin from "@/lib/supabase/action/check-user-login";
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
import findUserById from "@/lib/supabase/action/find-user-by-id";

interface UserDashBoardProps {
  params: Promise<{ userId: string }>;
}

export default async function UserDashBoard({ params }: UserDashBoardProps) {
  const [nowUserId, { userId }] = await Promise.all([checkUserLogin(), params]);

  const isOwner = nowUserId === userId;

  if (!userId) return notFound();

  const response = await findUserById({ userId });

  if (response.error || !response.data) return notFound();

  const userdata = response.data;

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
          className="object-cover bg-neutral-700"
          sizes="100vw"
          priority
        />
      </div>
      {/* name */}
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-[2rem] font-semibold">{userdata.nickname}</p>
          {userdata.provider && (
            <div className="relative size-[2rem] rounded bg-neutral-300">
              <Image
                src={`/${userdata.provider}.svg`}
                alt={userdata.provider}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        {isOwner && (
          <div className="flex items-center gap-1">
            <EditProfileLinkButton />
            <LogoutButton />
          </div>
        )}
      </section>
      {/* tabs */}
      <TabSection />
    </div>
  );
}

function EditProfileLinkButton() {
  return (
    <Link
      href="#"
      className="px-3 py-2 rounded font-semibold cursor-pointer flex gap-1 items-center
      transition-colors bg-neutral-800 hover:bg-neutral-700"
    >
      <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
    </Link>
  );
}
