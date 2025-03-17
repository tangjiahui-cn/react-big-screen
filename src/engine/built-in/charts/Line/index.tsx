/**
 * Line (折线图)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import ReactECharts from "@/components/ReactECharts";
import { EChartsOption } from "echarts";
import { createComponent } from "@/engine";
import { LineOptions } from "./attributes";
import { useMemo } from "react";
import { getSeries, getDataSet } from "./utils";

export default createComponent<LineOptions>((props) => {
  const { width, height, options, dataSource } = props;

  const chartOption: EChartsOption = useMemo(() => {
    return {
      tooltip: { trigger: "item" },
      dataset: getDataSet(
        options?.nameCode,
        options?.seriesList,
        Array.isArray(dataSource) ? dataSource : [],
      ),
      xAxis: [{ type: "category" }],
      yAxis: [{}],
      series: getSeries(options?.seriesList),
    };
  }, [dataSource, options?.seriesList, options?.nameCode]);

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
