/** Promise action 함수의 반환 객체 래핑 함수 */
export default function createActionResponse<T>(
  data: T,
  error: string | null = null
) {
  return {
    data,
    error,
  };
}
