import ElementLinkCard from "../element-card-with-link";
import { UserElement } from "@/types/core";

interface UserCodePreviewSectionProps {
  elements: UserElement[];
}

export default function UserCodePreviewSection({
  elements,
}: UserCodePreviewSectionProps) {
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
