import LogoutButton from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const userResponse = await supabase.auth.getUser();

  console.log(userResponse);

  return (
    <div>
      어서 오세요
      <LogoutButton />
    </div>
  );
}
