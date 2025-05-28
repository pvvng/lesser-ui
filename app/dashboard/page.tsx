import LogoutButton from "@/components/auth/logout-button";
import { getUserData } from "./actions";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardPage() {
  const { data: userdata, error } = await getUserData();

  if (userdata === null) {
    return notFound();
  }

  if (error) {
    return (
      <div className="mt-15 text-center">
        <p className="text-2xl">Error!</p>
        <p>{error}</p>
      </div>
    );
  }

  console.log(userdata);

  return (
    <div className="text-white">
      <div className="w-full h-64 bg-green-500"></div>
      <div className="flex gap-2 items-end">
        <div className="size-36 rounded-full relative overflow-hidden">
          <Image
            src={userdata.avatar || ""}
            alt={userdata.nickname}
            fill
            className="object-cover bg-neutral-700"
            sizes="100vw"
            priority
          />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-2xl font-semibold">{userdata.nickname}</p>
        {userdata.provider && (
          <div className="size-6 relative overflow-hidden rounded">
            <Image
              src={`${userdata.provider}.svg`}
              alt={userdata.provider}
              fill
              sizes="24px"
              className="bg-neutral-200 rounded"
            />
          </div>
        )}
      </div>
      <LogoutButton />
    </div>
  );
}
