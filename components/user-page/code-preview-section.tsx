import ElementLinkCard from "../element-card-with-link";
import { UserElement } from "@/types/core";
import EmptyMessage from "./empty-message";

interface UserCodePreviewSectionProps {
  elements: UserElement[];
  type: "favorites" | "elements";
}

export default function UserCodePreviewSection({
  elements,
  type,
}: UserCodePreviewSectionProps) {
  if (elements.length === 0) {
    return <EmptyMessage type={type} />;
  }

  return (
    <div className="grid grid-cols-5 gap-5">
      {elements.map((element) => (
        <ElementLinkCard
          key={element.id}
          elementId={element.id}
          htmlCode={element.html}
          cssCode={element.css}
        />
      ))}
    </div>
  );
}
