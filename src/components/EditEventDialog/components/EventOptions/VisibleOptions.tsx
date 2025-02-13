/**
 * 显隐操作options
 */
import styles from "./index.module.less";
import { Line } from "@/components/Attributes";
import { Switch } from "antd";
import { ComponentNodeEventTargetVisibleOption } from "@/engine";

interface Props {
  value: ComponentNodeEventTargetVisibleOption;
  onChange: (value: ComponentNodeEventTargetVisibleOption) => void;
}

export default function VisibleOptions(props: Props) {
  return (
    <div className={styles.eventOptions_main}>
      <Line label={"组件显示"} labelSpan={3}>
        <Switch
          size={"small"}
          checked={props?.value?.visible}
          onChange={(visible) => {
            props?.onChange?.({
              ...props?.value,
              visible,
            });
          }}
        />
      </Line>
    </div>
  );
}
