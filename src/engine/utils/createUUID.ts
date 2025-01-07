/**
 * 创建uuid
 *
 * @param len 长度
 * @return 随机 uuid。
 */
export function createUUID(len: number = 10): string {
  const baseString: string = Math.random().toString(16).slice(2);
  if (len <= baseString.length) {
    return baseString.slice(0, len);
  }
  return baseString + createUUID(len - baseString.length);
}
