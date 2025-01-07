/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from './index.module.less';
import engine, { ComponentNodeType, ComponentType, useConfig } from '@/engine';
import React, { useMemo, useRef } from 'react';
import RenderComponent from './components/RenderComponent';
import { useVirtualDrop } from '@/virtual-drag';
import { useComponentNodes } from '@/engine';

export default React.memo(() => {
  const config = useConfig();
  const componentNodes: ComponentNodeType[] = useComponentNodes();
  const editorDomRef = useRef<HTMLDivElement>(null);

  const renderComponents = useMemo(() => {
    return componentNodes?.map((componentNode: ComponentNodeType) => {
      const component: ComponentType | undefined = engine.component.getComponent(componentNode.cId);
      if (!component) return undefined;
      return (
        <RenderComponent
          key={componentNode.id}
          componentNode={componentNode}
          component={component}
        />
      );
    });
  }, [componentNodes]);

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
