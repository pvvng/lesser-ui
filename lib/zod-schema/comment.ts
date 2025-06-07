import { z } from "zod";
import { notOnlyWhitespace } from "../utils/not-only-white-space";
import { isDangerousPattern } from "../utils/is-dangerous-pattern";
import { createClient } from "../supabase/server";

export const commentSchema = z
  .object({
    payload: z
      .string()
      .min(1, "댓글은 최소 1자 이상이어야 합니다.")
      .max(50, "댓글은 최대 50자까지 입력할 수 있습니다.")
      .refine(notOnlyWhitespace, "댓글은 공백만으로 구성될 수 없습니다.")
      .refine(
        isDangerousPattern,
        "댓글에 허용되지 않은 위험한 문자가 포함되어 있습니다."
      ),
    userId: z.string(),
    elementId: z.string(),
  })
  .superRefine(async (data, ctx) => {
    const supabase = await createClient();

    const [
      { data: user, error: userError },
      { data: element, error: elementError },
    ] = await Promise.all([
      supabase.from("users").select("id").eq("id", data.userId).single(),
      supabase.from("elements").select("id").eq("id", data.elementId).single(),
    ]);

    if (userError || !user) {
      ctx.addIssue({
        path: ["userId"],
        code: z.ZodIssueCode.custom,
        message: "존재하지 않는 사용자입니다.",
        fatal: true,
      });
    }

    if (elementError || !element) {
      ctx.addIssue({
        path: ["elementId"],
        code: z.ZodIssueCode.custom,
        message: "존재하지 않는 UI 요소입니다.",
        fatal: true,
      });
    }
  });
