import { getUserdata } from "@/lib/supabase/actions/users";
import Image from "next/image";
import Link from "next/link";

export default async function UserInfo({
  creatorId,
  createdAt,
}: {
  creatorId: string | null;
  createdAt: string;
}) {
  const { data: userdata } = await getUserdata({
    userId: creatorId ?? "",
  });

  return (
    <div className="flex gap-3 items-center">
      <Link
        href={creatorId ? `/user/${creatorId}` : "#"}
        className="size-14 rounded bg-neutral-200 hover:scale-95 transition-all relative overflow-hidden"
      >
        <Image
          src={userdata?.avatar || "/unknown.png"}
          alt={userdata?.nickname || "unknown-user"}
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
          {userdata?.nickname || "탈퇴한 사용자"}
        </Link>
        <p className="text-sm text-neutral-400 pl-0.5">{createdAt}</p>
      </div>
    </div>
  );
}
