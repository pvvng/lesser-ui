export function getValidSearchParam(param: unknown): string | null {
  if (typeof param !== "string") return null;
  const trimmed = param.trim();

  return trimmed.length > 0 ? trimmed : null;
}
