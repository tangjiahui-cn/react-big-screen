/**
 * useBindModal
 *
 * @author tangjiahui
 * @date 2025/2/14
 * @description
 *    封装 modal 弹窗使用，简化代码，并且避免初始时Modal业务组件内部渲染
 *  （普通方式<Component />形式，即使弹窗未打开，业务组件仍然内部渲染执行了，造成不必要的损失）。
 */
import React, { useMemo, useRef } from "react";
import RenderModal, {
  BindModalProps,
  ModalFunctionComponent,
  RenderModalRefType,
} from "./RenderModal";

export type { BindModalProps };

// 绑定弹窗配置项
type BindModalOptions = Pick<BindModalProps, "onOk" | "onCancel">;

// 返回格式
interface BindModalReturn<Params = any> extends RenderModalRefType<Params> {
  children: React.ReactNode; // 渲染弹窗内容
}

// useBindModal （绑定modal）
export function useBindModal<Params = any>(
  component: ModalFunctionComponent<Params>,
  options?: BindModalOptions,
): BindModalReturn<Params> {
  const renderRef = useRef<RenderModalRefType>(null);
  const optionsRef = useRef<BindModalOptions>();
  optionsRef.current = options;

  return useMemo(() => {
    const children = (
      <RenderModal
        ref={renderRef}
        component={component}
        onCancel={(...args: any) => {
          optionsRef.current?.onCancel?.(...args);
        }}
        onOk={(...args: any) => {
          optionsRef.current?.onOk?.(...args);
        }}
      />
    );

    return {
      children,
      open(params?: Params) {
        // 打开弹窗
        renderRef.current?.open?.(params);
      },
      close(destroy: boolean = true) {
        // 销毁弹窗
        renderRef.current?.close?.(destroy);
      },
    };
  }, []);
}

// 创建 bindModal 的hook
export function createBindModalHook<Params = any>(component: ModalFunctionComponent<Params>) {
  return function (options?: BindModalOptions) {
    return useBindModal(component, options);
  };
}
