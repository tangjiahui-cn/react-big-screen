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
type ExposeKeys = "changeValue";
export const inputExposes: EventData<ExposeKeys>[] = [{ label: "修改值", value: "changeValue" }];

export default createComponent<InputOptions, TriggerKeys, ExposeKeys>((props) => {
  const { width, height, options, handleTrigger, useExpose } = props;
  const [value, setValue] = useState<string | undefined>(options?.value);

  // 监听options值
  useUpdateEffect(() => {
    setValue(options?.value);
  }, [options?.value]);

  // 暴露事件
  useExpose({
    changeValue: (payload) => {
      setValue(payload);
    },
  });

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
