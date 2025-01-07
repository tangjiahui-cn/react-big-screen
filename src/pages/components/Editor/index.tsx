/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from './index.module.less';
import engine, { ComponentNodeType, ComponentType, useConfig } from '@/engine';
import React, { useMemo, useRef } from 'react';
import { useVirtualDrop, useIsDragging } from '@/virtual-drag';
import { useComponentNodes } from '@/engine';
import classNames from 'classnames';
import RenderComponentNode from './components/RenderComponentNode';

export default React.memo(() => {
  const config = useConfig();
  const componentNodes: ComponentNodeType[] = useComponentNodes();
  const editorDomRef = useRef<HTMLDivElement>(null);

  const renderComponentNodes = useMemo(() => {
    return componentNodes?.map((componentNode: ComponentNodeType) => {
      const component: ComponentType | undefined = engine.component.getComponent(componentNode.cId);
      if (!component) return undefined;
      return (
        <RenderComponentNode
          key={componentNode.id}
          componentNode={componentNode}
          component={component}
        />
      );
    });
  }, [componentNodes]);

  const isDragging = useIsDragging({
    accept: ['create-component'],
  });

  useVirtualDrop(editorDomRef, {
    accept: ['create-component'],
    onDrop: (e: MouseEvent, dragOptions) => {
      const { data } = dragOptions;
      const component = data?.component;
      if (!component) {
        return;
      }
      // 创建一个componentNode
      const componentNode = engine.componentNode.createFromComponent(data.component, {
        x: e.layerX,
        y: e.layerY,
      });

      // 插入新componentNode到末尾
      engine.componentNode.insertComponentNode(componentNode);
    },
  });

  return (
    <div className={styles.editor}>
      <div
        ref={editorDomRef}
        className={styles.editor_render}
        style={{ width: config.width, height: config.height, position: 'relative' }}
      >
        {/* 渲染实例 */}
        {renderComponentNodes}

        {/* 定位遮罩层 */}
        <div
          className={classNames(
            styles.editor_render_locateMask,
            isDragging && styles.editor_render_locateMask_show,
          )}
        />
      </div>
    </div>
  );
});
