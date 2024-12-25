/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from './index.module.less';
import engine, { ComponentData, ComponentType, PanelType, useConfig } from '@/engine';
import React, { useMemo } from 'react';
import RenderComponent from './components/RenderComponent';

interface EditorProps {
  panel?: PanelType;
}

export default React.memo((props: EditorProps) => {
  const { panel } = props;
  const config = useConfig();

  const renderComponents = useMemo(() => {
    return panel?.children?.map((componentData: ComponentData) => {
      const component: ComponentType | undefined = engine.component.getComponent(componentData.cId);
      if (!component) return undefined;
      return (
        <RenderComponent
          key={componentData.id}
          componentData={componentData}
          component={component}
        />
      );
    });
  }, [panel]);

  return (
    <div className={styles.editor}>
      <div className={styles.editor_render} style={{ width: config.width, height: config.height }}>
        {renderComponents}
      </div>
    </div>
  );
});
