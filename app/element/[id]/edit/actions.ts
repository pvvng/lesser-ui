"use server";

import { createClient } from "@/lib/supabase/server";
import getNullableValue from "@/lib/utils/get-nullable-value";
import { elementSchema } from "@/lib/zod-schema/element";
import { redirect } from "next/navigation";

export async function editElementAction(_: unknown, formData: FormData) {
  const data = {
    name: formData.get("name"),
    bio: formData.get("bio"),
    tag: formData.get("tag"),
    html: formData.get("html"),
    css: formData.get("css"),
  };
  const elementId = getNullableValue(formData.get("elementId"));

  if (!elementId || typeof elementId !== "string" || !elementId.trim()) {
    return {
      formErrors: ["유효하지 않은 요소 ID입니다."],
      fieldErrors: {},
    };
  }

  const result = elementSchema.safeParse(data);

  if (!result.success) return result.error.flatten();

  const { name, bio, tag, html, css } = result.data;
  const supabase = await createClient();
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (!user || getUserError)
    return {
      formErrors: ["로그인 정보가 유효하지 않습니다."],
      fieldErrors: {},
    };

  const { data: userRecord, error: userCheckError } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!userRecord || userCheckError) {
    return {
      formErrors: ["존재하지 않는 사용자입니다."],
      fieldErrors: {},
    };
  }

  const { data: element, error: insertError } = await supabase
    .from("elements")
    .update({
      name,
      bio,
      tag,
      user_id: user.id,
      type: "normal",
      html,
      css,
    })
    .eq("id", elementId)
    .select("id")
    .maybeSingle();

  if (insertError || !element) {
    return {
      formErrors: ["요소 생성 중 오류가 발생했습니다. 다시 시도해 주세요."],
      fieldErrors: {},
    };
  }

  return redirect(`/element/${elementId}?celebration=true`);
}
