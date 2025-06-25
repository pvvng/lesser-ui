// supabase lib func
import { checkUserLogin, getUserdata } from "@/lib/supabase/actions/users";
// util
import { getValidSearchParam } from "@/lib/utils/get-valid-search-params";
// component
import LogoutButton from "@/components/auth/logout-button";
import TabSection from "@/app/user/[userId]/components/tab-wrapper";
import TabFavoritesSection from "./components/tab-favorites-section";
import TabElementsSection from "./components/tab-elements-section";
import TabCommentSection from "./components/tab-comment-section";
import TabHeader from "./components/tab-header";
import BackgrounWithModal from "./edit/components/background-with-modal";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// next
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserTab } from "@/types/core";
import { Suspense } from "react";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

interface UserDashBoardProps {
  params: Promise<{ userId: string }>;
  searchParams: SearchParams;
}

const tabSet = new Set<UserTab>([
  "favorites",
  "comments",
  "elements",
  "activites",
]);

function isUserTab(value: string | null): value is UserTab {
  return tabSet.has(value as UserTab);
}

export async function generateMetadata({ params }: UserDashBoardProps) {
  const { userId } = await params;

  if (!userId) {
    return {
      title: "사용자 페이지",
      description: "사용자 정보를 불러올 수 없습니다.",
    };
  }

  const { data: userdata, error } = await getUserdata({ userId });

  if (error || !userdata) {
    return {
      title: "사용자 페이지",
      description: "사용자 정보를 불러올 수 없습니다.",
    };
  }

  return {
    title: `${userdata.nickname}님의 프로필`,
    description: `${userdata.nickname}님의 Lesser UI 프로필 페이지입니다.`,
  };
}

export default async function UserDashBoard({
  params,
  searchParams,
}: UserDashBoardProps) {
  const [currentUserId, { userId }, { tab }] = await Promise.all([
    checkUserLogin(),
    params,
    searchParams,
  ]);

  const rawTab = getValidSearchParam(tab);
  const selectedTab: UserTab = isUserTab(rawTab) ? rawTab : "favorites";
  const isOwner = currentUserId === userId;

  if (!userId) return notFound();

  const { data: userdata, error } = await getUserdata({ userId });

  if (error || !userdata) return notFound();

  return (
    <div className="space-y-5 p-5">
      {/* background */}
      <BackgrounWithModal background={userdata.background} />
      {/* avatar */}
      <div className="size-36 rounded-full relative overflow-hidden -mt-12">
        <Image
          src={userdata.avatar || ""}
          alt={userdata.nickname}
          fill
          className="object-cover bg-neutral-200"
          sizes="144px"
          priority
          draggable={false}
          unoptimized
        />
      </div>
      {/* name */}
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-semibold">{userdata.nickname}</p>
        </div>
        {isOwner && (
          <div className="flex items-center gap-1">
            <EditProfileLinkButton userId={userdata.id} />
            <LogoutButton />
          </div>
        )}
      </section>
      {/* tabs */}
      <div className="mt-15">
        <TabHeader selectedTab={selectedTab} userId={userdata.id} />
        <TabSection deps={selectedTab}>
          {selectedTab === "favorites" && (
            <Suspense fallback={<TabLoading />}>
              <TabFavoritesSection userId={userId} />
            </Suspense>
          )}
          {selectedTab === "elements" && (
            <Suspense fallback={<TabLoading />}>
              <TabElementsSection userId={userId} />
            </Suspense>
          )}
          {selectedTab === "comments" && (
            <Suspense fallback={<TabLoading />}>
              <TabCommentSection userId={userId} nickname={userdata.nickname} />
            </Suspense>
          )}
          {selectedTab === "activites" && (
            <p className="text-neutral-400 text-sm">준비 중...</p>
          )}
        </TabSection>
      </div>
    </div>
  );
}

function EditProfileLinkButton({ userId }: { userId: string }) {
  return (
    <Link
      href={`/user/${userId}/edit`}
      className="px-3 py-2 rounded font-semibold cursor-pointer flex gap-1 items-center
      transition-colors bg-neutral-800 hover:bg-neutral-700 text-sm"
    >
      <FontAwesomeIcon icon={faPenToSquare} /> 프로필 수정
    </Link>
  );
}

function TabLoading() {
  return <p className="text-sm text-neutral-400">로딩 중...</p>;
}
