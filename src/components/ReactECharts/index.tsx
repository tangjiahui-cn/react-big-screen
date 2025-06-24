/**
 * ReactEcharts
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import React, { useEffect, useMemo, useRef } from "react";
import echarts, { EChartsOption, EChartsType } from "./echart";
import { useUpdateEffect } from "ahooks";
import { useResizeDom } from "@/hooks";
import { useIsNeedClearEcharts } from "./hooks/useIsNeedClearEcharts";

export type * from "./echart";

interface Props {
  /**
   * 配置项
   */
  options?: EChartsOption;
  /**
   * 判断是否需要清空上一次的绘制（优先级最高）
   * @param currentOptions 当前options
   * @param preOptions 之前的options
   * @return true 则强制刷新，false则强制不刷新，其他值：默认情况。
   */
  shouldClear?: boolean | ((currentOptions: EChartsOption, preOptions?: EChartsOption) => boolean);
  /**
   * css style
   */
  style?: React.CSSProperties;
}

export default function ReactECharts(props: Props) {
  const { options, shouldClear } = props;
  const chartInstance = useRef<EChartsType>();
  const domRef = useRef<HTMLDivElement>(null);
  const isNeedClearEcharts = useIsNeedClearEcharts();
  const lastOptionsRef = useRef<EChartsOption>();

  useEffect(() => {
    chartInstance.current = echarts.init(domRef.current) as any;
    // 初次设置options
    if (options) {
      chartInstance.current?.setOption?.(options);
      isNeedClearEcharts(options); // 初始调用刷新一次缓存
    }
    return () => {
      echarts.dispose(chartInstance.current as any);
    };
  }, []);

  // 重新设置 options
  useUpdateEffect(() => {
    // 是否强制清除上一次绘制
    const isForceClear =
      typeof shouldClear === "boolean"
        ? shouldClear // 值为bool时
        : shouldClear && options
        ? shouldClear?.(options, lastOptionsRef.current) // 值为函数时
        : undefined;

    // isForceClear为true强制清除
    if (isForceClear === true) {
      chartInstance?.current?.clear?.();
    } else if (isForceClear !== false && isNeedClearEcharts(options)) {
      // isForceClear 为其他值，则使用默认处理情况
      chartInstance?.current?.clear?.();
    }

    // 更新 options
    if (options) {
      chartInstance.current?.setOption?.(options);
    }
    lastOptionsRef.current = options;
  }, [options]);

  // 重新调整大小
  useResizeDom(domRef, () => {
    chartInstance.current?.resize?.();
  });

  return useMemo(() => <div style={props?.style} ref={domRef} />, [props?.style]);
}
