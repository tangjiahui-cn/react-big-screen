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
import { useListenStateWithRef } from "@/hooks";
import { isKeyPressed } from "@/shortCutKeys";
import { isClickMouseLeft } from "@/utils";

interface RenderComponentProps {
  componentNode: ComponentNodeType;
  component: ComponentType;
}

export default function RenderComponentNode(props: RenderComponentProps) {
  const { component } = props;
  const Component = component.component;
  const [innerComponentNode, setInnerComponentNode, innerComponentNodeRef] =
    useListenStateWithRef<ComponentNodeType>(props.componentNode);
  const moveItemRef = useRef<MoveItemRefType>(null);
  const id = innerComponentNode.id;

  // 注册行为实例
  const instance = useRegisterInstance({
    id,
    handleHover() {},
    handleUnHover() {},
    // 选中实例时
    handleSelected(keepOther?: boolean) {
      if (engine.instance.isSelected(id)) {
        return;
      }
      // 是否按住多选键
      const isHoldMultiple = isKeyPressed("ctrl");
      // 清除其他选中实例
      if (!keepOther && !isHoldMultiple) {
        // 清空所有选中的实例
        engine.instance.unSelectAllSelectedInstances();
      }
      // 增加选中样式
      moveItemRef?.current?.handleSelected?.();
      // 添加当前instance到选中实例中
      engine.instance.addSelectedInstance(instance);
    },
    // 取消选中实例时
    handleUnSelected(keepSelf?: boolean) {
      // 移出选中样式
      moveItemRef?.current?.handleUnSelected?.();
      if (!keepSelf) {
        // 从选中实例中移除当前instance
        engine.instance.removeSelectedInstance(id);
      }
    },
    // 触发更新局部componentNode
    setScopeComponentNode(extComponentNode: Partial<ComponentNodeType>) {
      const scopeComponentNode: ComponentNodeType = {
        ...(innerComponentNodeRef.current as ComponentNodeType),
        ...extComponentNode,
      };
      // 更新内部componentNode
      setInnerComponentNode(scopeComponentNode);
      // 更新json的componentNode
      engine.componentNode.updateComponentNode(innerComponentNode.id, scopeComponentNode);
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
      onMouseDown={(e) => {
        if (isClickMouseLeft(e.nativeEvent)) {
          instance.handleSelected();
        }
        e.stopPropagation();
      }}
      onMoveEnd={(deltaX, deltaY) => {
        if (deltaX || deltaY) {
          instance.setScopeComponentNode({
            x: deltaX + (innerComponentNodeRef.current?.x || 0),
            y: deltaY + (innerComponentNodeRef.current?.y || 0),
          });
        }
      }}
      onContextMenu={(e) => e.preventDefault()}
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
