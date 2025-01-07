/**
 * useComponentNodes
 *
 * @author tangjiahui
 * @date 2024/12/24
 * @description 获取所有的数据实例
 */
import { ComponentNodeType, useGlobalSelector } from "..";

export function useComponentNodes(): ComponentNodeType[] {
  return useGlobalSelector((state) => state.componentNodes);
}
