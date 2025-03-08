/**
 * Render Component
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
import engine, {
  ComponentHandleTrigger,
  ComponentNodeType,
  ComponentType,
  ComponentUseExpose,
  useComponentNodeRequest,
  useRegisterInstance,
  useCreateHandleTrigger,
  useCreateUseExposeHook,
  ComponentPackage,
} from "@/engine";
import React, { useMemo, useRef, useState } from "react";
import { addHistory } from "@/packages/shortCutKeys";
import { useItemContextMenu, useItemDragSize } from "./hooks";
import classNames from "classnames";
import styles from "./index.module.less";
import { useEffectOnce, useListenRef } from "@/hooks";
import { useUpdateEffect } from "ahooks";

interface RenderComponentProps {
  componentNode: ComponentNodeType;
  packages: ComponentPackage[];
}

interface ScopeRenderComponentNodeProps extends Omit<RenderComponentProps, "packages"> {
  component: ComponentType;
}

export default function RenderComponentNode(props: RenderComponentProps) {
  const [scopeComponentNode, setScopeComponentNode] = useState<ComponentNodeType>(
    props?.componentNode,
  );

  const componentNodeShow = scopeComponentNode ? scopeComponentNode?.show ?? true : false;

  // packages 变化必定导致 components 变化，所以重新查找组件的 component 是否存在
  const component = useMemo(
    () => engine.component.get(props?.componentNode.cId),
    [props?.componentNode?.cId, props?.packages],
  );

  useEffectOnce(() => {
    // 监听当前节点变更事件
    return engine.componentNode.onChange(props?.componentNode.id, ({ payload }) => {
      setScopeComponentNode({ ...payload });
    });
  });

  useUpdateEffect(() => {
    // componentNodes更新时，刷新当前 componentNode
    // （此时，一定是全局componentNodes更新了，才会导致 props.componentNode更新。组件内部，都是触发局部更新的。）
    setScopeComponentNode(props?.componentNode);
  }, [props?.componentNode]);

  return component && componentNodeShow ? (
    <ScopeRenderComponentNode componentNode={scopeComponentNode} component={component} />
  ) : (
    <></>
  );
}

function ScopeRenderComponentNode(props: ScopeRenderComponentNodeProps) {
  const { component, componentNode } = props;
  const componentNodeRef = useListenRef<ComponentNodeType>(componentNode);
  const containerDomRef = useRef<HTMLDivElement>(null);
  const boxDomRef = useRef<HTMLDivElement>(null);

  // 是否选中
  const [isSelected, setIsSelected] = React.useState(false);
  // 是否hover中（不希望hover时渲染组件，此处仅仅用来在组件重新渲染时，保留之前的hover状态。例如：选中实例又取消选中时仍然有hover状态）
  const isHoverRef = useRef<boolean>(false);

  // 注册接口请求相关
  const { dataSource, requestInstance } = useComponentNodeRequest(componentNode);
  // 注册触发事件
  const handleTrigger: ComponentHandleTrigger = useCreateHandleTrigger(componentNode.id);
  // 注册暴露事件
  const useExpose: ComponentUseExpose = useCreateUseExposeHook(componentNode.id);

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
    // 重新载入request配置
    reloadRequest() {
      requestInstance.reload();
    },
    // 立刻请求一次
    request: (params?: Record<string, any>, noCache?: boolean): Promise<any> => {
      return requestInstance.request(params, noCache);
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
    onEnd: () => {
      addHistory("拖拽组件大小");
    },
  });

  // 注册右键菜单
  useItemContextMenu(containerDomRef);

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
      <component.component
        useExpose={useExpose}
        handleTrigger={handleTrigger}
        dataSource={dataSource}
        options={componentNode.options}
        width={componentNode.width}
        height={componentNode.height}
        componentNode={componentNode}
      />

      {/* 遮罩层 */}
      <div
        data-id={componentNode.id}
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
