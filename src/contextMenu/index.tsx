/**
 * 右键菜单配置
 *
 * @author tangjiahui
 * @date 2025/1/15
 * @description 组件绑定右键菜单
 */
import { RefObject, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import RenderContextMenu, { RenderListItem } from "./components/RenderContextMenu";
import engine from "@/engine";

export type { RenderListItem };

// 全局销毁函数
let unmounts: (() => void)[] = [];

// 销毁全局其他右键菜单
function clearGlobal() {
  if (unmounts.length) {
    unmounts.forEach((cb) => cb());
    unmounts = [];
  }
}

export function useContextMenu(
  domRef: RefObject<HTMLDivElement | null>, // dom的ref值
  menuItems?: (RenderListItem | Boolean)[], // 菜单配置项
  options?: {
    onSelect?: (key: string, item: RenderListItem) => void; // 选中项
  },
) {
  const menuItemsRef = useRef<RenderListItem[]>();
  menuItemsRef.current = menuItems?.filter(Boolean) as RenderListItem[];

  useEffect(() => {
    if (!domRef.current) {
      return;
    }
    const dom = domRef.current;
    dom.addEventListener("contextmenu", contextmenu);

    function contextmenu(e: MouseEvent) {
      // 清除其他右键菜单
      clearGlobal();
      e.preventDefault();

      // 如果右键菜单列表为空则不显示
      if (!menuItemsRef.current) {
        return;
      }

      // 挂载在document.body下
      const div = document.createElement("div");
      div.style.position = "fixed";
      div.style.left = `${e.clientX}px`;
      div.style.top = `${e.clientY}px`;
      div.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
      document.body.appendChild(div);
      const app = createRoot(div);
      app.render(
        <RenderContextMenu
          items={menuItemsRef.current}
          onClickOuter={() => {
            clearGlobal();
          }}
          onSelect={(item: RenderListItem) => {
            options?.onSelect?.(item?.key, item);
            clearGlobal();
          }}
        />,
      );

      unmounts.push(() => {
        app.unmount();
        div.remove();
      });
    }

    return () => {
      clearGlobal();
      dom.removeEventListener("contextmenu", contextmenu);
    };
  }, []);
}
