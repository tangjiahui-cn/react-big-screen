/**
 * 渲染预览componentNode
 *
 * @author tangjiahui
 * @date 2025/1/16
 */
import { ComponentNodeType, ComponentType } from "@/engine";

interface RenderPreviewComponentNodeProps {
  componentNode: ComponentNodeType;
  component: ComponentType;
}

export default function RenderPreviewComponentNode(props: RenderPreviewComponentNodeProps) {
  const { component, componentNode } = props;
  const Component = component.component;
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
      <Component
        options={componentNode.options}
        width={componentNode.width}
        height={componentNode.height}
      />
    </div>
  );
}
