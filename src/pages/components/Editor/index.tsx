/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from "./index.module.less";
import engine, { ComponentNodeType, useConfig, usePackages, useRangeSelect } from "@/engine";
import React, { useMemo, useRef } from "react";
import { useComponentNodes } from "@/engine";
import RenderComponentNode from "./components/RenderComponentNode";
import { isClickMouseLeft } from "@/utils";
import { useContextMenu } from "@/packages/contextMenu";
import { createEditorContextMenu } from "./data/contextMenu";
import { useVirtualDrop } from "@/packages/virtual-drag";

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

  // 注册范围框选
  useRangeSelect(innerEditorDomRef);

  // 注册右键菜单
  useContextMenu(editorDomRef, contextMenu);

  // 拖拽创建实例
  useVirtualDrop(innerEditorDomRef, {
    accept: ["create-component"],
    onDrop: (e: MouseEvent, dragOptions) => {
      const dom = innerEditorDomRef.current;
      if (!dom) {
        throw new Error("dom must be exist.");
      }
      const { data } = dragOptions;
      const component = data?.component;
      if (!component) {
        return;
      }
      // 创建一个componentNode
      const domRect = dom.getBoundingClientRect();
      const componentNode = engine.componentNode.createFromComponent(data.component, {
        x: Math.round(e.x - domRect.x),
        y: Math.round(e.y - domRect.y),
      });
      // 插入新componentNode到末尾
      engine.componentNode.add(componentNode);
      setTimeout(() => {
        // 选中新增的组件
        engine.instance.select(componentNode.id, true);
      });
    },
  });

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
