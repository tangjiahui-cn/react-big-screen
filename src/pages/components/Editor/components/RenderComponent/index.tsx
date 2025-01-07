/**
 * Render Component
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import { ComponentNodeType, ComponentType } from '@/engine';

interface RenderComponentProps {
  componentNode: ComponentNodeType;
  component: ComponentType;
}

export default function RenderComponent(props: RenderComponentProps) {
  const { componentNode, component } = props;
  const ReactFC = component.component;

  return (
    <div
      style={{
        position: 'absolute',
        left: componentNode.x,
        top: componentNode.y,
        width: componentNode.width,
        height: componentNode.height,
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
