/**
 * Radar (雷达图)
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
      }}
    />
  );
});
