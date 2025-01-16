/**
 * 预览页面
 */
import styles from "./index.module.less";
import React, { useEffect, useMemo, useState } from "react";
import engine, { ComponentNodeType, GlobalConfig, JsonType } from "@/engine";
import RenderPreviewComponentNode from "./components/RenderPreviewComponentNode";
import { Empty } from "antd";

export default function Preview() {
  const [json, setJson] = useState<JsonType>();
  const config: GlobalConfig | undefined = useMemo(() => json?.config, [json]);
  const componentNodes: ComponentNodeType[] = useMemo(() => json?.componentNodes || [], [json]);

  // 渲染组件节点
  const renderComponentNodes: React.ReactNode[] = useMemo(() => {
    return componentNodes.reduce((list: React.ReactNode[], current: ComponentNodeType) => {
      const component = engine.component.get(current?.cId);
      if (component) {
        list.push(
          <RenderPreviewComponentNode
            key={current?.id}
            componentNode={current}
            component={component}
          />,
        );
      }
      return list;
    }, [] as React.ReactNode[]);
  }, [componentNodes]);

  function getLocalJson(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const json = JSON.parse(localStorage.getItem("json") || "");
        resolve(json);
      } catch (e) {
        reject(e);
      }
    });
  }

  useEffect(() => {
    // 读取本地json
    getLocalJson().then((json) => {
      setJson(json);
    });
  }, []);

  return json ? (
    <div className={styles.preview}>
      <div
        className={styles.preview_board}
        style={{
          width: config?.width || 1920,
          height: config?.height || 1080,
          background: "white",
        }}
      >
        {renderComponentNodes}
      </div>
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无数据"} />
  );
}
