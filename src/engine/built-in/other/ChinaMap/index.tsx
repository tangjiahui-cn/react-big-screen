/**
 * 中国地图
 *
 * @author tangjiahui
 * @date 2025/6/23
 */

import { createComponent } from "@/engine";
import { registerChinaMap, MAP_CHINA } from "./utils";
import ReactECharts, { type EChartsOption } from "@/components/ReactECharts";
import { useRequest } from "ahooks";
import { ChinaMapOptions, DEFAULT_OPTIONS } from "./attributes";

export default createComponent<ChinaMapOptions>((props) => {
  const { width, height, options } = props;

  const { data: chartOption } = useRequest(
    async () => {
      // 注册中国地图
      await registerChinaMap();
      const chartOptions: EChartsOption = {
        tooltip: {
          trigger: "item",
          formatter: (node: any) => {
            return `${node?.name || ""}: ${(isNaN(node?.value) ? 0 : node?.value) || 0}`;
          },
        },
        visualMap: {
          type: "continuous",
          show: false,
          min: 0,
          max: 50000,
          text: ["High", "Low"],
          inRange: {
            color: ["red", "blue"],
            symbolSize: [30, 100],
          },
        },
        series: [
          {
            type: "map",
            name: "中国地图",
            map: MAP_CHINA,
            label: {
              show: true,
            },
            ...(options?.top ? { top: options?.top } : {}),
            ...(options?.right ? { right: options?.right } : {}),
            ...(options?.bottom ? { bottom: options?.bottom } : {}),
            ...(options?.left ? { left: options?.left } : {}),
            selectedMode: "single",
            // 默认区块样式
            itemStyle: {
              areaColor: options?.mapBgColor || "#fff",
            },
            // 高亮状态（鼠标经过）
            emphasis: {
              label: {
                color: "whitesmoke",
              },
              itemStyle: {
                areaColor: options?.mapHoverColor,
              },
            },
            // 选中状态
            select: {
              label: {
                color: "#fff",
              },
              itemStyle: {
                areaColor: options?.mapSelectedColor,
              },
            },
          },
        ],
      };
      return chartOptions;
    },
    {
      refreshDeps: [
        options?.mapBgColor,
        options?.mapHoverColor,
        options?.mapSelectedColor,
        options.top,
        options.right,
        options.bottom,
        options.left,
      ],
    },
  );

  return (
    <ReactECharts
      shouldClear
      options={chartOption}
      style={{
        width,
        height,
        overflow: "hidden",
        background: options?.bgColor,
      }}
    />
  );
}, DEFAULT_OPTIONS);
