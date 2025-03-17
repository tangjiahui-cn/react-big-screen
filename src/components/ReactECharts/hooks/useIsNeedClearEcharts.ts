/**
 * 判断echarts是否需要clear
 *
 * @author tangjiahui
 * @date 2025/3/17
 * @description 仅当数据维度变更时，才会需要清空（不清空，则会只增加新维度，而不会减少）。
 */
import { useCallback, useRef } from "react";
import { EChartsOption } from "../echart";

// 计算维度token
function getCountToken(options?: EChartsOption): string {
  return (options?.dataset as any)?.dimensions?.join?.(",") || "";
}

export type IsNeedClearEchartsCallback = (options?: EChartsOption) => boolean;
export function useIsNeedClearEcharts(): IsNeedClearEchartsCallback {
  // 触发清空的token
  const tokenRef = useRef<string>();

  // 返回 isNeedClearEcharts 函数
  return useCallback((options?: EChartsOption) => {
    const lastToken = tokenRef.current;
    tokenRef.current = getCountToken(options);
    return lastToken !== tokenRef.current;
  }, []);
}
