/** 요소 배열을 chunkSize 단위로 잘라 matrix로 반환하는 함수  */
export function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}
