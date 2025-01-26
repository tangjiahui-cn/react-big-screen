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
import { isClickMouseLeft, isIntersect } from "@/utils";
import { useContextMenu } from "../../../packages/contextMenu";
import { createEditorContextMenu } from "./contextMenu";
import { RangeInfo, useRangeBox } from "../../../packages/rangeBox";
import { throttle } from "lodash-es";

// 右键菜单项
const contextMenu = createEditorContextMenu();
export default React.memo(() => {
  const config = useConfig();
  const componentNodes: ComponentNodeType[] = useComponentNodes();
  const editorDomRef = useRef<HTMLDivElement>(null);
  const innerEditorDomRef = useRef<HTMLDivElement>(null);

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

  // 范围框选
  const handleSelectRangeInfo: (rangeInfo: RangeInfo) => void = useMemo(() => {
    return throttle((rangeInfo: RangeInfo) => {
      // 过滤框选实例
      const selectedIds = engine.componentNode.getAll().reduce((result, componentNode) => {
        const p1 = {
          x1: componentNode.x,
          y1: componentNode.y,
          x2: componentNode.x + componentNode.width,
          y2: componentNode.y + componentNode.height,
        };
        const p2 = {
          x1: rangeInfo.x,
          y1: rangeInfo.y,
          x2: rangeInfo.x + rangeInfo.width,
          y2: rangeInfo.y + rangeInfo.height,
        };
        // 两个矩形是否相交
        if (isIntersect(p1, p2) && !componentNode.lock) {
          result.push(componentNode.id);
        }
        return result;
      }, [] as string[]);
      // 选中框选的实例
      engine.instance.select(selectedIds, true);
    }, 100);
  }, []);

  // 注册范围框选组件
  useRangeBox(innerEditorDomRef, {
    onMove(rangeInfo) {
      handleSelectRangeInfo(rangeInfo);
    },
    onEnd(rangeInfo) {
      handleSelectRangeInfo(rangeInfo);
    },
  });

  // 注册右键菜单
  useContextMenu(editorDomRef, contextMenu);

  return (
    <div
      ref={editorDomRef}
      className={styles.editor}
      onContextMenu={(e) => e.preventDefault()}
      onPointerDown={(e) => {
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

        {/* 遮罩层 */}
        <EditorMask />
      </div>
    </div>
  );
});
