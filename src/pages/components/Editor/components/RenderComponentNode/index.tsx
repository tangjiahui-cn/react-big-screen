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
import { useEffect, useRef, useState } from "react";
import { isKeyPressed } from "@/shortCutKeys";
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
  });

  // 右键菜单配置项
  const contextMenuItems = [{ key: "delete", title: "删除" }];

  // 右键菜单操作
  function handleSelectContextMenu(key: string) {
    switch (key) {
      case "delete":
        const selectInstanceIds: string[] = engine.instance.getAllSelected().map((ins) => ins.id);
        engine.componentNode.delete(selectInstanceIds);
        break;
      default:
        break;
    }
  }

  return (
    <MoveItem
      ref={moveItemRef}
      className={classNames(styles.renderComponentNode)}
      style={{
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
      onMouseDown={(e) => {
        e.stopPropagation();

        // 点击左键或右键，可选中当前组件
        if (isClickMouseLeft(e.nativeEvent) || isClickMouseRight(e.nativeEvent)) {
          if (engine.instance.isSelected(componentNode.id)) {
            return;
          }
          // 是否按住多选键
          const isHoldMultiple: boolean = isKeyPressed("shift");
          engine.instance.select(instance, !isHoldMultiple);
        }
      }}
      // 右键菜单配置项
      contextMenuItems={contextMenuItems}
      // 右键菜单选中回调
      onSelectContextMenu={handleSelectContextMenu}
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
