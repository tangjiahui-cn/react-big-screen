/**
 * Render Component
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import engine, { ComponentNodeType, ComponentType, useRegisterInstance } from "@/engine";
import MoveItem, { MoveItemRefType } from "./components/MoveItem";
import { useEffect, useRef, useState } from "react";
import { isKeyPressed } from "../../../../../packages/shortCutKeys";
import { isClickMouseLeft, isClickMouseRight } from "@/utils";

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
  const moveItemRef = useRef<MoveItemRefType>(null);

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
      moveItemRef?.current?.handleSelected?.();
    },
    // 取消选中实例样式
    handleUnSelected() {
      // 移除内部样式选中
      moveItemRef?.current?.handleUnSelected?.();
    },
    // 获取容器dom
    getContainerDom(): HTMLDivElement {
      return moveItemRef.current?.containerDom!;
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

  return (
    <MoveItem
      lock={componentNode.lock}
      ref={moveItemRef}
      style={{
        opacity: componentNode.lock ? 0.75 : 1,
        left: componentNode.x,
        top: componentNode.y,
        width: componentNode.width,
        height: componentNode.height,
        zIndex: componentNode.level,
      }}
      onMouseEnter={() => {
        instance.handleHover();
      }}
      onMouseLeave={() => {
        instance.handleUnHover();
      }}
      onPointerDown={(e) => {
        const isClickLeft = isClickMouseLeft(e.nativeEvent);
        // 锁定状态下，点击左键不进行任何操作
        if (componentNode.lock && isClickLeft) {
          return;
        }

        e.stopPropagation();

        const isClickRight = isClickMouseRight(e.nativeEvent);
        // 点击左键或右键，可选中当前组件
        if (isClickLeft || isClickRight) {
          // 不可重复选中
          if (engine.instance.isSelected(componentNode.id)) {
            return;
          }
          // 是否按住多选键
          const isHoldMultiple: boolean = isKeyPressed("shift");
          engine.instance.select(instance, !isHoldMultiple);
        }
      }}
      // 更新位置坐标信息
      onChangeUpdateMoveInfo={(moveInfo) => {
        engine.componentNode.update(componentNode.id, {
          ...moveInfo,
        });
      }}
    >
      {/* 渲染组件 */}
      <Component
        options={componentNode.options}
        width={componentNode.width}
        height={componentNode.height}
      />
    </MoveItem>
  );
}
