/**
 * request操作options
 */
import styles from "./index.module.less";
import { Line } from "@/components/Attributes";
import { ComponentNodeEventTargetRequestOption } from "@/engine";
import ICustomSelect from "@/components/ICustomSelect";
import { selectWidth } from ".";
import CodeEditor from "@/components/CodeEditor";
import { SaveOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { message, Space, Tooltip } from "antd";
import EditFunctionTextButton from "@/components/EditFunctionTextButton";

const TIPS = (
  <div>
    <div>格式参考：</div>
    <div style={{ whiteSpace: "pre-wrap", padding: "12px 0" }}>
      {JSON.stringify({ name: "tjh", age: 25 }, null, "    ")}
    </div>
  </div>
);

interface Props {
  value: ComponentNodeEventTargetRequestOption;
  onChange: (value: ComponentNodeEventTargetRequestOption) => void;
}

export default function RequestOptions(props: Props) {
  const type = props?.value?.type || "default";
  const [functionText, setFunctionText] = useState<string>();
  const [code, setCode] = useState<string>("");

  function handleSaveParam() {
    try {
      const json = JSON.parse(code);
      if (typeof json !== "object" || json === null) {
        message.warn("只能保存对象格式数据");
        return;
      }
      props?.onChange?.({
        ...props?.value,
        params: json,
      });
      message.success("更新成功");
    } catch (e) {
      message.warn("JSON格式不正确");
    }
  }

  useEffect(() => {
    setCode(JSON.stringify(props?.value?.params || {}, null, "\t"));
  }, [props?.value?.params]);

  useEffect(() => {
    setFunctionText(props?.value?.parserFunc);
  }, [props?.value?.parserFunc]);

  return (
    <div className={styles.eventOptions_main}>
      <Space style={{ width: "100%" }} direction={"vertical"} size={2}>
        <Line label={"参数类型"} labelSpan={3} />
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <ICustomSelect
            value={type}
            allowClear={false}
            style={{ width: selectWidth }}
            requestFn={async () => [
              { label: "默认", value: "default" },
              { label: "json对象", value: "json" },
            ]}
            onChange={(type: any) => {
              props?.onChange?.({
                ...props?.value,
                params: type === "default" ? undefined : {},
                type,
              });
            }}
          />
          {/* 参数解析函数 */}
          <EditFunctionTextButton
            tooltip={"解析函数"}
            value={functionText}
            onChange={(parserFunc?: string) => {
              setFunctionText(parserFunc);
              props?.onChange?.({
                ...props?.value,
                parserFunc,
              });
            }}
          />
        </div>
      </Space>
      {type === "json" && (
        <Space style={{ width: "100%" }} direction={"vertical"} size={2}>
          <Line label={"json对象"} labelSpan={3} labelTip={TIPS}>
            <Tooltip title={"更新"}>
              <SaveOutlined onClick={handleSaveParam} className={"icon_clickable"} />
            </Tooltip>
          </Line>

          <CodeEditor
            value={code}
            language={"json"}
            style={{ height: 380 }}
            onChange={(code: string) => {
              setCode(code);
            }}
          />
        </Space>
      )}
    </div>
  );
}
