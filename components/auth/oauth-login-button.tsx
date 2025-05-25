"use client";

import FloatingDotsGrid from "../floating-dot-grid";
import { createClient } from "@/lib/supabase/client";
import LinkLogo from "../link-logo";
import Image from "next/image";

export default function LoginButtons() {
  const handleLogin = async (provider: "github" | "google") => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // redirect url
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) console.error("로그인 에러:", error.message);
  };

  return (
    <div className="relative overflow-hidden max-w-screen-sm rounded-2xl shadow-xl">
      <FloatingDotsGrid />
      <div className="w-full p-10 *:z-1 bg-neutral-950 flex flex-col gap-8 items-center text-center">
        <LinkLogo size="3xl" />
        <div className="space-y-5">
          <p className="font-bold text-xl">Join The Community</p>
          <p className="text-lg">
            Create beautiful UI elements and share them with 100,000+ developers
          </p>
          <ul className="text-sm text-gray-400 space-y-2 mx-auto">
            <li>
              <span className="text-green-500">✓</span> Create and share
              unlimited UI elements
            </li>
            <li>
              <span className="text-green-500">✓</span> Get inspiration from
              thousands of designs
            </li>
            <li>
              <span className="text-green-500">✓</span> Join a thriving
              community of creators
            </li>
          </ul>
        </div>
        <div className="space-y-5">
          <button
            onClick={() => handleLogin("github")}
            className="px-4 py-2 bg-neutral-200 text-neutral-900 
            rounded cursor-pointer flex justify-center items-center gap-2"
          >
            <Image src="/github.svg" alt="github" width={25} height={25} />
            Continue With GitHub
          </button>
          <button
            onClick={() => handleLogin("google")}
            className="px-4 py-2 bg-neutral-200 text-neutral-900
            rounded cursor-pointer flex justify-center items-center gap-2"
          >
            <Image src="/google.svg" alt="google" width={25} height={25} />
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
}
