"use client";

import {
  faArrowLeft,
  faBookmark,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ElementDetailHeader() {
  const router = useRouter();

  const back = () => router.back();

  return (
    <div className="flex justify-between items-center px-4 mb-3">
      <button
        onClick={back}
        className="cursor-pointer flex gap-2 items-center text-sm 
        px-3 py-2 rounded transition-colors hover:bg-neutral-700"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Go Back
      </button>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <p className="text-neutral-400">Created By</p>
          <Link href="#" className="flex gap-2 items-center">
            <div className="size-5 rounded bg-neutral-500"></div>
            <p className="font-bold">Pvvng</p>
          </Link>
        </div>
        <p className="flex gap-3 items-center text-neutral-400">
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEye} /> 403
          </span>
          <span className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBookmark} /> 26
          </span>
        </p>
      </div>
    </div>
  );
}
