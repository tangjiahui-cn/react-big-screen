/**
 * 拖拽创建收藏夹组件
 *
 * @author tangjiahui
 * @date 2025/3/8
 */
import { RefObject } from "react";
import { useVirtualDrop } from "@/packages/virtual-drag";
import { FavoritesComponentType } from "@/engine";
import { addHistory } from "@/packages/shortCutKeys";
import { message } from "antd";
import { useEngineContext } from "@/export/context";

export function useCreateFavorite(containerDomRef: RefObject<HTMLElement>) {
  const { engine } = useEngineContext();

  useVirtualDrop(containerDomRef, {
    accept: ["create-favorite"],
    onDrop: (e: MouseEvent, dragOptions) => {
      const dom = containerDomRef.current;
      if (!dom) {
        throw new Error("dom must be exist.");
      }
      const domRect = dom.getBoundingClientRect();
      const favorite: FavoritesComponentType = dragOptions.data?.favorite;
      if (!favorite.children?.length) {
        message.warn("收藏元素为空");
      }

      // 鼠标放置位置坐标
      const x = Math.round(e.x - domRect.x);
      const y = Math.round(e.y - domRect.y);

      // 计算组件列表左上角最小坐标
      const first = favorite.children[0];
      const { x: minX, y: minY } = favorite.children.reduce(
        (coordinate, componentNode) => {
          coordinate.x = Math.min(coordinate.x, componentNode.x);
          coordinate.y = Math.min(coordinate.y, componentNode.y);
          return coordinate;
        },
        {
          x: first.x,
          y: first.y,
        },
      );

      const pageId = engine.config.getCurrentPage();
      const clonedIds: string[] = [];
      const scale = engine.config.getConfig().scale;
      // 这里克隆children后创建到画布
      const clonedComponents = engine.componentNode.cloneComponentNodes(favorite.children, {
        onClone(_, cloned) {
          // 计算坐标
          cloned.x = Math.round((x + (cloned.x - minX)) / scale); // 真实坐标转为编辑器坐标 （scale 越小，编辑器面积越小，真实像素变化映射到虚拟像素越大）
          cloned.y = Math.round((y + (cloned.y - minY)) / scale);
          cloned.pageId = pageId;
          clonedIds.push(cloned.id);
        },
      });
      engine.componentNode.add(clonedComponents);
      setTimeout(() => {
        // 选中克隆组件
        engine.instance.select(clonedIds, true);
        addHistory(`新增收藏组件 “${favorite.name}”`);
      });
    },
  });
}
