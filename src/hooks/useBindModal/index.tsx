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

// options
type BindModalOptions = Pick<BindModalProps, "onOk" | "onCancel">;

// 返回格式
interface BindModalReturn<Params = any> {
  children: React.ReactNode; // 渲染弹窗内容
  open: (params?: Params) => void; // 打开弹窗
}

export function useBindModal<Params = any>(
  component: ModalFunctionComponent<Params>,
  options: BindModalOptions,
): BindModalReturn<Params> {
  const renderRef = useRef<RenderModalRefType>(null);
  const onOkRef = useRef<BindModalOptions["onOk"]>();
  const onCancelRef = useRef<BindModalOptions["onCancel"]>();

  onCancelRef.current = options?.onCancel;
  onOkRef.current = options?.onOk;

  return useMemo(() => {
    const children = (
      <RenderModal
        ref={renderRef}
        component={component}
        onCancel={(...args: any) => {
          onCancelRef.current?.(...args);
        }}
        onOk={(...args: any) => {
          onOkRef.current?.(...args);
        }}
      />
    );

    return {
      children,
      open(params?: Params) {
        // 打开弹窗
        renderRef.current?.open?.(params);
      },
    };
  }, []);
}
