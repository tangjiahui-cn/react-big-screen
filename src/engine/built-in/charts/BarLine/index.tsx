/**
 * 混合柱形图折线图
 */
import { createComponent } from "@/engine";
import ReactECharts from "@/components/ReactECharts";
import { useMemo, useState } from "react";
import { useEffectOnce } from "@/hooks";
import { getRandomInt, range } from "@/utils";

const xData = ["06-01", "06-02", "06-03", "06-04", "06-05", "06-06", "06-07"];
const MAX = 250;
const INIT_Y_DATA = [210, 200, 195, 200, 202, 195, 180];

export default createComponent((props) => {
  const { width, height } = props;
  const [yData, setYData] = useState<number[]>(INIT_Y_DATA);

  const chartOptions = useMemo(() => {
    const yRateData = yData.map((value) => (value * 100) / MAX);
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      grid: {
        top: 40,
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: xData,
          axisPointer: {
            type: "shadow",
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            color: "#b1b1b1",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "万元",
          min: 0,
          max: MAX,
          splitNumber: 5,
          nameTextStyle: {
            padding: [0, 0, 10, -40],
            color: "#b1b1b1",
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: "#b1b1b1",
          },
        },
        {
          type: "value",
          name: "%",
          min: 0,
          max: 100,
          splitNumber: 5,
          nameTextStyle: {
            padding: [0, 0, 10, 40],
            color: "#b1b1b1",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#093363",
            },
          },
          axisLabel: {
            color: "#b1b1b1",
          },
        },
      ],
      series: [
        {
          name: "金额",
          type: "bar",
          barWidth: 36,
          tooltip: {
            valueFormatter: function (value: any) {
              return value + " 万元";
            },
          },
          itemStyle: {
            normal: {
              color: new window.echarts.graphic.LinearGradient(
                0,
                1,
                0,
                0, // 这四个参数定义了渐变色的方向，这里是从下到上
                [
                  { offset: 1, color: "#1a44ea" }, // 渐变色的起始颜色
                  { offset: 0, color: "#168bb5" }, // 渐变色的结束颜色
                ],
              ),
            },
          },
          data: yData,
        },
        {
          name: "占比",
          type: "line",
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value: any) {
              return value + " %";
            },
          },
          itemStyle: {
            normal: {
              color: "#1FE9E9",
            },
          },
          data: yRateData,
        },
      ],
    };
  }, [yData]);

  // ----------------- 模拟柱形图动效 （动态修改数据变化）-----------------
  useEffectOnce(() => {
    function run() {
      setYData(
        INIT_Y_DATA.map((x) => {
          return range(x + getRandomInt(-30, 40), 0, MAX);
        }),
      );
    }
    let intervalId = setInterval(run, 2000);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  });

  return <ReactECharts options={chartOptions as any} style={{ width, height }} />;
});
