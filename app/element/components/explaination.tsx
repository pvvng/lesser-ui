"use client";

// actions
import { insertFavorite } from "@/lib/supabase/actions/favorites";
import { deleteFavorite } from "@/lib/supabase/actions/favorites";
// components
import FavoriteToggleButton from "./favorite-toggle-button";
import DeleteModal from "./delete-modal";
import OwnerButtons from "./owner-buttons";
// etc
import { useState } from "react";

interface ExplainationContainerProps {
  children: React.ReactNode;
  elementId: string;
  userId: string | null;
  isFavorite: boolean;
  isOwner: boolean;
}

export default function ExplainationContainer({
  children,
  elementId,
  userId,
  isFavorite: initialIsFavorite,
  isOwner,
}: ExplainationContainerProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

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
      {isDeleteModalOpen && (
        <DeleteModal
          userId={userId}
          elementId={elementId}
          toggleDeleteModal={toggleDeleteModal}
        />
      )}
      {/* explain content children */}
      {children}
      {/* favorite button */}
      {!isOwner ? (
        <FavoriteToggleButton
          isFavorite={isFavorite}
          handleFavoriteClick={handleFavoriteClick}
        />
      ) : (
        <OwnerButtons
          elementId={elementId}
          toggleDeleteModal={toggleDeleteModal}
        />
      )}
    </section>
  );
}
