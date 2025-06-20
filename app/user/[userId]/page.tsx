// supabase lib func
import { checkUserLogin, getUserdata } from "@/lib/supabase/actions/users";
// component
import LogoutButton from "@/components/auth/logout-button";
import TabSection from "@/app/user/[userId]/components/tab-wrapper";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// next
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import TabHeader from "@/app/user/[userId]/components/tab-header";
import { UserTab } from "@/types/core";
import { getValidSearchParam } from "@/lib/utils/get-valid-search-params";
import { Suspense } from "react";
import TabFavoritesSection from "./components/tab-favorites-section";
import TabElementsSection from "./components/tab-elements-section";
import TabCommentSection from "./components/tab-comment-section";

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
      <section className="w-full h-72 bg-neutral-800"></section>
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
          <p className="text-3xl font-semibold">{userdata.nickname}</p>
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
      transition-colors bg-neutral-800 hover:bg-neutral-700"
    >
      <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
    </Link>
  );
}

function TabLoading() {
  return <p className="text-sm text-neutral-400">로딩 중...</p>;
}
