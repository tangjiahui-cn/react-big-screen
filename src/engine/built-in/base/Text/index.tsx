/**
 * Text (文字)
 *
 * @author tangjiahui
 * @date 2025/1/21
 */
import { EventData } from "@/engine";
import { TextOptions } from "./attributes";
import { useState } from "react";
import { createComponent } from "@/engine";

type TriggerKeys = "onClick";
type ExposeKeys = "setText";

export const buttonTriggers: EventData<TriggerKeys>[] = [{ label: "点击事件", value: "onClick" }];
export const buttonExposes: EventData<ExposeKeys>[] = [{ label: "更新文本", value: "setText" }];

export default createComponent<TextOptions, TriggerKeys, ExposeKeys>((props) => {
  const { options, width, height, useExpose, handleTrigger } = props;
  const { value } = options;
  const [innerValue, setInnerValue] = useState<string>();

  useExpose({
    setText(value) {
      setInnerValue(value);
    },
  });

  return (
    <div
      onClick={() => handleTrigger("onClick")}
      style={{
        width,
        height,
        color: options?.color || "black",
        fontWeight: options?.fontWeight,
        fontStyle: options?.fontStyle,
        fontSize: options?.fontSize,
        lineHeight: options?.lineHeight ? `${options?.lineHeight}px` : undefined,
      }}
      dangerouslySetInnerHTML={{
        __html: innerValue ?? (value || ""),
      }}
    />
  );
});
