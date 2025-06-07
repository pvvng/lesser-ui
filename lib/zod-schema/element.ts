import { z } from "zod";
import { tagSet } from "../constants";
import { isDangerousPattern } from "../utils/is-dangerous-pattern";
import { notOnlyWhitespace } from "../utils/not-only-white-space";

// 태그가 유효한지 확인
const checkAvailableTag = (tag: string) => tagSet.has(tag);

export const elementSchema = z
  .object({
    name: z
      .string()
      .min(2, "이름은 최소 2자 이상이어야 합니다.")
      .max(20, "이름은 최대 20자까지 입력할 수 있습니다.")
      .refine(notOnlyWhitespace, "이름은 공백만으로 구성될 수 없습니다.")
      .refine(
        isDangerousPattern,
        "이름에 허용되지 않은 위험한 문자가 포함되어 있습니다."
      ),
    bio: z
      .string()
      .min(2, "소개는 최소 2자 이상이어야 합니다.")
      .max(60, "소개는 최대 60자까지 입력할 수 있습니다.")
      .refine(notOnlyWhitespace, "소개는 공백만으로 구성될 수 없습니다.")
      .refine(
        isDangerousPattern,
        "소개에 허용되지 않은 위험한 문자가 포함되어 있습니다."
      ),
    tag: z
      .string()
      .refine(checkAvailableTag, "선택한 태그는 사용할 수 없습니다."),
    html: z.string(),
    css: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!notOnlyWhitespace(data.html)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "HTML 코드는 비워둘 수 없습니다.",
        path: [],
      });
    }

    if (!notOnlyWhitespace(data.css)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CSS 코드는 비워둘 수 없습니다.",
        path: [],
      });
    }
  });
