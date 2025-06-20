import UserCommentSection from "./comment-section";
import { getUserCommentsWithElements } from "@/lib/supabase/actions/comments/get-user-comments-with-elements";

export default async function TabCommentSection({
  userId,
  nickname,
}: {
  userId: string;
  nickname: string;
}) {
  const { data: comments } = await getUserCommentsWithElements({
    userId,
  });

  return <UserCommentSection comments={comments} nickname={nickname} />;
}
