import checkUserLogin from "@/lib/supabase/action/check-user-login";
import Image from "next/image";
import { getUserdata } from "./actions";
import { notFound, unauthorized } from "next/navigation";
import InputWithLabel from "@/components/form/input-with-label";
import FormButton from "@/components/form/form-button";

interface UserDashBoardProps {
  params: Promise<{ userId: string }>;
}

export default async function EditUserDetailPage({
  params,
}: UserDashBoardProps) {
  const [currentUserId, { userId }] = await Promise.all([
    checkUserLogin(),
    params,
  ]);

  const isOwner = currentUserId === userId;

  if (!isOwner) return unauthorized();

  const { data: userdata, error } = await getUserdata({ userId });

  if (error || !userdata) return notFound();

  return (
    <div className="space-y-5 p-5">
      {/* background */}
      <section className="w-full h-72 bg-neutral-800"></section>
      {/* avatar */}
      <div className="shrink-0 size-42 rounded-full relative overflow-hidden -mt-21 ring-2 mx-auto">
        <Image
          src={userdata.avatar || ""}
          alt={userdata.nickname}
          fill
          className="object-cover bg-neutral-700"
          sizes="144px"
          priority
          draggable={false}
        />
      </div>
      {/* name */}
      <form className="w-full mt-10 space-y-5 max-w-screen-md mx-auto">
        <div
          className="grid grid-cols-3 items-center h-10 rounded overflow-hidden 
          ring-0 has-[:focus]:ring-2 ring-neutral-500 transition-all"
        >
          <label
            className="h-full bg-neutral-600 font-semibold flex justify-center items-center text-sm px-3"
            htmlFor="nickname"
          >
            Nickname
          </label>
          <input
            id="nickname"
            className="h-full col-span-2 bg-neutral-700 px-3 
            focus:outline-none text-sm placeholder:text-sm"
            name="nickname"
            placeholder="Enter Your New Nickname"
            required
            defaultValue={userdata.nickname}
          />
        </div>
        <div className="mt-5">
          <FormButton text="Edit" />
        </div>
      </form>
    </div>
  );
}
