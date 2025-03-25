/**
 * Title (标题)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { createComponent } from "@/engine";
import styles from "./index.module.less";
import { DEFAULT_OPTIONS, TitleOptions } from "./attributes";

export default createComponent<TitleOptions>((props) => {
  const { options, width, height } = props;
  return (
    <div
      style={{ width, height }}
      className={styles.title}
      dangerouslySetInnerHTML={{
        __html: options?.value,
      }}
    />
  );
}, DEFAULT_OPTIONS);
