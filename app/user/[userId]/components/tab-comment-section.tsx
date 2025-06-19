import { createClient } from "@/lib/supabase/server";
import UserCommentSection from "./comment-section";

export default async function TabCommentSection({
  userId,
  nickname,
}: {
  userId: string;
  nickname: string;
}) {
  const supabase = await createClient();
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*, element:elements(*)")
    .eq("user_id", userId);

  if (!comments || error) {
    return null;
  }

  return <UserCommentSection comments={comments} nickname={nickname} />;
}
