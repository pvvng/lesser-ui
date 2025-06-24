import AuthShowcaseCard from "@/components/auth/auth-showcase-card";
import { checkUserLogin } from "@/lib/supabase/actions/users";
import { redirect } from "next/navigation";

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
