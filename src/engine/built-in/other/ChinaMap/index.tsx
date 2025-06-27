/**
 * 中国地图
 *
 * @author tangjiahui
 * @date 2025/6/23
 */

import { createComponent } from "@/engine";
import { registerChinaMap, MAP_CHINA, createAirplaneLine } from "./utils";
import ReactECharts, { type EChartsOption } from "@/components/ReactECharts";
import { useRequest } from "ahooks";
import { ChinaMapOptions, DEFAULT_OPTIONS } from "./attributes";
import { cityValueMap } from "@/engine/built-in/other/ChinaMap/data/mockData";

export default createComponent<ChinaMapOptions>((props) => {
  const { width, height, options } = props;

  const { data: chartOption } = useRequest(
    async () => {
      // 注册中国地图
      await registerChinaMap();

      // 创建geo
      function createGeo(ext: Record<string, any> = {}, isMask?: boolean): any {
        return {
          type: "map",
          name: "中国地图",
          map: MAP_CHINA,
          selectedMode: "single",
          label: {
            show: options?.showLabel,
            color: options?.color || "#fff",
          },
          // layoutCenter: ["50%", "62%"],
          layoutSize: `${120 + options?.scale!}%`,
          // 默认区块样式
          itemStyle: {
            areaColor: options?.areaColor || "transparent",
            borderColor: options?.outlineColor || "#23c2fb",
            borderWidth: options?.borderWidth || 1,
          },
          // 高亮状态（鼠标经过）
          emphasis: {
            disabled: isMask,
            label: {
              color: "whitesmoke",
            },
            itemStyle: {
              areaColor: options?.mapHoverColor || "rgba(16,43,128,0.9)",
            },
          },
          ...(isMask
            ? {}
            : {
                tooltip: {
                  formatter(node: any) {
                    const value = cityValueMap[node?.name] || 0;
                    return `${node?.name || ""}: ${value}个`;
                  },
                },
              }),
          // 选中状态
          select: {
            disabled: isMask,
            label: {
              color: "#fff",
            },
            itemStyle: {
              areaColor: options?.mapSelectedColor || "rgba(16,43,128,1)",
            },
          },
          ...ext,
        };
      }

      let maxZ = 999;
      const chartOptions: EChartsOption = {
        tooltip: {
          trigger: "item",
        },
        // // 配置 visualMap 会忽略 effectScatter
        // visualMap: {
        // type: "continuous",
        // show: false,
        // min: 0,
        // max: 50000,
        // text: ["High", "Low"],
        // inRange: {
        //   color: ["red", "blue"],
        //   symbolSize: [30, 100],
        // },
        // },
        geo: [
          // 创建标准地图
          createGeo({
            layoutCenter: [`${50 + options?.centerX!}%`, `${62 + options?.centerY!}%`],
            z: maxZ--,
          }),
          // 创建阴影遮罩层
          createGeo(
            {
              layoutCenter: [`${50 + options?.centerX!}%`, `${64 + options?.centerY!}%`],
              z: maxZ--,
              silent: true,
              itemStyle: {
                areaColor: "#004b75",
                borderColor: "#195175",
                borderWidth: 2,
                shadowColor: "#0f4c74",
                shadowOffsetX: 4,
                shadowOffsetY: 4,
                shadowBlur: 10,
              },
            },
            true,
          ),
        ],
        series: createAirplaneLine(),
      };
      return chartOptions;
    },
    {
      refreshDeps: [
        options?.centerX,
        options?.centerY,
        options?.scale,
        options?.showLabel,
        options?.areaColor,
        options?.mapHoverColor,
        options?.mapSelectedColor,
        options?.outlineColor,
        options?.borderWidth,
        options?.color,
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
