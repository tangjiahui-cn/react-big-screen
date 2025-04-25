/**
 * Button（按钮）
 *
 * @author tangjiahui
 * @date 2024/12/25
 *
 */
import { Button } from "antd";
import { createComponent, EventData } from "@/engine";
import { DEFAULT_OPTIONS, ButtonOptions } from "./attributes";

type TriggerKeys = "onClick";
export const buttonTriggers: EventData<TriggerKeys>[] = [{ label: "点击事件", value: "onClick" }];

export default createComponent<ButtonOptions, TriggerKeys>((props) => {
  const { options, width, height, handleTrigger } = props;
  return (
    <Button
      type={options?.type}
      style={{ width, height, borderRadius: options.borderRadius }}
      onClick={(e) => handleTrigger("onClick", e)}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: options.value || "",
        }}
      />
    </Button>
  );
}, DEFAULT_OPTIONS);
