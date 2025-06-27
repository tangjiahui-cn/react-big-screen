/**
 * 滚动进度条列表
 *
 * @author tangjiahui
 * @date 2025/6/23
 */
import { createComponent } from "@/engine";
import { DEFAULT_OPTIONS, ProgressListOptions } from "./attributes";
import styles from "./index.module.less";
import AutoScroll from "@/components/AutoScroll";
import { useEffect, useMemo, useState } from "react";
import { Progress } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import { getRandomInt, range } from "@/utils";
import { cloneDeep } from "lodash-es";

interface DataSourceItem {
  key: string;
  title: string; // 标题
  count: number; // 数量
}

export default createComponent<ProgressListOptions>((props) => {
  const { width, height, options, dataSource } = props;
  const [list, setList] = useState<DataSourceItem[]>(dataSource);
  const max = useMemo(() => getMax(), [dataSource, options?.max]);

  // 计算最大值
  function getMax() {
    const listMax = Math.max(...list.map((x) => x.count));
    if (!options?.max) return listMax;
    return Math.max(options?.max, listMax);
  }

  // ----------------- Mock动效 -----------------
  useEffect(() => {
    setList(dataSource);
    let last = cloneDeep(dataSource);

    function run() {
      setList(
        (last = last.map((x: DataSourceItem) => {
          return {
            ...x,
            count: range(getRandomInt(-50, 50) + x?.count, 0, max),
          };
        })),
      );
    }

    let intervalId = setInterval(run, 1200);
    return () => {
      clearInterval(intervalId);
    };
  }, [dataSource]);

  return (
    <AutoScroll
      style={{ width, height }}
      className={styles.progressList}
      disabled={!options?.autoScroll}
      pxPerSecond={options?.pxPerSecond}
    >
      {list.map((item) => {
        const percent = ((item?.count || 0) * 100) / max;
        return (
          <div key={item?.key} className={styles.progressList_line}>
            <div className={styles.progressList_line_header}>
              <div
                style={{
                  color: options?.titleColor,
                  fontSize: options?.titleFontSize,
                }}
              >
                <DoubleRightOutlined style={{ marginRight: 6, color: options?.iconColor }} />
                {item?.title}
              </div>
              <div
                style={{
                  color: options?.countColor,
                  fontSize: options?.countFontSize,
                }}
              >
                {item?.count}
              </div>
            </div>
            <Progress
              showInfo={false}
              percent={percent}
              strokeColor={options?.progressColor}
              trailColor={options?.progressBgColor}
            />
          </div>
        );
      })}
    </AutoScroll>
  );
}, DEFAULT_OPTIONS);
