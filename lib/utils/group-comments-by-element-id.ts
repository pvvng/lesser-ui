import { UserComment, UserElement } from "@/types/core";

/** comment를 element id를 중심으로 그룹화하는 함수 */
export function groupCommentsByElementId(comments: UserComment[]) {
  const elements: Record<string, UserElement> = {};
  const groupedComments: Record<string, Omit<UserComment, "element">[]> = {};

  for (const comment of comments) {
    const { element, ...rest } = comment;
    const { element_id } = comment;

    // element 저장 (중복 체크)
    if (!elements[element_id]) {
      elements[element_id] = element;
    }

    // 댓글 그룹화
    if (!groupedComments[element_id]) {
      groupedComments[element_id] = [];
    }

    groupedComments[element_id].push(rest);
  }

  return { elements, groupedComments };
}
