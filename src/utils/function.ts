/**
 * function
 *
 * @author tangjiahui
 * @date 2025/2/13
 */

/**
 * 从字符串文本中获取函数
 * @param code 包含函数的字符串文本 （文本中只能包含一个函数）
 * @return Function | undefined
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

/**
 * 从字符串文本中获取 main函数
 * @param code 包含函数的字符串文本
 * @return Function | undefined
 */
export function getMainFunction<T extends Function>(code: string): T | undefined {
  let fn: T | undefined;
  try {
    fn = new Function(`${code} return main;`)();
  } catch (error) {
    console.error("[bigScreen](getMainFunction)：", error);
  }
  return fn;
}
