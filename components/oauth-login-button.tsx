"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginButtons() {
  const handleLogin = async (provider: "github" | "google") => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) console.error("로그인 에러:", error.message);
  };

  return (
    <div>
      <button
        onClick={() => handleLogin("github")}
        className="px-4 py-2 bg-black text-white rounded"
      >
        GitHub 로그인
      </button>
    </div>
  );
}
