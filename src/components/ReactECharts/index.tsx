/**
 * ReactEcharts
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import React, { useEffect, useMemo, useRef } from "react";
import echarts, { EChartsOption, EChartsType } from "./echart";
import { useUpdateEffect } from "ahooks";

interface Props {
  options?: EChartsOption;
  style?: React.CSSProperties;
}

export default function ReactECharts(props: Props) {
  const { options } = props;
  const chartInstance = useRef<EChartsType>();
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chartInstance.current = echarts.init(domRef.current) as any;
    // 初次设置options
    if (options) {
      chartInstance.current?.setOption?.(options);
    }
    return () => {
      echarts.dispose(chartInstance.current as any);
    };
  }, []);

  useUpdateEffect(() => {
    if (options) {
      chartInstance.current?.setOption?.(options);
    } else {
      chartInstance?.current?.clear?.();
    }
  }, [props?.options]);

  useUpdateEffect(() => {
    chartInstance.current?.resize?.();
  }, [props?.style]);

  return useMemo(() => <div style={props?.style} ref={domRef} />, [props?.style]);
}
