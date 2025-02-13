/**
 * 自定义函数操作options
 */
import styles from "./index.module.less";
import { Line } from "@/components/Attributes";
import { CHANGE_TARGET_PLACEHOLDER, ComponentNodeEventTargetCustomOption } from "@/engine";
import CodeEditor from "@/components/CodeEditor";
import { message, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { RedoOutlined, SaveOutlined } from "@ant-design/icons";

interface Props {
  value: ComponentNodeEventTargetCustomOption;
  onChange: (value: ComponentNodeEventTargetCustomOption) => void;
}

export default function CustomOptions(props: Props) {
  const [text, setText] = useState<string>();

  function handleChange(functionText?: string) {
    props?.onChange?.({
      ...props?.value,
      function: functionText,
    });
  }

  function handleReset() {
    handleChange(undefined);
    setText(undefined);
    message.success("重置成功");
  }

  function handleSave() {
    handleChange(text);
    message.success("更新成功");
  }

  useEffect(() => {
    setText(props?.value?.function);
  }, [props?.value?.function]);

  return (
    <div className={styles.eventOptions_main}>
      <Space style={{ width: "100%" }} direction={"vertical"} size={4}>
        <Line label={"函数内容"} labelSpan={3}>
          <div
            style={{
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Tooltip title={"更新"}>
              <SaveOutlined onClick={handleSave} className={"icon_clickable"} />
            </Tooltip>
            <Tooltip title={"重置"}>
              <RedoOutlined onClick={handleReset} className={"icon_clickable"} />
            </Tooltip>
          </div>
        </Line>
        <CodeEditor
          value={text ?? CHANGE_TARGET_PLACEHOLDER}
          language={"javascript"}
          style={{ height: 440 }}
          onChange={(text) => {
            setText(text);
          }}
        />
      </Space>
    </div>
  );
}
