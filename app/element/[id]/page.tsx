// components
import ConfettiCelebration from "@/components/confetti-celebration";
import CommentSection from "@/components/element-detail/comment-section";
import ElementExplaination from "@/components/element-detail/explaination";
import ElementDetailHeader from "@/components/element-detail/header";
import MITLicenseContainer from "@/components/element-detail/license-container";
import SnippetStudio from "@/components/snippet-studio";
// action
import checkUserLogin from "@/lib/supabase/actions/users/check-user-login";
import { getElement } from "@/lib/supabase/actions/element/get-element";
import { incrementViewCount } from "@/lib/supabase/actions/element/increase-view";
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
  const [{ id: elementId }, { celebration }] = await Promise.all([
    params,
    searchParams,
  ]);

  const shouldCelebrate = celebration === "true";

  const [userId, _, { data: element, error }] = await Promise.all([
    checkUserLogin(),
    incrementViewCount({ elementId }),
    getElement({ elementId }),
  ]);

  if (error || !element) {
    console.error(error);
    notFound();
  }

  const isOwner = userId === element.user_id;

  const isFavorite = element.favorites?.some(
    (favorite) => favorite.user_id === userId
  );

  return (
    <div className="p-5">
      <ConfettiCelebration run={shouldCelebrate} />
      <ElementDetailHeader
        userId={element.user_id}
        username={element.users?.nickname || "탈퇴한 사용자"}
        view={element.view}
        marked={element.favorites?.length || 0}
      />
      <SnippetStudio userHtml={element.html} userCss={element.css} />
      <div className="mt-10 grid md:grid-cols-3 grid-cols-1 gap-5">
        <ElementExplaination
          tag={element.tag}
          elementId={element.id}
          elementName={element.name}
          elementBio={element.bio}
          username={element.users?.nickname || "탈퇴한 사용자"}
          creatorId={element.user_id}
          userAvatar={element.users?.avatar || "/unknown.png"}
          createdAt={getKoreanDate(element.created_at)}
          userId={userId}
          isFavorite={isFavorite}
          isOwner={isOwner}
        />
        <div className="col-span-2 space-y-12">
          <CommentSection
            userId={userId}
            elementId={element.id}
            comments={element.comments}
          />
          <MITLicenseContainer
            username={element.users?.nickname || "탈퇴한 사용자"}
          />
        </div>
      </div>
    </div>
  );
}
