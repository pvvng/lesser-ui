import { Database } from "./supabase";

export type LanguageMode = "HTML" | "CSS" | "TAILWIND";

export type Users = Database["public"]["Tables"]["users"]["Row"];

type SimpleUser = Pick<Users, "id" | "nickname" | "avatar">;

export type CommentWithUser = Pick<
  Database["public"]["Tables"]["comments"]["Row"],
  "id" | "payload" | "created_at" | "user_id"
> & {
  users: SimpleUser | null;
};

type Favorite = Pick<
  Database["public"]["Tables"]["favorites"]["Row"],
  "user_id" | "element_id"
>;

export type Element = Database["public"]["Tables"]["elements"]["Row"];

export type ElementDetail = Element & {
  users: SimpleUser | null;
  favorites: Favorite[];
  comments: CommentWithUser[];
};

export type UserElement = Pick<
  Element,
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

export type Comment = Database["public"]["Tables"]["comments"]["Row"];

export type UserComment = Comment & {
  element: Element;
};

export type UserDetail = Pick<
  Users,
  "id" | "nickname" | "avatar" | "provider" | "email"
> & {
  elements: UserElement[];
  favorites: UserElement[];
  comments: UserComment[];
};

export type UserTab = "favorites" | "comments" | "elements" | "activites";
