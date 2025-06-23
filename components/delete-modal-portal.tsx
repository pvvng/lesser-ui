"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DeleteModal from "./delete-modal";

interface DeleteModalPortalProps {
  type: "comment" | "element";
  toggleDeleteModal: () => void;
  deleteAction: () => Promise<void>;
}

/** delete modal 전용 포탈 */
export default function DeleteModalPortal(props: DeleteModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <DeleteModal {...props} />,
    document.getElementById("modal-root")!
  );
}
