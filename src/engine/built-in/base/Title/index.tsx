/**
 * Title (标题)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { createComponent, EventData } from "@/engine";
import styles from "./index.module.less";
import { DEFAULT_OPTIONS, TitleOptions } from "./attributes";
import { useState } from "react";

type TriggerKeys = "onClick";
type ExposeKeys = "setText";

export const titleTriggers: EventData<TriggerKeys>[] = [{ label: "点击事件", value: "onClick" }];
export const titleExposes: EventData<ExposeKeys>[] = [{ label: "更新文本", value: "setText" }];

export default createComponent<TitleOptions, TriggerKeys, ExposeKeys>((props) => {
  const { options, width, height, useExpose, handleTrigger } = props;
  const [innerValue, setInnerValue] = useState<string>();

  useExpose({
    setText(value: any) {
      setInnerValue(value);
    },
  });

  return (
    <div
      style={{
        width,
        height,
        lineHeight: `${height}px`,
        background: options?.background,
        wordBreak: "break-all",
        textAlign: options?.textAlign,
        color: options?.color,
        fontWeight: options?.fontWeight,
        fontStyle: options?.fontStyle,
        fontSize: options?.fontSize,
        letterSpacing: options?.letterSpacing,
      }}
      onClick={(e) => handleTrigger("onClick", e)}
      className={styles.title}
      dangerouslySetInnerHTML={{
        __html: innerValue ?? (options?.value || ""),
      }}
    />
  );
}, DEFAULT_OPTIONS);
