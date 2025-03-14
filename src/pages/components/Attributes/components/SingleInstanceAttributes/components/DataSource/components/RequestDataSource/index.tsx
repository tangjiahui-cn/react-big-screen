/**
 * 数据源 - 请求接口
 *
 * @author tangjiahui
 * @date 2025/3/14
 */
import { IInput, IInputNumber, Line } from "@/components/Attributes";
import ICustomSelect from "@/components/ICustomSelect";
import { Checkbox, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import CodeEditor from "@/components/CodeEditor";
import engine, { ComponentNodeType, ComponentRequest } from "@/engine";
import { useRequest } from "ahooks";
import { useSingleSelectedInstance } from "@/pages/components/Attributes/components/SingleInstanceAttributes";
import React, { useMemo } from "react";
import styles from "./index.module.less";

interface Props {
  style?: React.CSSProperties;
}

export default function RequestDataSource(props: Props) {
  const { componentNode } = useSingleSelectedInstance();
  const instance = useMemo(() => engine.instance.get(componentNode?.id), [componentNode?.id]);
  const request: ComponentRequest | undefined = componentNode?.request;

  // 调用一次request查询数据结果
  const {
    data: resultCode,
    loading,
    refresh,
  } = useRequest(
    async () => {
      return instance?.request?.(undefined, true)?.then((dataSource) => {
        return typeof dataSource === "object" && dataSource
          ? JSON.stringify(dataSource, null, "  ")
          : `${dataSource ?? null}`;
      });
    },
    {
      refreshDeps: [componentNode?.id],
    },
  );

  function handleChange(newRequest: Partial<ComponentNodeType["request"]>) {
    engine.componentNode.update(componentNode?.id, (config) => {
      return {
        request: {
          ...config.request,
          ...newRequest,
        },
      };
    });
  }

  return (
    <div style={props?.style} className={styles.requestDataSource}>
      <Line label={"请求类型"}>
        <ICustomSelect
          allowClear={false}
          style={{ width: "100%" }}
          requestFn={async () => [
            { label: "GET", value: "get" },
            { label: "POST", value: "post" },
            { label: "DELETE", value: "delete" },
            { label: "PUT", value: "put" },
          ]}
          value={request?.method || "get"}
          onChange={(method: any) => {
            handleChange({ method });
          }}
        />
      </Line>
      <Line label={"请求地址"}>
        <IInput
          value={request?.url}
          onChange={(url: any) => {
            handleChange({ url });
          }}
        />
      </Line>

      <b style={{ marginTop: 12 }}>请求配置</b>
      <Line label={"轮循请求"}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Checkbox
            checked={request?.loop ?? false}
            onChange={(e) => {
              handleChange({ loop: e.target.checked });
            }}
          />
          {request?.loop && (
            <>
              <IInputNumber
                style={{ width: 100 }}
                value={request?.loopDelay || 1000}
                onChange={(loopDelay) => {
                  handleChange({ loopDelay });
                }}
              />
              <span>毫秒</span>
            </>
          )}
        </div>
      </Line>
      <Line label={"初次请求"}>
        <Checkbox
          checked={request?.first ?? false}
          onChange={(e) => {
            handleChange({ first: e.target.checked });
          }}
        />
      </Line>

      <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <b>数据结果</b>
        <Tooltip title={"请求数据"}>
          <ReloadOutlined
            className={"icon_clickable"}
            onClick={() => {
              refresh();
            }}
          />
        </Tooltip>
      </div>

      {/* 展示返回结果 */}
      <CodeEditor
        readOnly
        minimap={false}
        language={"json"}
        value={loading ? "" : resultCode}
        style={{ flex: 1, minHeight: 200, maxHeight: 400 }}
      />
    </div>
  );
}
