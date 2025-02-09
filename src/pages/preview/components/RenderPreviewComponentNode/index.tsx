/**
 * 渲染预览componentNode
 *
 * @author tangjiahui
 * @date 2025/1/16
 */
import engine, { ComponentNodeType, ComponentType } from "@/engine";
import { useEffect, useMemo, useState } from "react";

interface RenderPreviewComponentNodeProps {
  componentNode: ComponentNodeType;
  component: ComponentType;
}

export default function RenderPreviewComponentNode(props: RenderPreviewComponentNodeProps) {
  const [componentNode, setComponentNode] = useState(props?.componentNode);
  const componentNodeShow = componentNode?.show ?? true;
  const component = useMemo(() => engine.component.get(componentNode.cId), [componentNode?.cId]);

  useEffect(() => {
    // 监听当前节点变更事件
    return engine.componentNode.onChange(componentNode.id, ({ payload }) => {
      setComponentNode({ ...payload });
    });
  }, []);

  return component && componentNodeShow ? (
    <ScopeRenderPreviewComponentNode componentNode={componentNode} component={component} />
  ) : (
    <></>
  );
}

function ScopeRenderPreviewComponentNode(props: RenderPreviewComponentNodeProps) {
  const { component, componentNode } = props;
  return (
    <div
      style={{
        position: "absolute",
        left: componentNode.x,
        top: componentNode.y,
        width: componentNode.width,
        height: componentNode.height,
        zIndex: componentNode.level,
      }}
    >
      <component.component
        componentNode={componentNode}
        options={componentNode.options}
        width={componentNode.width}
        height={componentNode.height}
      />
    </div>
  );
}
