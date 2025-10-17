/**
 * 渲染预览模式
 */
import React, { useMemo } from "react";
import {
  Engine,
  ComponentNodeType,
  JsonType,
  useComponentNodes,
  useConfig,
  useCurrentPage,
  usePackages,
} from "@/engine";
import PageContainer from "@/pages/components/Editor/components/PageContainer";
import RenderPreviewComponentNode from "@/pages/preview/components/RenderPreviewComponentNode";
import FitScreen from "@/pages/preview/components/FitScreen";
import styles from "./index.module.less";

interface Props {
  json?: JsonType;
  engine: Engine;
  onJSONLoad?: () => void;
}

export default function (props: Props) {
  const { engine, json } = props;
  const config = useConfig();
  const { options } = useCurrentPage() || {};

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

  React.useEffect(() => {
    engine.loadJSON(json).then(() => {
      props?.onJSONLoad?.();
    });
  }, []);

  return (
    <FitScreen
      className={styles.preview}
      dw={config?.width || 1920}
      dh={config?.height || 1080}
      style={{ background: options?.whiteBoardColor }}
    >
      <PageContainer preview style={{ width: "100%", height: "100%" }}>
        {renderComponentNodes}
      </PageContainer>
    </FitScreen>
  );
}
