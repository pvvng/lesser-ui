"use client";

// hooks
import useSlideUp from "@/lib/hooks/gsap/use-slide-up";

export default function TabSection({
  children = null,
  deps,
}: {
  children?: React.ReactNode;
  deps?: unknown;
}) {
  const contentRef = useSlideUp(deps);

  return (
    <section
      className="w-full py-5 max-h-[500px] overflow-auto rounded-2xl rounded-tl-none"
      ref={contentRef}
    >
      {children}
    </section>
  );
}
