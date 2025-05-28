import getNullableValue from "./get-nullable-value";

export default function getUsername(
  nameCandidates: (string | undefined | null)[]
): string {
  const username = nameCandidates.map(getNullableValue).find((val) => !!val);

  return username ?? `lesser ${Date.now()}`;
}
