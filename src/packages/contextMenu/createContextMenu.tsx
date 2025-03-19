/**
 * 创建右键菜单函数
 *
 * @author tangjiahui
 * @date 2025/3/19
 */
import engine from "@/engine";
import { createRoot } from "react-dom/client";
import RenderContextMenu, { ContextMenuItem } from "./components/RenderContextMenu";

export interface CreateContextMenuOptions {
  // 打开右键菜单之前处理一次（支持重新修改 menuItems 菜单项）
  onBeforeOpen?: (menuItems: ContextMenuItem[]) => ContextMenuItem[] | void;
  // 选中一项回调
  onSelect?: (key: string, item: ContextMenuItem) => void;
}

export function createContextMenu(
  x: number, // x坐标位置
  y: number, // y坐标位置
  menuItems?: ContextMenuItem[], // 菜单配置项
  options?: CreateContextMenuOptions,
): Unmount | undefined {
  if (!menuItems) {
    return;
  }

  // 处理 onBeforeOpen
  if (options?.onBeforeOpen) {
    menuItems = options?.onBeforeOpen?.(menuItems) || menuItems;
  }

  menuItems = menuItems?.filter(Boolean) as ContextMenuItem[];

  // 如果右键菜单列表为空则不显示
  if (!menuItems?.length) {
    return;
  }

  // 挂载在document.body下
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.left = `${x}px`;
  div.style.top = `${y}px`;
  div.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
  document.body.appendChild(div);
  const app = createRoot(div);
  let isUnmount = false;

  // 卸载函数
  const unmount = () => {
    if (isUnmount) return;
    app?.unmount?.();
    div?.remove?.();
    isUnmount = true;
  };

  app.render(
    <RenderContextMenu
      items={menuItems}
      onClickOuter={() => {
        unmount();
      }}
      onSelect={(item: ContextMenuItem) => {
        options?.onSelect?.(item?.key, item);
        unmount();
      }}
    />,
  );

  return unmount;
}
