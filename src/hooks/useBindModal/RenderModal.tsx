import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";

export interface BindModalProps<Params = any> {
  visible?: boolean; // 弹窗显隐
  params?: Params; // 查询参数
  onCancel?: (data?: any) => void; // 取消操作回调
  onOk?: (data?: any) => void; // 确定完成操作回调
  afterClose?: () => void; // 传入此参数（会完整业务弹窗的渲染）
}
export type ModalFunctionComponent<Params = any> = React.FC<BindModalProps<Params>>;
export type RenderModalRefType<Params = any> = {
  open: (params?: Params) => void;
};

// 渲染弹窗
export default forwardRef(
  (
    props: {
      component: ModalFunctionComponent<any>; // 弹窗组件函数
    } & Pick<BindModalProps, "onOk" | "onCancel">,
    ref: ForwardedRef<RenderModalRefType<any>>,
  ) => {
    const FC = props?.component;
    const [params, setParams] = useState<any>();
    const [visible, setVisible] = useState(false);
    const [destroy, setDestroy] = useState(true); // 是否完全销毁弹窗显示

    useImperativeHandle(ref, () => {
      return {
        open(queryParams?: any) {
          setParams(queryParams);
          setVisible(true);
          setDestroy(false);
        },
      };
    });

    // 如果无模板或销毁时，不渲染弹窗
    if (!FC || destroy) {
      return <></>;
    }

    return (
      <FC
        params={params}
        visible={visible}
        onCancel={(...args: any) => {
          setVisible(false);
          props?.onCancel?.(...args);
        }}
        onOk={(...args: any) => {
          setVisible(false);
          props?.onOk?.(...args);
        }}
        afterClose={() => {
          setDestroy(true);
        }}
      />
    );
  },
);
