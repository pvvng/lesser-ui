import { getKoreanDate } from "@/lib/utils/get-korean-date";
import Image from "next/image";
import Link from "next/link";

interface CommentProps {
  id: string;
  userId: string | null;
  avatar: string | null;
  nickname: string | null;
  createdAt: string;
  payload: string;
}

export default function CommentCard({
  id: commentId,
  userId,
  avatar,
  nickname,
  createdAt,
  payload,
}: CommentProps) {
  return (
    <div className="p-5 bg-neutral-800 rounded-2xl">
      <div className="flex gap-3 items-center">
        <Link
          href={`/user/${userId}`}
          className="size-12 rounded-full overflow-hidden relative"
        >
          <Image
            src={avatar || "/unknown.png"}
            alt={nickname || "탈퇴한 사용자"}
            sizes="48px"
            fill
            className="object-cover"
            draggable={false}
          />
        </Link>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{nickname || "탈퇴한 사용자"}</p>
          <p className="text-xs text-neutral-400">{getKoreanDate(createdAt)}</p>
        </div>
      </div>
      <hr className="border-neutral-600 my-3" />
      <p>{payload}</p>
    </div>
  );
}
