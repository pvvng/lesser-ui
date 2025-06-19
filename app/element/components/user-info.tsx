import Image from "next/image";
import Link from "next/link";

export default function UserInfo({
  creatorId,
  avatar,
  nickname,
  createdAt,
}: {
  creatorId: string | null;
  avatar: string;
  nickname: string;
  createdAt: string;
}) {
  return (
    <div className="flex gap-3 items-center">
      <Link
        href={creatorId ? `/user/${creatorId}` : "#"}
        className="size-14 rounded bg-neutral-200 relative overflow-hidden"
      >
        <Image
          src={avatar}
          alt={nickname}
          fill
          sizes="56px"
          className="object-cover"
          draggable={false}
          unoptimized
        />
      </Link>
      <div>
        <p className="text-lg font-semibold">{nickname}</p>
        <p className="text-sm text-neutral-400">{createdAt}</p>
      </div>
    </div>
  );
}
