export type LanguageMode = "HTML" | "CSS" | "TAILWIND";
export type Comment = {
  id: string;
  payload: string;
  created_at: string;
  user_id: string | null;
  users: {
    id: string;
    nickname: string;
    avatar: string | null;
  } | null;
};
