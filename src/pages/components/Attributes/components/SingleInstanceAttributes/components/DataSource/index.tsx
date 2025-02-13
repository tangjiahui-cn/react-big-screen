/**
 * DataSource
 *
 * @author tangjiahui
 * @date 2025/2/10
 */
import { IInputNumber, Line, LineConfigProvider } from "@/components/Attributes";
import ICustomSelect from "@/components/ICustomSelect";
import styles from "./index.module.less";
import { IInput } from "@/components/Attributes/base/IInput";
import { Checkbox, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useSingleSelectedInstance } from "../..";
import engine, { ComponentNodeType, ComponentRequest } from "@/engine";
import { useMemo } from "react";
import CodeEditor from "@/components/CodeEditor";
import { useRequest } from "ahooks";

export default function () {
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
      return instance?.request?.()?.then((dataSource) => {
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
    <LineConfigProvider labelSpan={5}>
      <div className={styles.dataSource}>
        {/* 暂时只支持手动 */}
        <Line label={"数据源"}>
          <ICustomSelect
            value={1}
            allowClear={false}
            style={{ width: "100%" }}
            requestFn={async () => [{ label: "手动", value: 1 }]}
          />
        </Line>
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
          <span className={styles.clickableIcon}>
            <Tooltip title={"请求数据"}>
              <ReloadOutlined
                onClick={() => {
                  refresh();
                }}
              />
            </Tooltip>
          </span>
        </div>

        {/* 展示返回结果 */}
        <CodeEditor
          readOnly
          minimap={false}
          language={"json"}
          value={loading ? "" : resultCode}
          style={{ height: 300 }}
        />
      </div>
    </LineConfigProvider>
  );
}
