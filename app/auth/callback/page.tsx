"use client";

// actions
import { findOrCreateUser, getSupabaseUser } from "./actions";
// utils
// components
import LoadingSpinner from "@/components/loading-spinner";
// etc
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * ───────────────────────────────────────────────────────────────────
 *
 * **🔐 AuthCallback 페이지**
 *
 * ✅ 역할:
 * - Supabase OAuth 로그인 후 사용자가 redirectTo한 경로로 되돌아올 때,
 *   Supabase는 URL에 ?code=... 쿼리를 붙여 돌아온다.
 * - 이 페이지는 그 쿼리를 Supabase 브라우저 클라이언트가 감지하고,
 *   내부적으로 exchangeCodeForSession() 을 실행해 세션을 생성한다.
 *
 * ✅ 동작:
 * - supabase.auth.getUser() 를 호출하면 세션이 자동으로 생성되고
 *   localStorage와 쿠키에 인증 정보가 저장된다.
 * - 세션이 성공적으로 생성되면 /user/[userId] 로 이동 & 기존 사용자가 아닐 경우엔 회원정보 저장
 * - 실패하면 다시 /login 으로 이동
 *
 * ✅ 이유:
 * - 서버 컴포넌트에서는 window나 localStorage에 접근할 수 없으므로
 *   세션 생성은 반드시 브라우저(Client) 환경에서 실행되어야 한다.
 * - 따라서 이 컴포넌트는 반드시 `"use client"` 이어야 하며,
 *   Supabase 브라우저 클라이언트를 사용해야 한다.
 *
 * ✅ UX:
 * - 유저 입장에선 깜빡이는 "로그인 처리 중..." 화면이 보이고,
 *   백그라운드에서 로그인 처리가 완료되면 자동으로 이동한다.
 * ───────────────────────────────────────────────────────────────────
 */
export default function AuthCallback() {
  const router = useRouter();
  const [isAuthDone, setIsAuthDone] = useState(false);

  useEffect(() => {
    const run = async () => {
      setIsAuthDone(false);

      const user = await getSupabaseUser();
      if (!user) return router.replace("/");

      const existingUser = await findOrCreateUser(user);
      if (!existingUser) return router.replace("/");

      setIsAuthDone(true);
      router.refresh(); // 로그인 상태 변경을 위한 리프레시
      setTimeout(() => router.replace(`/user/${existingUser.id}`), 500); // 리다이렉트
    };

    run();
    return () => setIsAuthDone(false);
  }, [router]);

  return (
    <LoadingSpinner
      text="로그인 처리 중..."
      loadingDone={isAuthDone}
      loadingDoneText="로그인 성공"
    />
  );
}
