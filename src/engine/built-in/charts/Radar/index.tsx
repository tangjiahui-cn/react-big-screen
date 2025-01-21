/**
 * Radar (雷达图)
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
    radar: {
      indicator: [
        { name: "Sales", max: 100 },
        { name: "Administration", max: 100 },
        { name: "Information Technology", max: 100 },
        { name: "Customer Support", max: 100 },
        { name: "Development", max: 100 },
        { name: "Marketing", max: 100 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [50, 50, 50, 50, 50, 50],
            name: "Allocated Budget",
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
