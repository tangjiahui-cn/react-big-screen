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

export default function () {
  const { componentNode } = useSingleSelectedInstance();
  const request: ComponentRequest | undefined = componentNode?.request;

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
            <Tooltip title={"立即生效"}>
              <ReloadOutlined
                onClick={() => {
                  engine.instance.get(componentNode?.id)?.reloadRequest?.();
                }}
              />
            </Tooltip>
          </span>
        </div>
        <div className={styles.dataSource_result}></div>
      </div>
    </LineConfigProvider>
  );
}
