import { createClient } from "@/lib/supabase/server";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <button
        className="px-3 py-2 rounded font-semibold cursor-pointer 
        flex gap-1 items-center
        transition-colors bg-neutral-800 hover:bg-neutral-700"
      >
        <FontAwesomeIcon icon={faPowerOff} /> Logout
      </button>
    </form>
  );
}
