/** (한글) 받힘이 있는 글자인지 확인하는 함수 */
export function hasJongsung(char: string): boolean {
  const code = char.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false; // 한글이 아니면 false
  const jongsungIndex = (code - 0xac00) % 28;
  return jongsungIndex !== 0;
}
