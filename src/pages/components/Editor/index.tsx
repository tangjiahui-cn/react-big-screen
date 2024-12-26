/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from './index.module.less';
import engine, { ComponentData, ComponentType, useConfig, usePanel } from '@/engine';
import React, { useMemo, useRef } from 'react';
import RenderComponent from './components/RenderComponent';
import { useVirtualDrop } from '@/virtual-drag';

export default React.memo(() => {
  const panel = usePanel();
  const config = useConfig();
  const editorDomRef = useRef<HTMLDivElement>();

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

  useVirtualDrop(editorDomRef, {
    onDrop: (e: MouseEvent, dragOptions) => {
      console.log('zz 放置: ', e, dragOptions);
    },
  });

  return (
    <div className={styles.editor}>
      <div
        ref={editorDomRef}
        className={styles.editor_render}
        style={{ width: config.width, height: config.height }}
      >
        {renderComponents}
      </div>
    </div>
  );
});
