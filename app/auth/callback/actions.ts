// supabase
import { createClient } from "@/lib/supabase/client";
import { findUserById, upsertUser } from "@/lib/supabase/actions/users";
// utils
import getNullableValue from "@/lib/utils/get-nullable-value";
import getUsername from "@/lib/utils/get-username";

/** supabase user 정보 확인 */
export async function getSupabaseUser() {
  const supabase = createClient();

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
export async function findOrCreateUser(
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
