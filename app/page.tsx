import HeadingTextSection from "@/components/heading-text";
import BrowseAllLinkButton from "@/components/browse-all-button";
import ElementLinkCard from "@/components/element-link-card";
import LoginButtons from "@/components/oauth-login-button";

export default function Home() {
  // ui element item
  const items = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="p-5 space-y-15">
      <LoginButtons />
      <HeadingTextSection />
      <section className="relative">
        <div className="grid grid-cols-5 gap-5">
          {items.map((item, idx) => (
            <ElementLinkCard item={item} key={idx} />
          ))}
        </div>
        <BrowseAllLinkButton />
      </section>
    </div>
  );
}
