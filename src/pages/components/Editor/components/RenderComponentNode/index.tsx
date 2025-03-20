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
import { Suspense, useMemo, useRef, useState } from "react";
import { useEffectOnce, useListenRef } from "@/hooks";
import { useUpdateEffect } from "ahooks";
import Mask, { MaskRefType } from "./components/Mask";

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

  // 注册接口请求相关
  const { dataSource, requestInstance } = useComponentNodeRequest(componentNode);
  // 注册触发事件
  const handleTrigger: ComponentHandleTrigger = useCreateHandleTrigger(componentNode.id);
  // 注册暴露事件
  const useExpose: ComponentUseExpose = useCreateUseExposeHook(componentNode.id);
  // 遮罩层实例
  const maskRef = useRef<MaskRefType>(null);

  // 注册行为实例（只能改变内部属性）
  const instance = useRegisterInstance({
    id: componentNode.id,
    // 经过实例
    handleHover() {
      maskRef?.current?.handleHover?.();
    },
    // 离开实例
    handleUnHover() {
      maskRef?.current?.handleUnHover?.();
    },
    // 选中实例样式
    handleSelected() {
      maskRef?.current?.handleSelected?.();
    },
    // 取消选中实例样式
    handleUnSelected() {
      maskRef?.current?.handleUnSelected?.();
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

  return (
    <div
      ref={containerDomRef}
      style={{
        position: "absolute",
        opacity: componentNode.lock ? 0.75 : 1,
        left: componentNode.x,
        top: componentNode.y,
        width: componentNode.width,
        height: componentNode.height,
        zIndex: componentNode.level,
      }}
      onMouseEnter={() => {
        // 手动控制样式（以此实现通过组件外控制当前组件hover效果）
        instance.handleHover();
      }}
      onMouseLeave={() => {
        instance.handleUnHover();
      }}
    >
      {/* 渲染组件 */}
      <Suspense>
        <component.component
          useExpose={useExpose}
          handleTrigger={handleTrigger}
          dataSource={dataSource}
          options={componentNode.options}
          width={componentNode.width}
          height={componentNode.height}
          componentNode={componentNode}
        />
      </Suspense>

      {/* 渲染遮罩层 */}
      <Mask ref={maskRef} componentNode={componentNode} />
    </div>
  );
}
