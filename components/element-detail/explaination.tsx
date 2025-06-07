"use client";

import { deleteFavorite, insertFavorite } from "@/app/element/[id]/actions";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ElementExplainationProps {
  tag: string;
  elementId: string;
  elementName: string;
  creatorId: string | null;
  username: string;
  userAvatar: string;
  createdAt: string;
  userId: string | null;
  isFavorite: boolean;
}

export default function ElementExplaination({
  tag,
  elementId,
  elementName,
  username,
  creatorId,
  userAvatar,
  createdAt,
  userId,
  isFavorite: initialIsFavorite,
}: ElementExplainationProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleFavoriteClick = async () => {
    if (!userId) return alert("로그인이 필요합니다.");

    // optimistic update
    setIsFavorite((prev) => !prev);

    try {
      if (isFavorite) {
        await deleteFavorite({ userId, elementId });
      } else {
        await insertFavorite({ userId, elementId });
      }
    } catch (error) {
      alert("즐겨찾기 변경에 실패했어요.");
      setIsFavorite((prev) => !prev);
    }
  };

  return (
    <section className="space-y-6 relative">
      {/* tag */}
      <div className="space-y-3">
        <p className="text-2xl font-semibold">{tag}</p>
        <p className="text-neutral-300">{elementName}</p>
      </div>
      <hr className="border-neutral-700" />
      {/* user datas */}
      <div className="flex gap-3 items-center">
        <Link
          href={creatorId ? `/user/${creatorId}` : "#"}
          className="size-14 rounded bg-neutral-600 relative overflow-hidden"
        >
          <Image
            src={userAvatar}
            alt={username}
            fill
            sizes="56px"
            className="object-cover"
            draggable={false}
          />
        </Link>
        <div>
          <p className="text-lg font-semibold">{username}</p>
          <p className="text-sm text-neutral-400">{createdAt}</p>
        </div>
      </div>
      {/* favorite button */}
      <button
        className={`${
          isFavorite
            ? "bg-green-500 hover:bg-green-600"
            : "bg-neutral-800 hover:bg-neutral-700"
        } w-full text-center py-2 flex justify-center items-center gap-2
        transition-colors rounded font-semibold cursor-pointer text-sm`}
        onClick={handleFavoriteClick}
      >
        <FontAwesomeIcon icon={faBookmark} />{" "}
        {isFavorite ? "Delete to Favorites" : "Save to Favorites"}
      </button>
    </section>
  );
}
