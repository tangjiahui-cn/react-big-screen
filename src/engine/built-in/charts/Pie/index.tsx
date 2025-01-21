/**
 * Pie (饼形图)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { ComponentProps } from "@/engine";
import ReactECharts from "@/components/ReactECharts";
import { EChartsOption } from "echarts";

type Props = ComponentProps<{}>;

export default function Title(props: Props) {
  const { options, width, height } = props;
  const { ...style } = options;

  const chartOption: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
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
