import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { findUserById } from "./action";
import Image from "next/image";

interface UserDashBoardProps {
  params: Promise<{ userId: string }>;
}

export default async function UserDashBoard({ params }: UserDashBoardProps) {
  const userId = (await params).userId;

  if (!userId) return notFound();

  const response = await findUserById({ userId });

  if (response.error || !response.data) return notFound();

  const userdata = response.data;

  return (
    <div className="space-y-3">
      {/* background */}
      <section className="w-full h-64 bg-neutral-800"></section>
      {/* header section */}
      <section className="flex justify-between items-end px-5">
        <div className="size-30 rounded-full relative overflow-hidden -translate-y-10">
          <Image
            src={userdata.avatar || ""}
            alt={userdata.nickname}
            fill
            className="object-cover bg-neutral-700"
            sizes="100vw"
            priority
          />
        </div>
        <button className="px-3 py-2 rounded bg-neutral-800 font-semibold cursor-pointer">
          Edit Profile
        </button>
      </section>
      <section className="px-5 border-t border-t-neutral-500">
        <div className="flex items-center gap-2">
          <p className="text-[2rem] font-extrabold">{userdata.nickname}</p>
          {userdata.provider && (
            <Image
              src={`/${userdata.provider}.svg`}
              alt={userdata.provider}
              width={25}
              height={25}
            />
          )}
        </div>
      </section>
    </div>
  );
}
