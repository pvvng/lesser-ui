# Lesser-UI

### ex

##### how to set supabase oauth login using server-side render

[docs](https://supabase.com/docs/guides/auth/server-side/nextjs)

1. need enviroments

```env
NEXT_PUBLIC_SUPABASE_URL = ...
NEXT_PUBLIC_SUPABASE_ANON_KEY = ...
NEXT_SUPABASE_SERVICE_ROLE = ...
NEXT_SUPABASE_DB_PASSWORD = ...
```

2. supabase-client

```tsx
// @/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```tsx
// @/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 컴포넌트에서는 쿠키 못 만지니까 그냥 무시해도 됨
          }
        },
      },
    }
  );
}
```

3. middleware

```tsx
// @/lib/supabase/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          // 새로운 응답 객체 만들 때는 request 포함해야 함
          supabaseResponse = NextResponse.next({ request });
          // 쿠키를 복사해서 동기화 유지
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 👇 이 사이에 코드를 넣지 말 것
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    // 미허가 페이지 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 쿠키 포함된 응답 그대로 반환 (중간에 새로 만들었으면 복사 필수)
  return supabaseResponse;
}
```

```tsx
// @/middleware.ts
import type { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(req: NextRequest) {
  return await updateSession(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

4. call client

##### supabase oauth는 client에서만 동작하는 듯 하다.

- browser client 호출 후 로그인 -> auth/callback으로 리디렉트 시켜서 세션 확인 -> 다시 필요한 페이지로 리디렉트
