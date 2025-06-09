"use client";

import { deleteFavorite, insertFavorite } from "@/app/element/[id]/actions";
import FavoriteToggleButton from "./favorite-toggle-button";
import { tagItems } from "@/lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faQuestion, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ElementExplainationProps {
  tag: string;
  elementId: string;
  elementName: string;
  elementBio: string | null;
  creatorId: string | null;
  username: string;
  userAvatar: string;
  createdAt: string;
  userId: string | null;
  isFavorite: boolean;
  isOwner: boolean;
}

export default function ElementExplaination({
  tag,
  elementId,
  elementName,
  elementBio,
  username,
  creatorId,
  userAvatar,
  createdAt,
  userId,
  isFavorite: initialIsFavorite,
  isOwner,
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
      <section className="space-y-1">
        <p className="text-2xl font-semibold">{elementName}</p>
        <p className="text-neutral-300">{elementBio}</p>
      </section>
      <section>
        <span className="inline-block rounded-2xl px-3 py-1 text-sm font-semibold bg-neutral-600">
          <FontAwesomeIcon
            icon={tagItems.find((item) => item.tag == tag)?.icon || faQuestion}
          />{" "}
          {tag}
        </span>
      </section>
      <hr className="border-neutral-700" />
      <section className="flex gap-3 items-center">
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
      </section>
      {/* favorite button */}
      {!isOwner ? (
        <FavoriteToggleButton
          isFavorite={isFavorite}
          handleFavoriteClick={handleFavoriteClick}
        />
      ) : (
        <OwnerLinkButtons elementId={elementId} />
      )}
    </section>
  );
}

function OwnerLinkButtons({ elementId }: { elementId: string }) {
  return (
    <div className="space-y-3">
      <Link
        href={`/element/${elementId}/edit`}
        className="bg-neutral-800 hover:bg-neutral-700
        w-full text-center py-2 flex justify-center items-center gap-2
        transition-colors rounded font-semibold cursor-pointer text-sm"
        scroll={false}
      >
        <FontAwesomeIcon icon={faEdit} /> Edit Element
      </Link>
      <Link
        href={`/element/${elementId}/delete`}
        className="bg-neutral-800 hover:bg-neutral-700 text-red-400
        w-full text-center py-2 flex justify-center items-center gap-2
        transition-colors rounded font-semibold cursor-pointer text-sm"
        scroll={false}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete Element
      </Link>
    </div>
  );
}
