"use client";

import Navbar from "@/components/navbar";
import HeadingTextSection from "@/components/heading-text";
import MultiRowHorizontalScroller from "@/components/horizontal-scroll-elements";

export default function Home() {
  const items = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="min-h-[20000px]">
      <Navbar />
      <div className="p-5 space-y-5">
        <HeadingTextSection />
        <MultiRowHorizontalScroller items={items} />
        <div className="bg-red-400 h-screen"></div>
      </div>
    </div>
  );
}
