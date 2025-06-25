/**
 * 特殊标题
 */
import { createComponent } from "@/engine";
import styles from "./index.module.less";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { DEFAULT_OPTIONS, SpecialTitleOptions } from "./attributes";

export default createComponent<SpecialTitleOptions>((props) => {
  const { width, height, options } = props;
  return (
    <div style={{ width, height }} className={styles.specialTitle}>
      <div className={styles.specialTitle_line_left} />
      <div className={styles.specialTitle_inner}>
        <DoubleRightOutlined className={styles.specialTitle_inner_icon} />
        <div
          style={{
            color: options?.color,
            wordBreak: "break-all",
            fontWeight: options?.fontWeight,
            fontSize: options?.fontSize,
            lineHeight: options?.lineHeight ? `${options?.lineHeight}px` : undefined,
          }}
          dangerouslySetInnerHTML={{
            __html: options?.value || "",
          }}
        />
        <DoubleLeftOutlined className={styles.specialTitle_inner_icon} />
      </div>
      <div className={styles.specialTitle_line_right} />
    </div>
  );
}, DEFAULT_OPTIONS);
