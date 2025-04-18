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

interface Props {
  clearBeforeUpdate?: boolean; // 配置项更新前清空
  options?: EChartsOption; // 配置项
  style?: React.CSSProperties;
}

export default function ReactECharts(props: Props) {
  const { options, clearBeforeUpdate = true } = props;
  const chartInstance = useRef<EChartsType>();
  const domRef = useRef<HTMLDivElement>(null);
  const isNeedClearEcharts = useIsNeedClearEcharts();

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

  useUpdateEffect(() => {
    if (isNeedClearEcharts(options) && (clearBeforeUpdate || !options)) {
      chartInstance?.current?.clear?.();
    }
    if (options) {
      chartInstance.current?.setOption?.(options);
    }
  }, [options]);

  useResizeDom(domRef, () => {
    chartInstance.current?.resize?.();
  });

  return useMemo(() => <div style={props?.style} ref={domRef} />, [props?.style]);
}
