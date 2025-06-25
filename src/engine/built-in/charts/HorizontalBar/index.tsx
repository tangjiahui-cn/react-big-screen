/**
 * 横向柱形图
 */
import { createComponent } from "@/engine";
import ReactECharts from "@/components/ReactECharts";
import { useMemo } from "react";

const colors: string[] = [
  "rgb(28, 172, 255)",
  "rgb(69, 201, 235)",
  "rgb(69, 201, 235)",
  "rgb(31, 205, 234)",
  "rgb(124, 219, 225)",
  "rgb(172,202,178)",
  "rgb(184, 140, 212)",
];

const xData = ["私有化项目", "tjh项目", "xxx项目", "xyz项目", "zz项目", "演示项目", "培训项目"];
const yData = [900, 100, 150, 250, 800, 1100, 200];

export default createComponent((props) => {
  const { width, height } = props;

  const chartOptions: any = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        show: false,
      },
      grid: {
        top: "3%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          color: "#b1b1b1",
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        inverse: true, // 从上到下，从大到小
        type: "category",
        data: xData,
        axisLabel: {
          color: "#b1b1b1",
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          name: "人员数量",
          type: "bar",
          barWidth: 8,
          data: yData,
          realtimeSort: true, // 自动排列
          itemStyle: {
            // 颜色循环展示
            normal: {
              color: function (params: any) {
                return colors[params.dataIndex % colors.length];
              },
            },
          },
        },
      ],
    };
  }, []);

  return <ReactECharts style={{ width, height }} options={chartOptions} />;
});
