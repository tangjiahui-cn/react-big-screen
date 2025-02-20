/**
 * 函数式交互对话框
 *
 * @author tangjiahui
 * @date 2025/2/7
 */
import { createRoot } from "react-dom/client";
import AskComponent, { AskComponentProps } from "./AskComponent";
import { useEffect, useMemo, useRef } from "react";

type UnmountCallback = () => void;
type AskOptions = AskComponentProps;

/**
 * ask 命令式调用
 * @param options 配置项
 */
export function ask(options: AskOptions): UnmountCallback {
  const {
    title = "提醒",
    content = " 确定执行操作？",
    okText = "确定",
    cancelText = "取消",
  } = options;
  let div: HTMLDivElement | null = document.createElement("div");
  let app = createRoot(div);
  document.body.append(div);
  app.render(
    <AskComponent
      title={title}
      content={content}
      okText={okText}
      cancelText={cancelText}
      onOk={options?.onOk}
      onCancel={() => {
        unmount();
        options?.onCancel?.();
      }}
    />,
  );

  function unmount() {
    if (!div) return;
    app.unmount();
    div.remove();
    div = null;
  }

  return unmount;
}

/**
 * useAsk
 * @description 支持自动清除存储函数。
 */
export function useAsk(): (options: AskOptions) => void {
  const unmountListRef = useRef<(() => void)[]>();

  useEffect(() => {
    return () => {
      unmountListRef.current?.forEach((unmount) => unmount?.());
      unmountListRef.current = undefined;
    };
  }, []);

  return useMemo(() => {
    return function (options: AskOptions) {
      const unmount = ask({
        ...options,
        onOk(close) {
          options?.onOk?.(close);
          unmountListRef.current = unmountListRef.current?.filter?.((cb) => cb !== unmount);
        },
        onCancel() {
          options?.onCancel?.();
          unmountListRef.current = unmountListRef.current?.filter?.((cb) => cb !== unmount);
        },
      });
      (unmountListRef.current ||= [])?.push(unmount);
    };
  }, []);
}
