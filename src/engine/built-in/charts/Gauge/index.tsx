/**
 * Gauge (雷达图)
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
        ...style,
      }}
    />
  );
}
