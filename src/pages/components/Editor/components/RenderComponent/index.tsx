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

  console.log('zz componentData: ', componentData);

  return (
    <div>
      <ReactFC
        options={componentData.options}
        width={componentData.width}
        height={componentData.height}
      />
    </div>
  );
}
