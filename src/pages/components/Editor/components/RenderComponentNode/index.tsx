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

  // 注册行为实例（只能改变内部值，不能修改engine的值）
  const instance = useRegisterInstance({
    id,
    handleHover() {},
    handleUnHover() {},
    handleSelected() {
      // 内部样式选中
      moveItemRef?.current?.handleSelected?.();
    },
    handleUnSelected() {
      // 移除内部样式选中
      moveItemRef?.current?.handleUnSelected?.();
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

  // 选中当前组件
  function handleSelect() {
    if (engine.instance.isSelected(id)) {
      return;
    }
    // 是否按住多选键
    const isHoldMultiple = isKeyPressed("ctrl");
    engine.instance.select(instance, !isHoldMultiple);
  }

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
          // 选中当前组件
          handleSelect();
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
