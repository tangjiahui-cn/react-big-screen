/**
 * 拖拽创建组件实例
 *
 * @author tangjiahui
 * @date 2025/3/8
 */
import { RefObject } from "react";
import { useVirtualDrop } from "@/packages/virtual-drag";
import engine from "@/engine";
import { addHistory } from "@/packages/shortCutKeys";

export function useCreateComponentNode(containerDomRef: RefObject<HTMLElement>) {
  useVirtualDrop(containerDomRef, {
    accept: ["create-component"],
    onDrop: (e: MouseEvent, dragOptions) => {
      const dom = containerDomRef.current;
      if (!dom) {
        throw new Error("dom must be exist.");
      }
      const { data } = dragOptions;
      const component = data?.component;
      if (!component) {
        return;
      }
      // 创建一个componentNode
      const domRect = dom.getBoundingClientRect();
      const scale = engine.config.getConfig().scale;
      const componentNode = engine.componentNode.createFromComponent(data.component, {
        x: Math.round((e.x - domRect.x) / scale), // 真实坐标转为编辑器坐标 （scale 越小，编辑器面积越小，真实像素变化映射到虚拟像素越大）
        y: Math.round((e.y - domRect.y) / scale),
        pageId: engine.config.getCurrentPage(),
      });
      // 插入新componentNode到末尾
      engine.componentNode.add(componentNode);
      setTimeout(async () => {
        // 选中新增的组件
        engine.instance.select(componentNode.id, true);
        addHistory(`新增一个组件 “${componentNode.cName}”`);
      });
    },
  });
}
