// action
import ConfettiCelebration from "@/components/confetti-celebration";
import CommentForm from "@/components/element-detail/comment-form";
import ElementExplaination from "@/components/element-detail/explaination";
import ElementDetailHeader from "@/components/element-detail/header";
import MITLicenseContainer from "@/components/element-detail/license-container";
import SnippetStudio from "@/components/snippet-studio";
// action
import { getElement } from "./actions";
// util
import { getKoreanDate } from "@/lib/utils/get-korean-date";
// etc
import { notFound } from "next/navigation";

interface ElementDetailProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function ElementDetail({
  params,
  searchParams,
}: ElementDetailProps) {
  const elementId = (await params).id;
  const celebration = (await searchParams).celebration === "true";

  const { data: element, error } = await getElement({ elementId });

  if (error || !element) {
    console.error(error);
    notFound();
  }

  return (
    <div className="p-5">
      <ConfettiCelebration run={celebration} />
      <ElementDetailHeader
        userId={element.user_id}
        username={element.users?.nickname || "알 수 없는 사용자"}
        view={element.view}
        marked={element.marked}
      />
      <SnippetStudio userHtml={element.html} userCss={element.css} />
      <div className="mt-10 grid md:grid-cols-3 grid-cols-1 gap-5">
        <ElementExplaination
          tag={element.tag}
          elementName={element.name}
          username={element.users?.nickname || "알 수 없는 사용자"}
          userId={element.user_id}
          userAvatar={element.users?.avatar || "/unknown.png"}
          createdAt={getKoreanDate(element.created_at)}
          isFavorite={false}
        />
        <section className="col-span-2 space-y-12">
          <div>
            <CommentForm />
          </div>
          <MITLicenseContainer
            username={element.users?.nickname || "알 수 없는 사용자"}
          />
        </section>
      </div>
    </div>
  );
}
