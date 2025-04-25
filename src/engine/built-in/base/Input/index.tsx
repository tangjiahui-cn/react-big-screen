/**
 * 输入框
 *
 * @author tangjiahui
 * @date 2025/4/25
 */
import { createComponent, EventData } from "@/engine";
import { Input } from "antd";
import { DEFAULT_OPTIONS, InputOptions } from "./attributes";
import { useState } from "react";
import { useUpdateEffect } from "ahooks";

type TriggerKeys = "input";
export const inputTriggers: EventData<TriggerKeys>[] = [{ label: "输入文本", value: "input" }];

export default createComponent<InputOptions, TriggerKeys>((props) => {
  const { width, height, options, handleTrigger } = props;
  const [value, setValue] = useState<string | undefined>(options?.value);

  useUpdateEffect(() => {
    setValue(options?.value);
  }, [options?.value]);

  return (
    <Input
      width={width}
      height={height}
      value={value}
      maxLength={options?.maxLength}
      allowClear={options?.allowClear}
      placeholder={options?.placeholder}
      onChange={(e) => {
        const str = e.target.value;
        handleTrigger("input", str);
        setValue(str);
      }}
    />
  );
}, DEFAULT_OPTIONS);
