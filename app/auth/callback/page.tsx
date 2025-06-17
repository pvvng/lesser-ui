"use client";

// supabase lib func
import { createClient } from "@/lib/supabase/client";
import { findUserById, upsertUser } from "@/lib/supabase/actions/users";
// utils
import getUsername from "@/lib/utils/get-username";
import getNullableValue from "@/lib/utils/get-nullable-value";
// etc
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loading-spinner";

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
      const supabase = createClient();

      const user = await getSupabaseUser(supabase);
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

/** supabase user 정보 확인 */
async function getSupabaseUser(supabase: ReturnType<typeof createClient>) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    alert("유저 정보를 확인하는 중 에러가 발생했습니다. 다시 시도해주세요.");
    return null;
  }
  return user;
}

/** 이미 db에 저장된 유저인지 확인하고 없으면 create */
async function findOrCreateUser(
  user: Awaited<ReturnType<typeof getSupabaseUser>>
) {
  if (!user) {
    alert("유저 정보를 확인하지 못했습니다.");
    return null;
  }

  const { data: foundUser, error: findError } = await findUserById({
    userId: user.id,
  });

  if (findError) {
    alert(findError);
    return null;
  }

  if (foundUser && foundUser.id) {
    return { id: foundUser.id };
  }

  const {
    id,
    email,
    app_metadata: { provider },
    user_metadata: { avatar_url, user_name, full_name, name },
  } = user;

  const username = getUsername([user_name, full_name, name]);

  const { data, error } = await upsertUser({
    id,
    email: getNullableValue(email),
    nickname: username,
    avatar: avatar_url,
    provider: getNullableValue(provider),
  });

  if (error || !data) {
    alert("로그인 중 에러가 발생했습니다. 다시 시도해주세요.");
    return null;
  }

  return data;
}
