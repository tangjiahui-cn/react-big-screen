/**
 * 函数式交互对话框
 *
 * @author tangjiahui
 * @date 2025/2/7
 */
import { createRoot } from "react-dom/client";
import AskComponent, { AskComponentProps } from "./AskComponent";

type UnmountCallback = () => void;
type AskOptions = Omit<AskComponentProps, "onCancel">;
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
