// components
import ConfettiCelebration from "../components/confetti-celebration";
import ElementTitle from "../components/title";
import ElementTag from "../components/tag";
import UserInfo from "../components/user-info";
import CommentSection from "../components/comment-section";
import ExplainationContainer from "../components/explaination";
import ElementDetailHeader from "../components/header";
import MITLicenseContainer from "../components/license-container";
import SnippetStudio from "@/components/snippet-studio";
// action
import {
  getElementDetail,
  incrementViewCount,
} from "@/lib/supabase/actions/elements";
import { checkUserLogin } from "@/lib/supabase/actions/users";
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
    getElementDetail({ elementId }),
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
        <ExplainationContainer
          elementId={element.id}
          userId={userId}
          isFavorite={isFavorite}
          isOwner={isOwner}
        >
          <ElementTitle
            name={element.name}
            bio={element.bio || "설명이 존재하지 않는 UI 입니다."}
          />
          <ElementTag tag={element.tag} />
          <hr className="border-neutral-700" />
          <UserInfo
            creatorId={userId}
            avatar={element.users?.avatar || "/unknown.png"}
            nickname={element.users?.nickname || "탈퇴한 사용자"}
            createdAt={getKoreanDate(element.created_at)}
          />
        </ExplainationContainer>
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
