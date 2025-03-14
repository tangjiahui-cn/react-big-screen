/**
 * Line (折线图)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import ReactECharts from "@/components/ReactECharts";
import { EChartsOption } from "echarts";
import { createComponent } from "@/engine";
import { LineOptions, SeriesItem } from "./attributes";
import { useMemo } from "react";

const mockList = [
  { name: "选项一", value1: 100, value2: 200, value3: 300 },
  { name: "选项二", value1: 50, value2: 150, value3: 250 },
  { name: "选项三", value1: 80, value2: 180, value3: 280 },
];

export default createComponent<LineOptions>((props) => {
  const { width, height, options } = props;

  // 维度[每一列的名称，...每一类子类]
  // 例如：
  // dimensions: ["category", "value1", "value2", "value3"],
  // source: [
  //   { category: "分类一", value1: 43.3, value2: 85.8, value3: 93.7 },
  //   { category: "Milk Tea", value1: 83.1, value2: 73.4, value3: 55.1 },
  //   { category: "Cheese Cocoa", value1: 86.4, value2: 65.2, value3: 82.5 },
  //   { category: "Walnut Brownie", value1: 72.4, value2: 53.9, value3: 39.1 },
  // ],
  function getDataSet(seriesList?: SeriesItem[], dataSource?: any[]) {
    if (!seriesList?.length || !dataSource?.length) return {};
    return {
      dimensions: [options?.nameCode ?? "name", ...seriesList.map((item) => item.name)],
      source: dataSource.map((data: any) => {
        const item: Record<string, any> = { name: data.name };
        seriesList.forEach((seriesItem) => {
          item[seriesItem.name as any] = data[seriesItem.value as any] || 0;
        });
        return item;
      }),
    };
  }

  function getSeries(seriesList?: SeriesItem[]): EChartsOption["series"] {
    return (
      seriesList?.map?.((item) => {
        return {
          id: item?.key,
          type: "bar",
          color: item?.color,
        };
      }) || []
    );
  }

  const chartOption: EChartsOption = useMemo(() => {
    return {
      tooltip: {},
      dataset: getDataSet(options?.seriesList, mockList),
      xAxis: [{ type: "category" }],
      yAxis: [{}],
      series: getSeries(options?.seriesList),
    };
  }, [options?.seriesList, options?.nameCode]);

  return (
    <ReactECharts
      options={chartOption}
      style={{
        width,
        height,
        background: options?.background,
      }}
    />
  );
});
