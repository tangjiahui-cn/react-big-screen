/**
 * format
 *
 * @author tangjiahui
 * @date 2025/2/13
 */

// 确保返回对象
export function ensureObject(value: any): Record<string, any> {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

// 判断是否是一个对象（例如: {} 则返回true）
export function isObject(value: any): boolean {
  return typeof value === "object" && !Array.isArray(value) && !!value;
}
