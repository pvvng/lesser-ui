import { z } from "zod";
import { notOnlyWhitespace } from "../utils/not-only-white-space";
import { isDangerousPattern } from "../utils/is-dangerous-pattern";
import { bgSet } from "../constants";

export const editUserdataSchema = z.object({
  userId: z.string(),
  avatar: z.string(),
  background: z
    .string()
    .refine((val) => bgSet.has(val), "존재하지 않는 배경입니다."),
  nickname: z
    .string()
    .min(2, "사용자 이름은 최소 2자 이상이어야 합니다.")
    .max(20, "사용자 이름은 최대 20자까지 입력할 수 있습니다.")
    .trim()
    .refine(notOnlyWhitespace, "사용자 이름은 공백만으로 구성될 수 없습니다.")
    .refine(
      isDangerousPattern,
      "사용자 이름에 허용되지 않은 위험한 문자가 포함되어 있습니다."
    ),
});
