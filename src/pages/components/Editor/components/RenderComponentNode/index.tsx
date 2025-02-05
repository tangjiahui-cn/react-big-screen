/**
 * Render Component
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import engine, { ComponentNodeType, ComponentType, useRegisterInstance } from "@/engine";
import React, { useEffect, useRef, useState } from "react";
import { isKeyPressed } from "@/packages/shortCutKeys";
import { isClickMouseLeft, isClickMouseRight } from "@/utils";
import { useItemContextMenu, useItemDragMove, useItemDragSize } from "./hooks";
import classNames from "classnames";
import styles from "./index.module.less";
import { useDomEvents } from "@/hooks";

interface RenderComponentProps {
  componentNode: ComponentNodeType;
  component: ComponentType;
}

export default function RenderComponentNode(props: RenderComponentProps) {
  const [componentNode, setComponentNode] = useState(props?.componentNode);

  useEffect(() => {
    // 监听当前节点变更事件
    return engine.componentNode.onChange(componentNode.id, ({ payload }) => {
      setComponentNode({ ...payload });
    });
  }, []);

  return <ScopeRenderComponentNode componentNode={componentNode} component={props?.component} />;
}

function ScopeRenderComponentNode(props: RenderComponentProps) {
  const { component, componentNode } = props;
  const Component = component.component;
  const containerDomRef = useRef<HTMLDivElement>(null);

  // 是否选中
  const [isSelected, setIsSelected] = React.useState(false);

  // 注册行为实例（只能改变内部属性）
  const instance = useRegisterInstance({
    id: componentNode.id,
    // 经过实例
    handleHover() {},
    // 离开实例
    handleUnHover() {},
    // 选中实例样式
    handleSelected() {
      // 内部样式选中
      setIsSelected(true);
    },
    // 取消选中实例样式
    handleUnSelected() {
      // 移除内部样式选中
      setIsSelected(false);
    },
    // 获取容器dom
    getContainerDom(): HTMLDivElement {
      return containerDomRef.current!;
    },
    // 获取对应的 componentNode
    getComponentNode(): ComponentNodeType {
      return componentNode;
    },
    // 获取实例的 component
    getComponent(): ComponentType {
      return component;
    },
  });

  // 注册拖拽位移
  useItemDragMove(containerDomRef, { lock: componentNode.lock });

  // 注册拖拽大小
  useItemDragSize(containerDomRef, {
    isSelected,
    lock: componentNode.lock,
    onChange: (moveInfo) => {
      engine.componentNode.update(componentNode.id, {
        ...moveInfo,
      });
    },
  });

  // 注册右键菜单
  useItemContextMenu(containerDomRef);

  // 注册原生dom事件
  useDomEvents(containerDomRef, {
    // mousedown事件（因为原生使用了stopPropagation，react的合成onMouseDown会接受不到，所以直接绑定到原生事件）
    mousedown(e: MouseEvent) {
      const isClickLeft = isClickMouseLeft(e);
      const isPressedShift = isKeyPressed("shift");
      // 锁定状态下，不可单独选中
      if (componentNode.lock && isClickLeft && !isPressedShift) {
        return;
      }
      e.stopPropagation();
      const isClickRight = isClickMouseRight(e);
      // 点击左键或右键，可选中当前组件
      if (isClickLeft || isClickRight) {
        // 已选中组件，不可重复选中
        if (engine.instance.isSelected(componentNode.id)) {
          return;
        }

        // 待选中组件实例ids
        const selectedIds: string[] = componentNode.group
          ? engine.componentNode.getGroupComponentNodeIds(componentNode.group)
          : [instance.id];

        // 是否按住多选键（按住多选，则cover为true，不会取消选中其他实例）
        engine.instance.select(selectedIds, !isPressedShift);
      }
    },
  });

  return (
    <div
      ref={containerDomRef}
      className={classNames(styles.moveItem)}
      style={{
        opacity: componentNode.lock ? 0.75 : 1,
        left: componentNode.x,
        top: componentNode.y,
        width: componentNode.width,
        height: componentNode.height,
        zIndex: componentNode.level,
      }}
      onMouseEnter={() => {
        // 手动控制样式（实现禁用等其他状态下不显示选中效果）
        instance.handleHover();
      }}
      onMouseLeave={() => {
        instance.handleUnHover();
      }}
    >
      {/* 渲染组件 */}
      <Component
        options={componentNode.options}
        width={componentNode.width}
        height={componentNode.height}
      />

      {/* 遮罩层 */}
      <div
        className={classNames(
          styles.moveItem_box,
          isSelected && styles.moveItem_box_selected,
          componentNode.lock && styles.moveItem_box_lock,
        )}
      />
    </div>
  );
}
