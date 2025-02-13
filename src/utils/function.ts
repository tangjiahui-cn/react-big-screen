/**
 * function
 *
 * @author tangjiahui
 * @date 2025/2/13
 */

/**
 * 从字符串文本中获取函数文本
 * @param code 包含函数的字符串文本
 * @description 字符串文本中只能有一个函数
 */
export function getFunction<T extends Function>(code: string): T | undefined {
  let fn: T | undefined;
  // 去除注释、两端空格
  const functionText: string = code?.replace?.(/(\/\*[\s\S]*?\*\/)|((?<!:)\/\/.*)/g, "")?.trim?.();
  try {
    fn = new Function(`return ${functionText}`)();
  } catch (error) {
    console.error("[bigScreen](getFunction)：", error);
  }
  return fn;
}
