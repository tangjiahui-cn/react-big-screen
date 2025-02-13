/**
 * 预览页面
 */
import styles from "./index.module.less";
import React, { useMemo } from "react";
import engine, { ComponentNodeType, type JsonType, useComponentNodes, useConfig } from "@/engine";
import RenderPreviewComponentNode from "./components/RenderPreviewComponentNode";
import FitScreen from "@/pages/preview/components/FitScreen";
import { useEffectOnce } from "@/hooks";

// 保存本地预览json数据
export function saveLocalPreviewJson(json: JsonType): void {
  localStorage.setItem("preview_json", JSON.stringify(json));
}

// 读取本地预览json数据
export function getLocalPreviewJson(): JsonType | undefined {
  let json: JsonType | undefined;
  try {
    json = JSON.parse(localStorage.getItem("preview_json") || "");
  } catch (e) {
    console.error(e);
  }
  return json;
}

export default function Preview() {
  const config = useConfig();
  const componentNodes: ComponentNodeType[] = useComponentNodes();

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

  useEffectOnce(() => {
    // 读取本地json
    const json = getLocalPreviewJson();
    if (json) {
      engine.loadJSON(json);
    }
  });

  return (
    <FitScreen className={styles.preview} dw={config?.width || 1920} dh={config?.height || 1080}>
      {renderComponentNodes}
    </FitScreen>
  );
}
