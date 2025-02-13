/**
 * 通用 - 组件内部expose事件options
 */
import styles from "./index.module.less";
import { IInputNumber, ITextArea, Line } from "@/components/Attributes";
import { ComponentNodeEventTargetCommonOption } from "@/engine";
import ICustomSelect from "@/components/ICustomSelect";
import { selectWidth } from "@/components/EditEventDialog/components/EventOptions/index";
import { message, Space, Tooltip } from "antd";
import CodeEditor from "@/components/CodeEditor";
import EditFunctionTextButton from "@/components/EditFunctionTextButton";
import { useEffect, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";

const emptyMap: Record<string, any> = {
  default: undefined,
  number: 0,
  text: "",
  json: {},
};

interface Props {
  value: ComponentNodeEventTargetCommonOption;
  onChange: (value: ComponentNodeEventTargetCommonOption) => void;
}

export default function CommonOptions(props: Props) {
  const { onChange } = props;
  const type = props?.value?.type || "default";
  const isJson = props?.value?.type === "json";

  const [functionText, setFunctionText] = useState<string>();
  const [jsonText, setJsonText] = useState<string>();

  function handleSaveJson() {
    if (!jsonText) {
      return message.warn("json不能为空");
    }
    try {
      const json = JSON.parse(jsonText || "");
      if (typeof json === "object" && json) {
        props?.onChange?.({
          ...props?.value,
          value: json,
        });
        message.success("设置成功");
      }
    } catch (e) {
      message.warn("json格式不正确");
    }
  }

  useEffect(() => {
    setFunctionText(props?.value?.parserFunc);
  }, [props?.value?.parserFunc]);

  useEffect(() => {
    if (props?.value?.type === "json") {
      setJsonText(JSON.stringify(props?.value?.value || {}, null, "\t"));
    }
  }, [props?.value?.type, props?.value?.value]);

  return (
    <div className={styles.eventOptions_main}>
      <Space direction={"vertical"} size={4} style={{ width: "100%" }}>
        <Line label={"参数类型"} labelSpan={3} labelTip={"json数据格式为数组或对象"} />
        <Space>
          <ICustomSelect
            value={type}
            allowClear={false}
            style={{ width: selectWidth }}
            requestFn={async () => {
              return [
                { label: "默认", value: "default" },
                { label: "数字", value: "number" },
                { label: "文本值", value: "text" },
                { label: "json数据", value: "json" },
              ];
            }}
            onChange={(type: any) =>
              onChange({
                ...props?.value,
                value: emptyMap[type],
                type,
              })
            }
          />
          {/* 参数解析函数 */}
          <EditFunctionTextButton
            tooltip={"解析函数"}
            value={functionText}
            onChange={(functionText?: string) => {
              setFunctionText(functionText);
              props?.onChange?.({
                ...props?.value,
                parserFunc: functionText,
              });
            }}
          />
        </Space>
      </Space>
      {props?.value?.type && props?.value?.type !== "default" && (
        <Space direction={"vertical"} size={4} style={{ width: "100%" }}>
          <Line label={"参数值"} labelSpan={3}>
            {isJson && (
              <Tooltip title={"更新"}>
                <SaveOutlined onClick={handleSaveJson} className={"icon_clickable"} />
              </Tooltip>
            )}
          </Line>
          <>
            {props?.value?.type === "number" && (
              <IInputNumber
                min={undefined}
                style={{ width: selectWidth * 2 }}
                value={props?.value?.value}
                onChange={(value) => {
                  onChange({
                    ...props?.value,
                    value,
                  });
                }}
              />
            )}
            {props?.value?.type === "text" && (
              <ITextArea
                style={{ width: selectWidth * 2 }}
                value={props?.value?.value}
                autoSize={{ minRows: 3, maxRows: 3 }}
                onChange={(value) => {
                  onChange({
                    ...props?.value,
                    value,
                  });
                }}
              />
            )}
            {isJson && (
              <CodeEditor
                language={"javascript"}
                style={{ height: 375 }}
                value={jsonText}
                onChange={(jsonText) => {
                  setJsonText(jsonText);
                }}
              />
            )}
          </>
        </Space>
      )}
    </div>
  );
}
