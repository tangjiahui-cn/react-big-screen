/**
 * 注册右键菜单hook
 *
 * @author tangjiahui
 * @date 2025/3/19
 */
import { useDomEvents } from "@/hooks";
import { RefObject } from "react";
import engine, { DATASET } from "@/engine";
import { createItemContextMenu } from "./createItemContextMenu";
import { createEditorContextMenu } from "./createEditorContextMenu";
import { getHTMLElementDataSet } from "@/utils";
import { useUnmount } from "ahooks";

// 放在全局，是为了不同地方调用此hook，均能取消其他页面的右键菜单项。
let unmountList: (Unmount | undefined)[] = [];

function clear() {
  if (unmountList.length) {
    unmountList.forEach((unmount) => unmount?.());
    unmountList = [];
  }
}

export function useRegisterContextMenu(domRef: RefObject<HTMLElement>) {
  useDomEvents(domRef, {
    contextmenu(e) {
      clear();
      e.preventDefault();

      // 组件实例id
      const id = getHTMLElementDataSet(e.target as HTMLElement, DATASET.componentNodeId, true);
      // 组件对应 instance
      const instance = engine.instance.get(id);
      // 获取组件实例
      const componentNode = instance?.getComponentNode?.();

      // 选中实例右键菜单
      if (instance && componentNode) {
        unmountList.push(createItemContextMenu(e));
        return;
      }

      // 编辑器右键菜单
      unmountList.push(createEditorContextMenu(e));
    },
  });

  useUnmount(() => {
    clear();
  });
}
