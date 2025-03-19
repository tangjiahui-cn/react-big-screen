/**
 * 创建右键菜单列表hooks
 *
 * @author tangjiahui
 * @date 2025/1/15
 * @description 组件绑定右键菜单
 */
import { RefObject, useEffect, useRef } from "react";
import { ContextMenuItem } from "../components/RenderContextMenu";
import { createContextMenu, CreateContextMenuOptions } from "../createContextMenu";

// 全局销毁函数
let unmounts: (Unmount | undefined)[] = [];

// 销毁全局其他右键菜单
function clear() {
  if (unmounts.length) {
    unmounts.forEach((unmount) => unmount?.());
    unmounts = [];
  }
}

export function useContextMenu(
  domRef: RefObject<HTMLElement | null>, // dom的ref值
  menuItems?: ContextMenuItem[], // 菜单配置项
  options?: CreateContextMenuOptions,
) {
  // 保存最新的menuItems
  const menuItemsRef = useRef<ContextMenuItem[]>();
  menuItemsRef.current = menuItems;

  useEffect(() => {
    if (!domRef.current) {
      return;
    }

    const dom: HTMLElement = domRef.current;
    dom.addEventListener("contextmenu", contextmenu);

    function contextmenu(e: MouseEvent) {
      // 每次打开菜单都会清除其他打开菜单
      clear();
      // 创建右键菜单
      unmounts.push(createContextMenu(e.clientX, e.clientY, menuItems, options));
    }

    return () => {
      dom.removeEventListener("contextmenu", contextmenu);
      clear();
    };
  }, []);
}
