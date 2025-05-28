"use client";

import { createClient } from "@/lib/supabase/client";
import { upsertUser } from "./action";
import getUsername from "@/lib/utils/get-username";
import getNullableValue from "@/lib/utils/get-nullable-value";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
 * - 세션이 성공적으로 생성되면 /user/[userId] 로 이동 및 신규 유저 정보 저장
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
  const [isAuthEnd, setIsAuthEnd] = useState(false);

  useEffect(() => {
    const run = async () => {
      // 로그인 종료 플래그
      setIsAuthEnd(false);
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      // 유저 확인 실패
      if (!user || error) {
        alert(
          "유저 정보를 확인하는 중 에러가 발생했습니다. 다시 시도해주세요."
        );
        return router.replace("/");
      }

      // user destructuring
      const {
        id,
        email,
        app_metadata: { provider },
        user_metadata: { avatar_url, user_name, full_name, name },
      } = user;

      const username = getUsername([user_name, full_name, name]);

      // userdata upsert
      const upsertResponse = await upsertUser({
        id,
        email: getNullableValue(email),
        nickname: username,
        avatar: avatar_url,
        provider: getNullableValue(provider),
      });

      // 에러처리
      if (upsertResponse.error || !upsertResponse.data) {
        alert("로그인 중 에러가 발생했습니다. 다시 시도해주세요.");
        return router.replace("/");
      }

      setIsAuthEnd(true);
      // UX를 위해 0.5초 대기 후 redirect
      const userId = upsertResponse.data.id;
      setTimeout(() => router.replace(`/user/${userId}`), 500);
    };

    run();

    return () => setIsAuthEnd(false);
  }, [router]);

  return (
    <p className="mt-20 mx-auto font-mono font-semibold text-sm text-center">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />{" "}
      <span>{isAuthEnd ? "로그인 성공" : "로그인 처리 중..."}</span>
    </p>
  );
}
