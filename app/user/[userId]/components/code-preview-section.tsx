import ElementLinkCard from "@/components/element-card-with-link";
import EmptyMessage from "./empty-message";
import { Element } from "@/types/core";

interface UserCodePreviewSectionProps {
  elements: Element[];
  type: "favorites" | "elements";
}

export default async function UserCodePreviewSection({
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
