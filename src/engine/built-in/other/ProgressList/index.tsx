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
import { useMemo } from "react";
import { Progress } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

interface DataSourceItem {
  key: string;
  title: string; // 标题
  count: number; // 数量
}

export default createComponent<ProgressListOptions>((props) => {
  const { width, height, options, dataSource } = props;
  const list: DataSourceItem[] = dataSource;
  const max = useMemo(() => getMax(), [list, options?.max]);

  // 计算最大值
  function getMax() {
    const listMax = Math.max(...list.map((x) => x.count));
    if (!options?.max) return listMax;
    return Math.max(options?.max, listMax);
  }

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
