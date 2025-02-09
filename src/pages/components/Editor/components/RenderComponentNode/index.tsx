/**
 * Render Component
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import engine, { ComponentNodeType, ComponentType, useRegisterInstance } from "@/engine";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { isKeyPressed } from "@/packages/shortCutKeys";
import { isClickMouseLeft, isClickMouseRight, isInRect } from "@/utils";
import { useItemContextMenu, useItemDragMove, useItemDragSize } from "./hooks";
import classNames from "classnames";
import styles from "./index.module.less";
import { useDomEvents, useListenRef } from "@/hooks";
import { ask } from "@/components/Ask";

interface RenderComponentProps {
  componentNode: ComponentNodeType;
}

interface ScopeRenderComponentNode extends RenderComponentProps {
  component: ComponentType;
}

export default function RenderComponentNode(props: RenderComponentProps) {
  const [componentNode, setComponentNode] = useState(props?.componentNode);
  const componentNodeShow = componentNode?.show ?? true;
  const component = useMemo(() => engine.component.get(componentNode.cId), [componentNode?.cId]);

  useEffect(() => {
    // 监听当前节点变更事件
    return engine.componentNode.onChange(componentNode.id, ({ payload }) => {
      setComponentNode({ ...payload });
    });
  }, []);

  return component && componentNodeShow ? (
    <ScopeRenderComponentNode componentNode={componentNode} component={component} />
  ) : (
    <></>
  );
}

function ScopeRenderComponentNode(props: ScopeRenderComponentNode) {
  const { component, componentNode } = props;
  const componentNodeRef = useListenRef<ComponentNodeType>(componentNode);

  const Component = component.component;
  const containerDomRef = useRef<HTMLDivElement>(null);
  const boxDomRef = useRef<HTMLDivElement>(null);

  // 是否选中
  const [isSelected, setIsSelected] = React.useState(false);
  // 是否hover中（不希望hover时渲染组件，此处仅仅用来在组件重新渲染时，保留之前的hover状态。例如：选中实例又取消选中时仍然有hover状态）
  const isHoverRef = useRef<boolean>(false);

  // 注册行为实例（只能改变内部属性）
  const instance = useRegisterInstance({
    id: componentNode.id,
    // 经过实例
    handleHover() {
      isHoverRef.current = true;
      boxDomRef.current?.classList?.add?.(styles.moveItem_box_hover);
    },
    // 离开实例
    handleUnHover() {
      isHoverRef.current = false;
      boxDomRef.current?.classList?.remove?.(styles.moveItem_box_hover);
    },
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
      return componentNodeRef.current;
    },
    // 获取实例的 component
    getComponent(): ComponentType {
      return component;
    },
  });

  // 找到点在layout区域内的 “layout组件”
  function getInRectLayoutComponentNode(point: {
    x: number;
    y: number;
  }): ComponentNodeType | undefined {
    return engine.componentNode.getAll().find?.((otherComponentNode) => {
      const isLayout = otherComponentNode.category === "layout";
      if (isLayout && otherComponentNode.id !== componentNode.id) {
        return isInRect(point, engine.componentNode.getCoordinate(otherComponentNode));
      }
      return false;
    });
  }

  // 注册拖拽位移
  useItemDragMove(containerDomRef, {
    lock: componentNode.lock,
    onEnd(_, __, e) {
      // （处理layout相关）
      // 结束放置，判断是否放在布局里
      setTimeout(() => {
        // 相交的最近layout组件
        const { x: domX = 0, y: domY = 0 } =
          containerDomRef.current?.getBoundingClientRect?.() || {};
        const layoutComponentNode = getInRectLayoutComponentNode({
          x: e.x - domX + componentNodeRef.current.x, // 鼠标点击位置在编辑器上的坐标
          y: e.y - domY + componentNodeRef.current.y,
        });

        // 如果在layout类型组件上方
        if (layoutComponentNode) {
          const targetPanelId = layoutComponentNode?.currentPanelId;
          // 如果在该layout类型组件的“当前面板”上，则返回
          if (
            !targetPanelId ||
            engine.componentNode.isInPanel(targetPanelId, componentNodeRef.current)
          ) {
            return;
          }
          // 如果不在，则询问是否移入
          ask({
            title: "移入提醒",
            content: `确定放入面板“${
              engine.componentNode.getPanelName(targetPanelId) || "目标"
            }”？`,
            onOk(close) {
              // 移入到panelId
              engine.componentNode.insertPanel(targetPanelId, componentNodeRef.current);
              close();
            },
          });
          return;
        }

        // 如果不在layout类型组件上方，则判断是否之前已经在layout类型组件中，如果在，则询问移出
        const panelId = componentNodeRef.current.panelId;
        if (panelId) {
          ask({
            title: "移出提醒",
            content: `是否移出面板“${engine.componentNode.getPanelName(panelId) || "目标"}”?`,
            onOk(close) {
              // 从面板移除
              engine.componentNode.removeFromPanel(panelId, componentNodeRef.current);
              close();
            },
          });
        }
      });
    },
  });

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
        // 当前组件已选中
        if (engine.instance.isSelected(componentNode.id)) {
          // 如果按住 shift 则取消选中
          if (isPressedShift) {
            engine.instance.unselect(componentNode.id);
          }
          return;
        }

        // 待选中组件实例ids
        const selectedIds: string[] = componentNode.groupId
          ? engine.componentNode.getGroupComponentNodeIds(componentNode.groupId)
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
        // 手动控制样式（实现其他地方可以控制当前组件hover效果）
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
        componentNode={componentNode}
      />

      {/* 遮罩层 */}
      <div
        ref={boxDomRef}
        className={classNames(
          styles.moveItem_box,
          isHoverRef.current && styles.moveItem_box_hover,
          isSelected && styles.moveItem_box_selected,
          componentNode.lock && styles.moveItem_box_lock,
        )}
      />
    </div>
  );
}
