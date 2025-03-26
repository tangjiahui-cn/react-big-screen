/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from "./index.module.less";
import engine, { ComponentNodeType, usePackages } from "@/engine";
import React, { useEffect, useMemo, useRef } from "react";
import { useComponentNodes } from "@/engine";
import RenderComponentNode from "./components/RenderComponentNode";
import { unSelectAllComponentNodes } from "@/packages/shortCutKeys";
import PageContainer from "./components/PageContainer";
import {
  useRegisterDrag,
  useCreateComponentNode,
  useRegisterContextMenu,
  useCreateFavorite,
} from "./hooks";

// 右键菜单项
export default React.memo(() => {
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
  useRegisterContextMenu(editorDomRef);

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
    <div
      ref={editorDomRef}
      className={styles.editor}
      onMouseDown={() => unSelectAllComponentNodes()}
    >
      <PageContainer ref={innerEditorDomRef} className={styles.editor_render}>
        {/* 渲染实例 */}
        {renderComponentNodes}
      </PageContainer>
    </div>
  );
});
