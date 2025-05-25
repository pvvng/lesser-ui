"use client";

import { createClient } from "@/lib/supabase/client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        // 여기서 DB에 유저 저장도 가능
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    };

    run();
  }, []);

  return (
    <p className="mt-20 mx-auto font-mono font-semibold text-sm text-center">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> 로그인 처리
      중...
    </p>
  );
}
