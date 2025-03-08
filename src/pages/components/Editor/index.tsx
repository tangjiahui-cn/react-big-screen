/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from "./index.module.less";
import engine, { ComponentNodeType, useConfig, usePackages } from "@/engine";
import React, { useEffect, useMemo, useRef } from "react";
import { useComponentNodes } from "@/engine";
import RenderComponentNode from "./components/RenderComponentNode";
import { useContextMenu } from "@/packages/contextMenu";
import { createEditorContextMenu } from "./data/contextMenu";
import { useRegisterDrag, useCreateComponentNode } from "./hooks";
import { useCreateFavorite } from "@/pages/components/Editor/hooks/useCreateFavorite";

// 右键菜单项
const contextMenu = createEditorContextMenu();
export default React.memo(() => {
  const config = useConfig();
  const editorDomRef = useRef<HTMLDivElement>(null);
  const innerEditorDomRef = useRef<HTMLDivElement>(null);

  // 组件包
  const packages = usePackages();
  // 展示的 componentNodes
  const componentNodes: ComponentNodeType[] = useComponentNodes();

  // 渲染实例列表
  const renderComponentNodes = useMemo(() => {
    if (!packages.length) {
      return;
    }
    return componentNodes?.map((componentNode: ComponentNodeType) => {
      return (
        <RenderComponentNode
          key={componentNode.id}
          componentNode={componentNode}
          packages={packages}
        />
      );
    });
  }, [componentNodes, packages]);

  // 注册拖拽相关
  useRegisterDrag(innerEditorDomRef);

  // 注册右键菜单
  useContextMenu(editorDomRef, contextMenu);

  // 拖拽创建实例
  useCreateComponentNode(innerEditorDomRef);

  // 拖拽创建favorite
  useCreateFavorite(innerEditorDomRef);

  // 监听页面组件删除
  useEffect(() => {
    // 删除 componentNode时，从page的globalComponents中移除，表示不再是一个全局组件
    return engine.componentNode.onDelete((ids) => {
      engine.page.removeGlobalComponentNode(ids);
    });
  }, []);

  return (
    <div ref={editorDomRef} className={styles.editor}>
      <div
        ref={innerEditorDomRef}
        className={styles.editor_render}
        style={{ width: config.width, height: config.height }}
      >
        {/* 渲染实例 */}
        {renderComponentNodes}
      </div>
    </div>
  );
});
