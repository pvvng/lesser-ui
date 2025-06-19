"use client";

import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FavoriteToggleButtonProps {
  isFavorite: boolean;
  handleFavoriteClick: () => Promise<void>;
}

export default function FavoriteToggleButton({
  isFavorite,
  handleFavoriteClick,
}: FavoriteToggleButtonProps) {
  return (
    <button
      className={`${
        isFavorite
          ? "bg-green-500 hover:bg-green-600"
          : "bg-neutral-800 hover:bg-neutral-700"
      } w-full text-center py-2 flex justify-center items-center gap-2
      transition-colors rounded font-semibold cursor-pointer text-sm`}
      onClick={handleFavoriteClick}
    >
      <FontAwesomeIcon icon={faBookmark} />
      {isFavorite ? "Delete to Favorites" : "Save to Favorites"}
    </button>
  );
}
