export function getKoreanDate(date: string) {
  const [year, month, day] = date.split("T")[0].split("-");

  return `${year}년 ${month}월 ${day}일`;
}
