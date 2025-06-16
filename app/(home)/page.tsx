// components
import HeadingTextSection from "@/components/heading-text";
import BrowseAllLinkButton from "@/components/browse-all-button";
import ElementLinkCard from "@/components/element-card-with-link";
import { RandomElementLoading } from "./loading";
// actions
import { createElementQuery } from "@/lib/supabase/actions/elements";
// etc
import { Suspense } from "react";

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
  const elementQuery = await createElementQuery();
  const { data: elements } = await elementQuery.random().fetch();

  return (
    <section className="relative">
      <div className="grid grid-cols-5 gap-5">
        {elements?.map((element, idx) => (
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
