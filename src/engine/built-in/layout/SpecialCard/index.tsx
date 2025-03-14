/**
 * SpecialCard（特殊卡片）
 *
 * @author tangjiahui
 * @date 2025/3/13
 */
import styles from "./index.module.less";
import { createComponent } from "@/engine";
import { SpecialCardOptions } from "./attributes";
import { DoubleRightOutlined } from "@ant-design/icons";

export default createComponent<SpecialCardOptions>((props) => {
  const { options } = props;
  return (
    <div
      className={styles.specialCard}
      style={{
        color: options?.color,
        borderRadius: options?.borderRadius,
        background: options?.background,
        border: options?.bordered
          ? `${options?.borderWidth || 1}px solid ${options?.borderColor || "white"}`
          : undefined,
      }}
    >
      <div className={styles.specialCard_head}>
        <DoubleRightOutlined className={styles.specialCard_head_arrow} />
        <div className={styles.specialCard_head_title}>{options?.title}</div>
      </div>
    </div>
  );
});
