/**
 * Bar (柱形图)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { ComponentProps } from "@/engine";
import ReactECharts from "@/components/ReactECharts";
import { EChartsOption } from "echarts";

type Props = ComponentProps<{}>;

export default function (props: Props) {
  const { options, width, height } = props;
  const { ...style } = options;

  const chartOption: EChartsOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        barWidth: 12,
      },
    ],
  };

  return (
    <ReactECharts
      options={chartOption}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
}
