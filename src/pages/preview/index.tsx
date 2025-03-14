/**
 * 预览页面
 */
import styles from "./index.module.less";
import React, { useMemo } from "react";
import engine, {
  ComponentNodeType,
  type JsonType,
  useComponentNodes,
  useConfig,
  usePackages,
} from "@/engine";
import PageContainer from "../components/Editor/components/PageContainer";
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

  // 组件包
  const packages = usePackages();
  // 展示的 componentNodes
  const componentNodes: ComponentNodeType[] = useComponentNodes();

  // 渲染组件节点
  const renderComponentNodes: React.ReactNode[] = useMemo(() => {
    if (!packages.length) {
      return [];
    }
    return componentNodes?.map?.((componentNode: ComponentNodeType) => {
      return (
        <RenderPreviewComponentNode
          key={componentNode?.id}
          componentNode={componentNode}
          packages={packages}
        />
      );
    });
  }, [componentNodes, packages]);

  useEffectOnce(() => {
    // 读取本地json
    const json = getLocalPreviewJson();
    if (json) {
      engine.loadJSON(json);
    }
  });

  return (
    <FitScreen className={styles.preview} dw={config?.width || 1920} dh={config?.height || 1080}>
      <PageContainer style={{ width: "100%", height: "100%" }}>
        {renderComponentNodes}
      </PageContainer>
    </FitScreen>
  );
}
