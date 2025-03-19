/**
 * dom相关方法
 *
 * @author tangjiahui
 * @date 2025/3/19
 */

/**
 * 获取dom的dataSet值
 * @param dom
 * @param propName
 * @param findParent
 */
export function getHTMLElementDataSet(
  dom: HTMLElement,
  propName: string,
  findParent?: boolean,
): any {
  let id: any = dom?.dataset?.[propName];
  if (!findParent) {
    return id;
  }
  while ((id === undefined || id === null) && dom) {
    dom = dom.parentElement as any;
    id = dom?.dataset?.[propName];
  }
  return id;
}
