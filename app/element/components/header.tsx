"use client";

import {
  faArrowLeft,
  faBookmark,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ElementDetailHeaderProps {
  userId: string | null;
  // username: string;
  view: number;
  marked: number;
}

export default function ElementDetailHeader({
  userId,
  // username,
  view,
  marked,
}: ElementDetailHeaderProps) {
  const router = useRouter();

  const back = () => router.back();

  return (
    <section className="flex justify-between items-center px-4 mb-3">
      <button
        onClick={back}
        className="cursor-pointer flex gap-2 items-center text-sm 
        px-3 py-2 rounded transition-colors hover:bg-neutral-700"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Go Back
      </button>
      <div className="flex items-center gap-5">
        <p className="flex gap-3 items-center text-neutral-400">
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEye} /> {view}
          </span>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBookmark} /> {marked}
          </span>
        </p>
      </div>
    </section>
  );
}
