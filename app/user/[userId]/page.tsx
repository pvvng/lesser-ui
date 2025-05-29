// supabase lib func
import { findUserById } from "@/lib/supabase/action/find-user-by-id";
// component
import LogoutButton from "@/components/auth/logout-button";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// next
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
    <div>
      {/* background */}
      <section className="w-full h-64 bg-neutral-800"></section>
      {/* header section */}
      <section className="flex justify-between items-end p-5">
        <div className="size-30 rounded-full relative overflow-hidden">
          <Image
            src={userdata.avatar || ""}
            alt={userdata.nickname}
            fill
            className="object-cover bg-neutral-700"
            sizes="100vw"
            priority
          />
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="#"
            className="px-3 py-2 rounded font-semibold cursor-pointer 
            flex gap-1 items-center
            transition-colors bg-neutral-800 hover:bg-neutral-700"
          >
            <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
          </Link>
          <LogoutButton />
        </div>
      </section>
      {/* name */}
      <section className="px-5">
        <div className="flex items-center gap-2">
          <p className="text-[2rem] font-semibold">{userdata.nickname}</p>
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
      {/* tabs */}
      <section className="p-5">
        <ul className="flex items-center gap-1">
          <li className="px-3 py-2 rounded bg-neutral-700 cursor-pointer text-lg font-semibold">
            posts
          </li>
          <li className="px-3 py-2 rounded bg-neutral-700">activites</li>
        </ul>
      </section>
    </div>
  );
}
