"use client";

import { createClient } from "@/lib/supabase/client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
 * - 세션이 성공적으로 생성되면 /dashboard 로 이동
 * - 실패하면 다시 /login 으로 이동
 *
 * ✅ 이유:
 * - 서버 컴포넌트에서는 window나 localStorage에 접근할 수 없으므로
 *   세션 생성은 반드시 브라우저(Client) 환경에서 실행되어야 한다.
 * - 따라서 이 컴포넌트는 반드시 `"use client"` 이어야 하며,
 *   Supabase 브라우저 클라이언트를 사용해야 한다.
 *
 * ✅ 부가 기능:
 * - 이 페이지에서 DB에 사용자 정보를 upsert하는 API 호출을 추가할 수도 있다.
 * - 최초 로그인 시 사용자 정보를 저장하는 트리거로도 활용 가능.
 *
 * ✅ UX:
 * - 유저 입장에선 깜빡이는 "로그인 처리 중..." 화면이 보이고,
 *   백그라운드에서 로그인 처리가 완료되면 자동으로 이동한다.
 * ───────────────────────────────────────────────────────────────────
 */
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
