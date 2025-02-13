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
