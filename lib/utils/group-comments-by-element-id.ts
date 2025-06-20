import { Comment, CommentWithElement, Element } from "@/types/core";

/** comment를 element id를 중심으로 그룹화하는 함수 */
export function groupCommentsByElementId(comments: CommentWithElement[]) {
  const elementIdSet = new Set<string>();
  const elements: Element[] = [];
  const groupedComments: Record<string, Comment[]> = {};

  for (const comment of comments) {
    const { element, ...rest } = comment;
    const { element_id } = comment;

    // element 저장 (중복 체크)
    if (!elementIdSet.has(element_id)) {
      elements.push(element);
      elementIdSet.add(element_id);
    }

    // 댓글 그룹화
    if (!groupedComments[element_id]) {
      groupedComments[element_id] = [];
    }

    groupedComments[element_id].push(rest);
  }

  return { elements, groupedComments };
}
