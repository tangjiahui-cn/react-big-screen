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
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { RenderListItem } from "@/contextMenu";

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
  const contextMenuItems: RenderListItem[] = [
    {
      key: "top",
      icon: <VerticalAlignTopOutlined />,
      title: "置顶",
      style: { borderTop: "1px solid #e8e8e8" },
      onSelect() {
        const maxLevel = engine.componentNode.getMaxLevel();
        engine.instance.getAllSelected().forEach((instance) => {
          const componentNode = engine.componentNode.get(instance.id);
          if (componentNode) {
            engine.componentNode.update(instance.id, {
              level: maxLevel,
            });
          }
        });
      },
    },
    {
      key: "bottom",
      icon: <VerticalAlignBottomOutlined />,
      title: "置底",
      onSelect() {
        const minLevel = engine.componentNode.getMinLevel();
        engine.instance.getAllSelected().forEach((instance) => {
          const componentNode = engine.componentNode.get(instance.id);
          if (componentNode) {
            engine.componentNode.update(instance.id, {
              level: minLevel,
            });
          }
        });
      },
    },
    {
      key: "levelUp",
      icon: <ArrowUpOutlined />,
      title: "上移一层",
      onSelect() {
        const maxLevel = engine.componentNode.getMaxLevel();
        engine.instance.getAllSelected().forEach((instance) => {
          const componentNode = engine.componentNode.get(instance.id);
          if (componentNode) {
            engine.componentNode.update(instance.id, {
              level: Math.min(maxLevel, (componentNode?.level || 0) + 1),
            });
          }
        });
      },
    },
    {
      key: "levelDown",
      icon: <ArrowDownOutlined />,
      title: "下移一层",
      style: { borderBottom: "1px solid #e8e8e8" },
      onSelect() {
        const minLevel = engine.componentNode.getMinLevel();
        engine.instance.getAllSelected().forEach((instance) => {
          const componentNode = engine.componentNode.get(instance.id);
          if (componentNode) {
            engine.componentNode.update(instance.id, {
              level: Math.max(minLevel, (componentNode?.level || 0) - 1),
            });
          }
        });
      },
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      title: "删除",
      titleStyle: { gap: 6 },
      onSelect() {
        const selectInstanceIds: string[] = engine.instance.getAllSelected().map((ins) => ins.id);
        engine.componentNode.delete(selectInstanceIds);
      },
    },
  ];

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
