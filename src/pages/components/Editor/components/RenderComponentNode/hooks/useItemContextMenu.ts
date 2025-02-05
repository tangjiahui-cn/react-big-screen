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
      let lockCount = 0; // 锁定组件数量
      let isHasGroup = false; // 是否存在已成组元素
      const allSelectedInstances = engine.instance.getAllSelected();
      const allSelectedComponents = allSelectedInstances.map((instance) => {
        const componentNode = instance.getComponentNode();
        if (componentNode?.lock) {
          lockCount++;
        }
        if (componentNode.group) {
          isHasGroup = true;
        }
        return componentNode;
      });
      // 判断菜单项显隐
      if (allSelectedComponents.length) {
        return menuItems.filter((menuItem) => {
          // 【成组】：存在2个元素及以上。
          if (menuItem.key === "group") return allSelectedInstances.length > 1;
          // 【取消成组】：存在成组元素。
          if (menuItem.key === "ungroup") return isHasGroup;
          // 【锁定】：存在元素未锁定。
          if (menuItem.key === "lock") return lockCount !== allSelectedComponents.length;
          // 【解锁】：存在锁定元素。
          if (menuItem.key === "unlock") return !!lockCount;
          return true;
        });
      }
      return menuItems;
    },
  });
}
