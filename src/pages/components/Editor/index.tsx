/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from "./index.module.less";
import engine, { ComponentNodeType, ComponentType, useConfig } from "@/engine";
import React, { useMemo, useRef } from "react";
import { useComponentNodes } from "@/engine";
import RenderComponentNode from "./components/RenderComponentNode";
import EditorMask from "./components/EditorMask";
import { isClickMouseLeft } from "@/utils";

export default React.memo(() => {
  const config = useConfig();
  const componentNodes: ComponentNodeType[] = useComponentNodes();
  const editorDomRef = useRef<HTMLDivElement>(null);

  // 渲染实例列表
  const renderComponentNodes = useMemo(() => {
    return componentNodes?.map((componentNode: ComponentNodeType) => {
      // 实例对应的组件模板
      const component: ComponentType | undefined = engine.component.get(componentNode.cId);
      if (!component) return undefined;
      // 渲染 componentNode
      return (
        <RenderComponentNode
          key={componentNode.id}
          componentNode={componentNode}
          component={component}
        />
      );
    });
  }, [componentNodes]);

  return (
    <div
      ref={editorDomRef}
      className={styles.editor}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        if (isClickMouseLeft(e.nativeEvent)) {
          engine.instance.unselectAll();
        }
      }}
    >
      <div className={styles.editor_render} style={{ width: config.width, height: config.height }}>
        {/* 渲染实例 */}
        {renderComponentNodes}

        {/* 遮罩层 */}
        <EditorMask />
      </div>
    </div>
  );
});
