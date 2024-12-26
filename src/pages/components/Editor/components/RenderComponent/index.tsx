/**
 * Render Component
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import { ComponentData, ComponentType } from '@/engine';

interface RenderComponentProps {
  componentData: ComponentData;
  component: ComponentType;
}

export default function RenderComponent(props: RenderComponentProps) {
  const { componentData, component } = props;
  const ReactFC = component.component;

  return (
    <div
      style={{
        position: 'absolute',
        left: componentData.x,
        top: componentData.y,
        width: componentData.width,
        height: componentData.height,
      }}
    >
      <ReactFC
        options={componentData.options}
        width={componentData.width}
        height={componentData.height}
      />
    </div>
  );
}
