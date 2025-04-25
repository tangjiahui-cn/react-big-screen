/**
 * Text (文字)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { EventData } from "@/engine";
import { TextOptions, DEFAULT_OPTIONS } from "./attributes";
import { useState } from "react";
import { createComponent } from "@/engine";

type TriggerKeys = "onClick";
type ExposeKeys = "setText";

export const textTriggers: EventData<TriggerKeys>[] = [{ label: "点击事件", value: "onClick" }];
export const textExposes: EventData<ExposeKeys>[] = [{ label: "更新文本", value: "setText" }];

export default createComponent<TextOptions, TriggerKeys, ExposeKeys>((props) => {
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
        background: options?.background,
        wordBreak: "break-all",
        textAlign: options?.textAlign,
        color: options?.color,
        fontWeight: options?.fontWeight,
        fontStyle: options?.fontStyle,
        fontSize: options?.fontSize,
        lineHeight: options?.lineHeight ? `${options?.lineHeight}px` : undefined,
      }}
      onClick={(e) => handleTrigger("onClick", e)}
      dangerouslySetInnerHTML={{
        __html: innerValue ?? (options?.value || ""),
      }}
    />
  );
}, DEFAULT_OPTIONS);
