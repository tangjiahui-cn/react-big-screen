/**
 * 渲染预览componentNode
 *
 * @author tangjiahui
 * @date 2025/1/16
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
import { useEffect, useMemo, useRef, useState } from "react";

interface RenderPreviewComponentNodeProps {
  componentNode: ComponentNodeType;
  packages: ComponentPackage[];
}

interface ScopeRenderPreviewComponentNodeProps
  extends Omit<RenderPreviewComponentNodeProps, "packages"> {
  component: ComponentType;
}

export default function RenderPreviewComponentNode(props: RenderPreviewComponentNodeProps) {
  const [componentNode, setComponentNode] = useState(props?.componentNode);
  const componentNodeShow = componentNode?.show ?? true;

  // packages 变化必定导致 components 变化，所以重新查找组件的 component 是否存在
  const component = useMemo(() => {
    return engine.component.get(componentNode.cId);
  }, [componentNode?.cId, props?.packages]);

  useEffect(() => {
    // 监听当前节点变更事件
    return engine.componentNode.onChange(componentNode.id, ({ payload }) => {
      setComponentNode({ ...payload });
    });
  }, []);

  return component && componentNodeShow ? (
    <ScopeRenderPreviewComponentNode componentNode={componentNode} component={component} />
  ) : (
    <></>
  );
}

function ScopeRenderPreviewComponentNode(props: ScopeRenderPreviewComponentNodeProps) {
  const { component, componentNode } = props;
  const componentNodeRef = useRef<ComponentNodeType>();
  const containerDomRef = useRef<HTMLDivElement>(null);

  // 注册请求
  const { dataSource, requestInstance } = useComponentNodeRequest(componentNode);

  // 交互相关
  const handleTrigger: ComponentHandleTrigger = useCreateHandleTrigger(componentNode.id);
  const useExpose: ComponentUseExpose = useCreateUseExposeHook(componentNode.id);

  // 注册行为实例（只能改变内部属性）
  useRegisterInstance({
    id: componentNode.id,
    // 经过实例
    handleHover() {},
    // 离开实例
    handleUnHover() {},
    // 选中实例样式
    handleSelected() {},
    // 取消选中实例样式
    handleUnSelected() {},
    // 获取容器dom
    getContainerDom(): HTMLDivElement {
      return containerDomRef.current!;
    },
    // 获取对应的 componentNode
    getComponentNode(): ComponentNodeType {
      return componentNodeRef.current!;
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
        left: componentNode.x,
        top: componentNode.y,
        width: componentNode.width,
        height: componentNode.height,
        zIndex: componentNode.level,
      }}
    >
      <component.component
        handleTrigger={handleTrigger}
        useExpose={useExpose}
        dataSource={dataSource}
        componentNode={componentNode}
        options={componentNode.options}
        width={componentNode.width}
        height={componentNode.height}
      />
    </div>
  );
}
