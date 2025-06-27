/**
 * 获取随机正数
 * @param min 最小值
 * @param max 最大值
 */
export function getRandomInt(min: number = 0, max: number = 100): number {
  const value = Math.round(Math.random() * (min - max) + max);
  return range(value, min, max);
}

/**
 * 获取范围内的数
 * @param n 待处理值
 * @param min 最小值
 * @param max 最大值
 */
export function range(n: number, min: number, max: number): number {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}
