/**
 * 右键菜单
 *
 * @author tangjiahui
 * @date 2025/2/3
 */
import { createContextMenu } from "../data/contextMenuItems";
import engine from "@/engine";
import { RefObject } from "react";
import { useContextMenu } from "@/packages/contextMenu";

const contextMenu = createContextMenu();
export function useItemContextMenu(domRef: RefObject<HTMLElement | null>) {
  useContextMenu(domRef, contextMenu, {
    onBeforeOpen(menuItems) {
      // 判断选中组件 锁定/解锁
      let lockCount = 0;
      const allSelectedInstances = engine.instance.getAllSelected();
      const allSelectedComponents = allSelectedInstances.map((instance) => {
        const componentNode = instance.getComponentNode();
        if (componentNode?.lock) {
          lockCount++;
        }
        return componentNode;
      });
      if (allSelectedComponents.length) {
        return menuItems.filter((menuItem) => {
          // 不是所有元素都锁定时，显示“锁定”菜单项
          if (menuItem.key === "lock") return lockCount !== allSelectedComponents.length;
          // 存在锁定元素时，显示“解锁”菜单项
          if (menuItem.key === "unlock") return !!lockCount;
          return true;
        });
      }
      return menuItems;
    },
  });
}
