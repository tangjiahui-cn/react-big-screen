/**
 * 预览页面
 */
import styles from "./index.module.less";
import React, { useMemo, useState } from "react";
import engine, { ComponentNodeType, GlobalConfig, JsonType } from "@/engine";
import RenderPreviewComponentNode from "./components/RenderPreviewComponentNode";
import FitScreen from "@/pages/preview/components/FitScreen";
import { Empty } from "antd";
import { useEffectOnce } from "@/hooks";

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

  useEffectOnce(() => {
    // 读取本地json
    getLocalJson().then((json) => {
      setJson(json);
    });
  });

  return (
    <FitScreen className={styles.preview} dw={config?.width || 1920} dh={config?.height || 1080}>
      {json ? (
        renderComponentNodes
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无数据"} />
      )}
    </FitScreen>
  );
}
