/**
 * 横向柱形图
 */
import { createComponent } from "@/engine";
import ReactECharts from "@/components/ReactECharts";
import { useMemo, useState } from "react";
import { useEffectOnce } from "@/hooks";

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
const INIT_Y_DATA = [900, 100, 150, 250, 800, 1100, 200];

export default createComponent((props) => {
  const { width, height } = props;
  const [yData, setYData] = useState(INIT_Y_DATA);
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
  }, [yData]);

  // 模拟柱形图动效 （动态修改数据变化）
  useEffectOnce(() => {
    function run() {
      indexArr = indexArr.slice(1).concat(indexArr.slice(0, 1));
      setYData(indexArr.map((index) => INIT_Y_DATA[index]));
    }

    // 索引数组
    let indexArr = Array(INIT_Y_DATA.length)
      .fill(null)
      .map((_, index) => index);

    let intervalId: any;
    let timeoutId = setTimeout(() => {
      run();
      intervalId = setInterval(run, 2000);
    }, 500);

    return () => {
      timeoutId && clearTimeout(timeoutId);
      intervalId && clearInterval(intervalId);
    };
  });

  return <ReactECharts style={{ width, height }} options={chartOptions} />;
});
