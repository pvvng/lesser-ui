"use server";

import checkUserLogin from "@/lib/supabase/action/check-user-login";
import { createClient } from "@/lib/supabase/server";
import { editUserdataSchema } from "@/lib/zod-schema/edit-userdata";
import { Users } from "@/types/core";
import { redirect } from "next/navigation";

interface PromiseReturnType {
  data: Users | null;
  error: string | null;
}

export async function getUserdata({
  userId,
}: {
  userId: string;
}): Promise<PromiseReturnType> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error(error);
    return {
      data: null,
      error: "Failed to fetch user data",
    };
  }

  return {
    data,
    error: null,
  };
}

export async function editUserdata(_: unknown, formdata: FormData) {
  const data = {
    userId: formdata.get("userId"),
    avatar: formdata.get("avatar"),
    nickname: formdata.get("nickname"),
  };

  const result = editUserdataSchema.safeParse(data);

  if (!result.success) {
    const errors: string[] = [
      ...result.error.flatten().formErrors,
      ...Object.values(result.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean),
    ];
    return errors;
  }

  const currentUserId = await checkUserLogin();
  if (currentUserId !== result.data.userId) {
    return ["허가된 사용자가 아닙니다."];
  }

  const supabase = await createClient();

  // 닉네임 중복 체크
  const { data: existingUser, error: nicknameError } = await supabase
    .from("users")
    .select("id")
    .eq("nickname", result.data.nickname)
    .maybeSingle();

  if (nicknameError) {
    console.log(nicknameError);
    return ["닉네임을 확인하는 중 문제가 발생했습니다."];
  }

  if (existingUser && existingUser.id !== result.data.userId) {
    return ["이미 사용 중인 닉네임입니다."];
  }

  // 유저 데이터 업데이트
  const { error } = await supabase
    .from("users")
    .update({
      avatar: result.data.avatar,
      nickname: result.data.nickname,
    })
    .eq("id", result.data.userId)
    .select("*")
    .maybeSingle();

  if (error) {
    console.log(error);
    return ["유저 정보를 업데이트 하는 중 에러가 발생했습니다."];
  }

  return redirect(`/user/${result.data.userId}`);
}

/** cloudflare에서 1회용 upload url 받는 action */
export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    }
  );

  const data = await response.json();

  return data;
}
