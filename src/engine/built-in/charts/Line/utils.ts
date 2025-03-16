import { SeriesItem } from "@/engine/built-in/charts/Line/components/EditSeriesList";
import { EChartsOption } from "echarts";

// 获取dataSet
//
// 例如：
// dimensions: ["category", "value1", "value2", "value3"], // 维度[每一列的名称，...每一类子类]
// source: [
//   { category: "分类一", value1: 43.3, value2: 85.8, value3: 93.7 },
//   { category: "Milk Tea", value1: 83.1, value2: 73.4, value3: 55.1 },
//   { category: "Cheese Cocoa", value1: 86.4, value2: 65.2, value3: 82.5 },
//   { category: "Walnut Brownie", value1: 72.4, value2: 53.9, value3: 39.1 },
// ],
export function getDataSet(
  nameCode: string = "name", // x轴标签名称映射字段
  seriesList?: SeriesItem[], // 映射配置列表（每条记录对应一个图表）
  dataSource?: any[],
) {
  if (!seriesList?.length || !dataSource?.length) {
    return {
      source: [],
    };
  }
  return {
    dimensions: [nameCode, ...seriesList.map((item) => item.name)],
    source: dataSource.map((data: any) => {
      const item: Record<string, any> = { name: data.name };
      seriesList.forEach((seriesItem) => {
        item[seriesItem.name as any] = data[seriesItem.value as any] || 0;
      });
      return item;
    }),
  };
}

export function getSeries(seriesList?: SeriesItem[]): EChartsOption["series"] {
  return (
    seriesList?.map?.((item) => {
      return {
        id: item?.key,
        type: "line",
        color: item?.color,
      };
    }) || []
  );
}
