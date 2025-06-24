/**
 * 滚动列表
 *
 * @author tangjiahui
 * @date 2025/6/23
 */
import { createComponent } from "@/engine";
import { ScrollListOptions, DEFAULT_OPTIONS } from "./attributes";
import styles from "./index.module.less";
import AutoScroll from "@/components/AutoScroll";
import { CalendarOutlined } from "@ant-design/icons";

interface DataSourceItem {
  key: string;
  title: string;
  status: "1" | "2"; // 1已签 2未签
}

export default createComponent<ScrollListOptions>((props) => {
  const { width, height, options, dataSource } = props;
  const list: DataSourceItem[] = dataSource;
  return (
    <AutoScroll
      style={{ width, height }}
      className={styles.scrollList}
      disabled={!options?.autoScroll}
      pxPerSecond={options?.pxPerSecond}
    >
      {list.map((item) => {
        return (
          <div key={item?.key} className={styles.scrollList_line}>
            <CalendarOutlined style={{ color: "#2EDCF7" }} />
            <span style={{ flex: 1 }}>{item?.title}</span>
            {item?.status === "1" ? (
              <span style={{ color: "#2EDCF7" }}>已签</span>
            ) : (
              <span style={{ color: "#e82a2a" }}>未签</span>
            )}
          </div>
        );
      })}
    </AutoScroll>
  );
}, DEFAULT_OPTIONS);
