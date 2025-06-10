// components
import HeadingTextSection from "@/components/heading-text";
import BrowseAllLinkButton from "@/components/browse-all-button";
import { RandomElementLoading } from "./loading";
// actions
import { getRandomElements } from "./actions";
// etc
import { Suspense } from "react";
import ElementLinkCard from "@/components/element-card-with-link";

export default function Home() {
  return (
    <div className="p-5 space-y-15">
      <HeadingTextSection />
      <Suspense fallback={<RandomElementLoading />}>
        <RandomElementsGrid />
      </Suspense>
    </div>
  );
}

async function RandomElementsGrid() {
  const elements = await getRandomElements();

  return (
    <section className="relative">
      <div className="grid grid-cols-5 gap-5">
        {elements.map((element, idx) => (
          <ElementLinkCard
            key={idx}
            elementId={element.id}
            htmlCode={element.html}
            cssCode={element.css}
            revealAnimation
          />
        ))}
      </div>
      <BrowseAllLinkButton />
    </section>
  );
}
