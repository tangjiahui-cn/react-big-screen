/**
 * Render Component
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import engine, { ComponentNodeType, ComponentType, useRegisterInstance } from "@/engine";
import styles from "./index.module.less";
import classNames from "classnames";
import MoveItem, { MoveItemRefType } from "./components/MoveItem";
import { useRef } from "react";
import { useStateWithRef } from "@/hooks";

interface RenderComponentProps {
  componentNode: ComponentNodeType;
  component: ComponentType;
}

export default function RenderComponentNode(props: RenderComponentProps) {
  const { component } = props;
  const Component = component.component;
  const [innerComponentNode, setInnerComponentNode, innerComponentNodeRef] =
    useStateWithRef<ComponentNodeType>(props?.componentNode);
  const moveItemRef = useRef<MoveItemRefType>(null);

  // 注册运行时行为实例
  const instance = useRegisterInstance({
    id: innerComponentNode.id,
    handleHover() {},
    handleUnHover() {},
    // 选中实例时
    handleSelected() {
      // 清空所有选中的实例
      engine.instance.unSelectAllSelectedInstances();
      // 增加选中样式
      moveItemRef?.current?.handleSelected?.();
      // 添加当前instance到选中实例中
      engine.instance.addSelectedInstance(instance);
    },
    // 取消选中实例时
    handleUnSelected() {
      // 移出选中样式
      moveItemRef?.current?.handleUnSelected?.();
      // 从选中实例中移除当前instance
      engine.instance.removeSelectedInstance(innerComponentNode.id);
    },
    // 触发更新局部componentNode
    setScopeComponentNode(componentNode: Partial<ComponentNodeType>, cover?: boolean) {
      setInnerComponentNode(() => {
        if (cover) return componentNode as any;
        return {
          ...innerComponentNodeRef.current,
          ...componentNode,
        };
      });
    },
  });

  return (
    <MoveItem
      ref={moveItemRef}
      className={classNames(styles.renderComponentNode)}
      style={{
        left: innerComponentNode.x,
        top: innerComponentNode.y,
        width: innerComponentNode.width,
        height: innerComponentNode.height,
        zIndex: innerComponentNode.level,
      }}
      onMouseEnter={() => {
        instance.handleHover();
      }}
      onMouseLeave={() => {
        instance.handleUnHover();
      }}
      onMouseDown={() => {
        instance.handleSelected();
      }}
      onMoveEnd={(deltaX, deltaY) => {
        if (deltaX || deltaY) {
          instance.setScopeComponentNode({
            x: deltaX + (innerComponentNodeRef.current?.x || 0),
            y: deltaY + (innerComponentNodeRef.current?.y || 0),
          });
        }
      }}
    >
      {/* 渲染组件 */}
      <Component
        options={innerComponentNode.options}
        width={innerComponentNode.width}
        height={innerComponentNode.height}
      />
    </MoveItem>
  );
}
