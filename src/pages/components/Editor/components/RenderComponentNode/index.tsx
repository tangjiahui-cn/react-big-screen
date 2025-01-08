/**
 * Render Component
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import { ComponentNodeType, ComponentType, useRegisterInstance } from "@/engine";

interface RenderComponentProps {
  componentNode: ComponentNodeType;
  component: ComponentType;
}

export default function RenderComponentNode(props: RenderComponentProps) {
  const { componentNode, component } = props;
  const ReactFC = component.component;

  // 注册运行时行为实例
  useRegisterInstance({
    id: componentNode.id,
    handleHover() {
      // ...
    },
    handleUnHover() {
      // ...
    },
    handleSelected() {
      // ...
    },
    handleUnSelected() {
      // ...
    },
  });

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
      <ReactFC
        options={componentNode.options}
        width={componentNode.width}
        height={componentNode.height}
      />
    </div>
  );
}
