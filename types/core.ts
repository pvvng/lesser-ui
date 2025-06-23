import { typeToFlattenedError } from "zod";
import { Database } from "./supabase";

//////////////////////
// custom
//////////////////////
export type LanguageMode = "HTML" | "CSS" | "TAILWIND";
export type UserTab = "favorites" | "comments" | "elements" | "activites";

//////////////////////
// supabase DB
//////////////////////
export type Users = Database["public"]["Tables"]["users"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Element = Database["public"]["Tables"]["elements"]["Row"];
export type Favorites = Database["public"]["Tables"]["favorites"]["Row"];

//////////////////////
// picked DB types
//////////////////////
type SimpleUser = Pick<Users, "id" | "nickname" | "avatar">;
type SimpleFavorites = Pick<Favorites, "user_id" | "element_id">;

//////////////////////
// join DB types
//////////////////////
export type CommentWithUser = Comment & {
  users: SimpleUser | null;
};

export type CommentWithElement = Comment & {
  element: Element;
};

export type ElementDetail = Element & {
  users: SimpleUser | null;
  favorites: SimpleFavorites[];
};

export type UserDetail = Users & {
  elements: Element[];
  favorites: Element[];
  comments: CommentWithElement[];
};

//////////////////////
// element workspace action
//////////////////////

export type WorkspaceActionResult = typeToFlattenedError<
  {
    html: string;
    name: string;
    bio: string;
    tag: string;
    css: string;
  },
  string
>;

//////////////////////
// elements sort options
//////////////////////
export type SortOptions = "Recent" | "Oldest" | "View" | "Marked";
