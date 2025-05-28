"use server";

import { createClient } from "@/lib/supabase/server";
import createActionResponse from "@/lib/utils/create-action-response";
import getNullableValue from "@/lib/utils/get-nullable-value";

export async function getUserData() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return createActionResponse(
      null,
      "로그인 정보를 찾을 수 없습니다. 다시 시도해주세요."
    );
  }

  // 이미 존재하는 유저인지 확인
  const { data: existingUser, error: findError } = await findUserById({
    userId: user.id,
  });

  if (findError) {
    console.error("Find User Error:", findError);
    return createActionResponse(
      null,
      "유저 정보를 찾는 중 오류가 발생했습니다."
    );
  }

  if (existingUser) {
    return createActionResponse(existingUser, null);
  }

  const {
    id,
    email,
    app_metadata: { provider },
    user_metadata: { avatar_url, user_name, full_name, name },
  } = user;

  const nickname: string =
    getNullableValue(user_name) ??
    getNullableValue(full_name) ??
    getNullableValue(name) ??
    `lesser ${Date.now()}`; // 이름이 없으면 임시 닉네임 생성

  // 유저 정보가 없으면 새로 생성
  const { data: insertedUser, error: insertError } = await insertUser({
    userId: id,
    email: getNullableValue(email),
    nickname,
    avatar: getNullableValue(avatar_url),
    provider: getNullableValue(provider),
  });

  if (!insertedUser || insertError) {
    return createActionResponse(null, "유저 정보를 저장하는데 실패했습니다.");
  }

  return createActionResponse(insertedUser, null);
}

export async function findUserById({ userId }: { userId: string }) {
  const supabase = await createClient();
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Find User Error:", error);
    return createActionResponse(
      null,
      "유저 정보를 찾는 중 오류가 발생했습니다."
    );
  }

  return createActionResponse(user, null);
}

interface InsertUserParams {
  userId: string;
  email: string | null;
  nickname: string;
  avatar: string | null;
  provider: string | null;
}

export async function insertUser(insertValue: InsertUserParams) {
  const supabase = await createClient();

  const { data: insertedUser, error: insertError } = await supabase
    .from("users")
    .insert([{ ...insertValue }])
    .select("*")
    .maybeSingle();

  if (insertError) {
    console.error("Insert Error:", insertError);
    return createActionResponse(
      null,
      "유저 정보를 저장하는 중 오류가 발생했습니다."
    );
  }

  return createActionResponse(insertedUser, null);
}
