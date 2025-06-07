// 위험한 문자 패턴 (XSS, SQL 인젝션 등)
const dangerousPattern = /[<>="'`;(){}$]/g;
export const isDangerousPattern = (value: string) =>
  !dangerousPattern.test(value);
