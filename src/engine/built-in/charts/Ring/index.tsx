/**
 * Ring (圆环图)
 *
 * @author tangjiahui
 * @date 2025/6/27
 */
import ReactECharts, { EChartsType } from "@/components/ReactECharts";
import { EChartsOption } from "echarts";
import { createComponent } from "@/engine";
import { useMemo, useRef } from "react";
import { useEffectOnce } from "@/hooks";

const X_DATA = ["私有化项目", "培训项目", "演示项目", "tjh项目", "xyz项目"];
const yData = [1048, 735, 580, 484, 300];

export default createComponent((props) => {
  const { width, height } = props;
  const chartsRef = useRef<EChartsType>();

  const chartOption: EChartsOption = useMemo(() => {
    const data = X_DATA.map((name, index) => {
      return {
        name,
        value: yData[index],
      };
    });
    const total = yData.reduce((sum, v) => sum + v, 0);
    return {
      title: {
        text: total,
        left: "center",
        top: "37%",
        textStyle: {
          color: "#fff",
          fontWeight: "normal",
          fontSize: 30,
          align: "center",
        },
        subtext: "总人数",
        subtextStyle: {
          color: "#bababa",
          fontWeight: "normal",
          fontSize: 16,
          align: "center",
        },
      },

      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "项目人数",
          type: "pie",
          radius: ["75%", "90%"],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 4,
          },
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data,
          // 高亮
          emphasis: {
            scaleSize: 10,
            label: {
              show: false,
            },
          },
        },
      ],
    } as any as EChartsOption;
  }, []);

  // ----------------- 模拟柱形图动效 （循环高亮）-----------------
  useEffectOnce(() => {
    let lastIndex: number | null = null;
    let currentIndex = 0;

    function run() {
      // 取消之前高亮区域
      if (lastIndex !== null) {
        chartsRef.current?.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: lastIndex,
        });
      }
      // 高亮区域
      chartsRef.current?.dispatchAction?.({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: (lastIndex = currentIndex),
      });
      // 索引循环
      currentIndex = ++currentIndex >= yData.length ? 0 : currentIndex;
    }

    run();
    let intervalId = setInterval(run, 1500);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  });

  return (
    <ReactECharts
      onGetInstance={(ins) => (chartsRef.current = ins)}
      options={chartOption}
      style={{
        width,
        height,
      }}
    />
  );
});
