export default function getNullableValue<T>(
  value: T | null | undefined
): T | null {
  return value || null;
}
