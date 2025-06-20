import { getUserdata } from "@/lib/supabase/actions/users";
import Image from "next/image";
import Link from "next/link";

interface UserInfo {
  avatar: string | null;
  nickname: string;
}

const UNKNOWN_USER: UserInfo = {
  avatar: "/unknown.png",
  nickname: "탈퇴한 사용자",
};

export default async function UserInfo({
  creatorId,
  createdAt,
}: {
  creatorId: string | null;
  createdAt: string;
}) {
  const getUserInfo = async () => {
    let userInfo: UserInfo = { ...UNKNOWN_USER };
    const { data: userdata } = await getUserdata({
      userId: creatorId ?? "",
    });

    if (userdata) userInfo = { ...userdata };

    return userInfo;
  };

  const userInfo = await getUserInfo();

  return (
    <div className="flex gap-3 items-center">
      <Link
        href={creatorId ? `/user/${creatorId}` : "#"}
        className="size-14 rounded bg-neutral-200 hover:scale-95 transition-all relative overflow-hidden"
      >
        <Image
          src={userInfo.avatar || "/unknown.png"}
          alt={userInfo.nickname}
          fill
          sizes="56px"
          className="object-cover"
          draggable={false}
          unoptimized
        />
      </Link>
      <div>
        <Link
          href={creatorId ? `/user/${creatorId}` : "#"}
          className="text-lg font-semibold
            hover:bg-neutral-600 transition-colors rounded p-0.5"
        >
          {userInfo.nickname}
        </Link>
        <p className="text-sm text-neutral-400 pl-0.5">{createdAt}</p>
      </div>
    </div>
  );
}
