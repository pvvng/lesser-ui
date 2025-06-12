import { Database } from "./supabase";

export type LanguageMode = "HTML" | "CSS" | "TAILWIND";

type SimpleUser = Pick<
  Database["public"]["Tables"]["users"]["Row"],
  "id" | "nickname" | "avatar"
>;

export type Users = Database["public"]["Tables"]["users"]["Row"];

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

export type UserElement = Pick<
  Database["public"]["Tables"]["elements"]["Row"],
  | "id"
  | "name"
  | "bio"
  | "view"
  | "marked"
  | "type"
  | "tag"
  | "created_at"
  | "html"
  | "css"
>;

export type UserComment = Pick<
  Database["public"]["Tables"]["comments"]["Row"],
  "id" | "payload" | "element_id" | "created_at"
> & {
  element: UserElement;
};

export type UserDetail = Pick<
  Database["public"]["Tables"]["users"]["Row"],
  "id" | "nickname" | "avatar" | "provider" | "email"
> & {
  elements: UserElement[];
  favorites: UserElement[];
  comments: UserComment[];
};
