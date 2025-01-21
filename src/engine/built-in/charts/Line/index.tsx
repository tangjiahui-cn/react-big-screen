/**
 * Line (折线图)
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
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
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
