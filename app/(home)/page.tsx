// components
import HeadingTextSection from "@/components/heading-text";
import BrowseAllLinkButton from "@/components/browse-all-button";
import ElementLinkCard from "@/components/element-link-card";
import { RandomElementLoading } from "./loading";
// actions
import { getRandomElements } from "./actions";
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
  const elements = await getRandomElements();

  return (
    <section className="relative">
      <div className="grid grid-cols-5 gap-5">
        {elements.map((element, idx) => (
          <ElementLinkCard element={element} key={idx} />
        ))}
      </div>
      <BrowseAllLinkButton />
    </section>
  );
}
