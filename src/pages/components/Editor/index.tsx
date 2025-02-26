/**
 * Editor
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import styles from "./index.module.less";
import engine, {
  ComponentNodeType,
  FavoritesComponentType,
  useConfig,
  usePackages,
  useRangeSelect,
} from "@/engine";
import React, { useMemo, useRef } from "react";
import { useComponentNodes } from "@/engine";
import RenderComponentNode from "./components/RenderComponentNode";
import { isClickMouseLeft } from "@/utils";
import { useContextMenu } from "@/packages/contextMenu";
import { createEditorContextMenu } from "./data/contextMenu";
import { useVirtualDrop } from "@/packages/virtual-drag";
import { message } from "antd";

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
        pageId: engine.config.getCurrentPage(),
      });
      // 插入新componentNode到末尾
      engine.componentNode.add(componentNode);
      setTimeout(() => {
        // 选中新增的组件
        engine.instance.select(componentNode.id, true);
      });
    },
  });

  // 拖拽创建favorite
  useVirtualDrop(innerEditorDomRef, {
    accept: ["create-favorite"],
    onDrop: (e: MouseEvent, dragOptions) => {
      const dom = innerEditorDomRef.current;
      if (!dom) {
        throw new Error("dom must be exist.");
      }
      const domRect = dom.getBoundingClientRect();
      const favorite: FavoritesComponentType = dragOptions.data?.favorite;
      if (!favorite.children?.length) {
        message.warn("收藏元素为空");
      }

      // 鼠标放置位置坐标
      const x = Math.round(e.x - domRect.x);
      const y = Math.round(e.y - domRect.y);

      // 计算组件列表左上角最小坐标
      const first = favorite.children[0];
      const { x: minX, y: minY } = favorite.children.reduce(
        (coordinate, componentNode) => {
          coordinate.x = Math.min(coordinate.x, componentNode.x);
          coordinate.y = Math.min(coordinate.y, componentNode.y);
          return coordinate;
        },
        {
          x: first.x,
          y: first.y,
        },
      );

      const pageId = engine.config.getCurrentPage();
      // 这里克隆children后创建到画布
      const clonedComponents = engine.componentNode.cloneComponentNodes(favorite.children, {
        onClone(_, cloned) {
          // 计算坐标
          cloned.x = x + (cloned.x - minX);
          cloned.y = y + (cloned.y - minY);
          cloned.pageId = pageId;
        },
      });
      engine.componentNode.add(clonedComponents);
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
