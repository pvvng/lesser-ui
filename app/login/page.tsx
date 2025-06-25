import AuthShowcaseCard from "@/components/auth/auth-showcase-card";
import { checkUserLogin } from "@/lib/supabase/actions/users";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "로그인",
  description:
    "깃허브, 구글 소셜로그인으로 손쉽게 Lesser UI 커뮤니티에 참여하세요.",
};

export default async function Login() {
  const userId = await checkUserLogin();

  if (userId) {
    return redirect("/");
  }

  return (
    <div className="p-5 py-15">
      <div className="max-w-screen-sm mx-auto">
        <AuthShowcaseCard />
      </div>
    </div>
  );
}
