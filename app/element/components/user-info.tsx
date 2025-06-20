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
        className="size-14 rounded bg-neutral-200 relative overflow-hidden"
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
        <p className="text-lg font-semibold">
          {userdata?.nickname || "탈퇴한 사용자"}
        </p>
        <p className="text-sm text-neutral-400">{createdAt}</p>
      </div>
    </div>
  );
}
