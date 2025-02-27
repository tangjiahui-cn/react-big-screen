/**
 * Gauge (雷达图)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import ReactECharts from "@/components/ReactECharts";
import { EChartsOption } from "echarts";
import { createComponent } from "@/engine";

export default createComponent((props) => {
  const { width, height } = props;

  const chartOption: EChartsOption = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series: [
      {
        name: "Pressure",
        type: "gauge",
        detail: {
          formatter: "{value}",
        },
        data: [
          {
            value: 50,
            name: "SCORE",
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      options={chartOption}
      style={{
        width,
        height,
      }}
    />
  );
});
