import getNullableValue from "./get-nullable-value";

/** 사용자 이름을 반환하거나 lesser-Date 를 반환하는 함수 */
export default function getUsername(
  nameCandidates: (string | undefined | null)[]
): string {
  const username = nameCandidates.map(getNullableValue).find((val) => !!val);

  return username ?? `lesser ${Date.now()}`;
}
