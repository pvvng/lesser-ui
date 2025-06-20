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
import { Suspense } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CommentSectionLoading,
  LicenseContainerLoading,
  UserInfoLoading,
} from "./loading";

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

  const [userId, { data: element, error }] = await Promise.all([
    checkUserLogin(),
    getElementDetail({ elementId }),
  ]);

  if (error || !element) {
    console.error(error);
    return notFound();
  }

  // 조회수 증가
  await incrementViewCount({ elementId });

  // 현재 사용자가 이 element의 작성자인지 확인
  const isOwner = userId === element.user_id;

  // 현재 사용자가 이 element에 좋아요를 남겼는지 확인
  const isFavorite = element.favorites?.some(
    (favorite) => favorite.user_id === userId
  );

  return (
    <div className="p-5">
      <ConfettiCelebration run={shouldCelebrate} />
      <ElementDetailHeader
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
          <Suspense fallback={<UserInfoLoading />}>
            <UserInfo
              creatorId={element.user_id}
              createdAt={getKoreanDate(element.created_at)}
            />
          </Suspense>
        </ExplainationContainer>
        <div className="col-span-2 space-y-12">
          <Suspense fallback={<CommentSectionLoading />}>
            <CommentSection userId={userId} elementId={element.id} />
          </Suspense>
          <Suspense fallback={<LicenseContainerLoading />}>
            <MITLicenseContainer creatorId={element.user_id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
