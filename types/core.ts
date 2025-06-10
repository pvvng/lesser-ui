import { Database } from "./supabase";

export type LanguageMode = "HTML" | "CSS" | "TAILWIND";

type SimpleUser = Pick<
  Database["public"]["Tables"]["users"]["Row"],
  "id" | "nickname" | "avatar"
>;

export type Comment = Pick<
  Database["public"]["Tables"]["comments"]["Row"],
  "id" | "payload" | "created_at" | "user_id"
> & {
  users: SimpleUser | null;
};

type Favorite = Pick<
  Database["public"]["Tables"]["favorites"]["Row"],
  "user_id" | "element_id"
>;

export type ElementDetail = Database["public"]["Tables"]["elements"]["Row"] & {
  users: SimpleUser | null;
  favorites: Favorite[];
  comments: Comment[];
};

export type Element = Database["public"]["Tables"]["elements"]["Row"];
