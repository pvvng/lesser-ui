import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const logout = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();

    return redirect("/");
  };

  return (
    <form action={logout}>
      <button>로그아웃</button>
    </form>
  );
}
