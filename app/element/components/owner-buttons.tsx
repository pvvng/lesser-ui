"use client";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function OwnerButtons({
  elementId,
  toggleDeleteModal,
}: {
  elementId: string;
  toggleDeleteModal: () => void;
}) {
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
      <button
        className="bg-neutral-800 hover:bg-neutral-700 text-red-400
        w-full text-center py-2 flex justify-center items-center gap-2
        transition-colors rounded font-semibold cursor-pointer text-sm"
        onClick={toggleDeleteModal}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete Element
      </button>
    </div>
  );
}
